// src/pages/Product/productDetail.logic.ts
import { useMemo, useState, type FormEvent } from "react";
import type { Product } from "../data/dumyData";
import { useCartStore } from "./cartStore";

/* ========= TYPES ========= */

export type RatingInfo = {
  baseRating: number;
  r1: number;
  r2: number;
  r3: number;
};

export type LocalReview = {
  id: number;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type UseProductDetailContentResult = {
  images: string[];
  activeImage: string;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;

  ratingInfo: RatingInfo;
  reviews: LocalReview[];
  avgRating: number;

  reviewName: string;
  setReviewName: (value: string) => void;
  reviewText: string;
  setReviewText: (value: string) => void;
  reviewRating: number;
  setReviewRating: (value: number) => void;
  isSubmittingReview: boolean;
  handleSubmitReview: (e: FormEvent<HTMLFormElement>) => void;

  relatedProducts: Product[];
  handleAddToCart: () => void;
};

/* ========= PURE HELPERS ========= */

const clampRating = (v: number): number => Math.max(1, Math.min(5, v));

const createRatingInfo = (product: Product): RatingInfo => {
  const baseRating = clampRating(Math.round(product.rating || 4.5));

  const seed =
    String(product.id)
      .split("")
      .reduce((acc, ch) => acc + ch.charCodeAt(0), 0) || 1;

  const randInRange = (s: number, min: number, max: number) => {
    const x = Math.sin(s) * 10000;
    const frac = x - Math.floor(x);
    return min + Math.floor(frac * (max - min + 1));
  };

  const d1 = randInRange(seed, -1, 1);
  const d2 = randInRange(seed + 1, -1, 1);

  let r1 = clampRating(baseRating + d1);
  let r2 = clampRating(baseRating + d2);
  const targetSum = baseRating * 3;
  let r3 = targetSum - r1 - r2;

  if (r3 < 1 || r3 > 5) {
    r1 = baseRating;
    r2 = baseRating;
    r3 = baseRating;
  }

  return { baseRating, r1, r2, r3 };
};

const createBaseReviews = (ratingInfo: RatingInfo): LocalReview[] => [
  {
    id: 1,
    author: "Nguyễn Văn A",
    rating: ratingInfo.r1,
    comment: "Chất lượng tốt, đúng mô tả, âm thanh ổn định.",
    createdAt: "2 ngày trước",
  },
  {
    id: 2,
    author: "Trần Thị B",
    rating: ratingInfo.r2,
    comment: "Thiết kế đẹp, đeo thoải mái, pin dùng được khá lâu.",
    createdAt: "1 tuần trước",
  },
  {
    id: 3,
    author: "Lê Văn C",
    rating: ratingInfo.r3,
    comment: "Giá hợp lý so với cấu hình, giao hàng nhanh.",
    createdAt: "3 tuần trước",
  },
];

const mergeReviews = (
  baseReviews: LocalReview[],
  userReview: LocalReview | null,
): LocalReview[] => (userReview ? [...baseReviews, userReview] : baseReviews);

const computeAvgRating = (reviews: LocalReview[]): number =>
  reviews.length === 0
    ? 0
    : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

const getImagesForProduct = (product: Product): string[] =>
  product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail];

const getRelatedProducts = (
  allProducts: Product[],
  current: Product,
): Product[] =>
  allProducts
    .filter(
      (p) =>
        p.id !== current.id &&
        (p.category === current.category || p.brand === current.brand),
    )
    .slice(0, 4);

/* ========= MAIN HOOK (LOGIC) ========= */

export const useProductDetailContent = (
  product: Product,
  allProducts: Product[],
): UseProductDetailContentResult => {
  const addItem = useCartStore((s) => s.addItem);

  // state UI – sẽ reset nhờ remount component (key={product.id} ở UI)
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [lastSubmittedReview, setLastSubmittedReview] = useState<{
    name: string;
    comment: string;
    rating: number;
  } | null>(null);

  const images = useMemo(() => getImagesForProduct(product), [product]);
  const activeImage = useMemo(
    () => images[activeImageIndex] || images[0] || product.thumbnail,
    [images, activeImageIndex, product.thumbnail],
  );

  const ratingInfo = useMemo(
    () => createRatingInfo(product),
    [product],
  );

  const baseReviews = useMemo(
    () => createBaseReviews(ratingInfo),
    [ratingInfo],
  );

  const userReview: LocalReview | null = useMemo(
    () =>
      lastSubmittedReview
        ? {
            id: 4,
            author: lastSubmittedReview.name,
            rating: lastSubmittedReview.rating,
            comment: lastSubmittedReview.comment,
            createdAt: "Vừa gửi",
          }
        : null,
    [lastSubmittedReview],
  );

  const reviews = useMemo(
    () => mergeReviews(baseReviews, userReview),
    [baseReviews, userReview],
  );

  const avgRating = useMemo(
    () => computeAvgRating(reviews),
    [reviews],
  );

  const relatedProducts = useMemo(
    () => getRelatedProducts(allProducts, product),
    [allProducts, product],
  );

  const handleSubmitReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;

    setIsSubmittingReview(true);
    setTimeout(() => {
      setLastSubmittedReview({
        name: reviewName.trim(),
        comment: reviewText.trim(),
        rating: reviewRating,
      });
      setReviewName("");
      setReviewText("");
      setReviewRating(5);
      setIsSubmittingReview(false);
    }, 500);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      src: product.thumbnail,
      name: product.name,
      price: product.price,
    });
  };

  return {
    images,
    activeImage,
    activeImageIndex,
    setActiveImageIndex,
    ratingInfo,
    reviews,
    avgRating,
    reviewName,
    setReviewName,
    reviewText,
    setReviewText,
    reviewRating,
    setReviewRating,
    isSubmittingReview,
    handleSubmitReview,
    relatedProducts,
    handleAddToCart,
  };
};
