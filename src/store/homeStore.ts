// src/pages/Home/home.logic.ts
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import type { Product } from "../data/dumyData";
import { useCartStore } from "./cartStore";

export type SortOption = "popular" | "price-asc" | "price-desc" | "rating-desc";
export type PriceRange = "all" | "lt5" | "5to15" | "gt15";

export const INITIAL_COUNT = 12;
export const PAGE_SIZE = 8;

export type UseHomeLogicResult = {
  // filter state
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  priceRange: PriceRange;
  setPriceRange: (value: PriceRange) => void;
  onlyNew: boolean;
  setOnlyNew: (value: boolean) => void;
  onlyHot: boolean;
  setOnlyHot: (value: boolean) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;

  // derived lists
  categories: string[];
  brands: string[];
  visibleProducts: Product[];
  hasMore: boolean;
  isLoadingMore: boolean;

  // ref cho sentinel infinite scroll
  loaderRef: MutableRefObject<HTMLDivElement | null>;

  // actions
  handleAddToCart: (product: Product) => void;
};

export const useHomeLogic = (products: Product[]): UseHomeLogicResult => {
  const addItem = useCartStore((state) => state.addItem);

  const [search, _setSearch] = useState("");
  const [category, _setCategory] = useState<string>("all");
  const [brand, _setBrand] = useState<string>("all");
  const [priceRange, _setPriceRange] = useState<PriceRange>("all");
  const [onlyNew, _setOnlyNew] = useState(false);
  const [onlyHot, _setOnlyHot] = useState(false);
  const [sortBy, _setSortBy] = useState<SortOption>("popular");

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // reset visible khi data từ server đổi
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(INITIAL_COUNT);
  }, [products]);

  const resetVisible = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  // wrapped setters để reset visibleCount khi filter/search/sort đổi
  const setSearch = (value: string) => {
    _setSearch(value);
    resetVisible();
  };

  const setCategory = (value: string) => {
    _setCategory(value);
    resetVisible();
  };

  const setBrand = (value: string) => {
    _setBrand(value);
    resetVisible();
  };

  const setPriceRange = (value: PriceRange) => {
    _setPriceRange(value);
    resetVisible();
  };

  const setOnlyNew = (value: boolean) => {
    _setOnlyNew(value);
    resetVisible();
  };

  const setOnlyHot = (value: boolean) => {
    _setOnlyHot(value);
    resetVisible();
  };

  const setSortBy = (value: SortOption) => {
    _setSortBy(value);
    resetVisible();
  };

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products],
  );

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))),
    [products],
  );

  const filteredProducts = useMemo(() => {
    let list = products.slice();

    const keyword = search.trim().toLowerCase();
    if (keyword) {
      list = list.filter((p) => {
        const inName = p.name.toLowerCase().includes(keyword);
        const inBrand = p.brand.toLowerCase().includes(keyword);
        const inSubtitle = p.subtitle.toLowerCase().includes(keyword);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(keyword));
        return inName || inBrand || inSubtitle || inTags;
      });
    }

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (brand !== "all") {
      list = list.filter((p) => p.brand === brand);
    }

    if (priceRange !== "all") {
      list = list.filter((p) => {
        const priceM = p.price / 1_000_000;
        if (priceRange === "lt5") return priceM < 5;
        if (priceRange === "5to15") return priceM >= 5 && priceM <= 15;
        if (priceRange === "gt15") return priceM > 15;
        return true;
      });
    }

    if (onlyNew) list = list.filter((p) => p.isNew);
    if (onlyHot) list = list.filter((p) => p.isHot);

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => {
          const scoreA = (a.isHot ? 1 : 0) + a.rating;
          const scoreB = (b.isHot ? 1 : 0) + b.rating;
          return scoreB - scoreA;
        });
    }

    return list;
  }, [
    products,
    search,
    category,
    brand,
    priceRange,
    onlyNew,
    onlyHot,
    sortBy,
  ]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount],
  );

  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setVisibleCount((prev) => prev + PAGE_SIZE);
    setIsLoadingMore(false);
  }, [hasMore, isLoadingMore]);

  // IntersectionObserver cho infinite scroll
  useEffect(() => {
    if (!hasMore) return;
    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      src: product.thumbnail,
      name: product.name,
      price: product.price,
    });
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    brand,
    setBrand,
    priceRange,
    setPriceRange,
    onlyNew,
    setOnlyNew,
    onlyHot,
    setOnlyHot,
    sortBy,
    setSortBy,
    categories,
    brands,
    visibleProducts,
    hasMore,
    isLoadingMore,
    loaderRef,
    handleAddToCart,
  };
};
