import { ArrowLeft } from "lucide-react";
import type { Product } from "../../../data/dumyData";
import { useProductDetailContent } from "../../../store/productStore";
import ProductGallery from "./ProductGallery";
import ProductInfoCard from "./ProductInfoCard";
import ProductReviewFormCard from "./ProductReviewFormCard";
import ProductReviewsCard from "./ProductReviewsCard";
import RelatedProductsSection from "./RelatedProductsSection";
import ServiceInfoCard from "./ServiceInfoCard";
import SpecsCard from "./SpecsCard";


type ProductDetailContentProps = {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onGoToProduct: (id: string | number) => void;
};

export default function ProductDetailContent({
  product,
  allProducts,
  onBack,
  onGoToProduct,
}: ProductDetailContentProps) {
  const {
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
  } = useProductDetailContent(product, allProducts);

  return (
    <div className="space-y-8">
      {/* Back */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-body-sm text-muted hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Row 1: Gallery + Info / Price / Add to cart */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ProductGallery
            product={product}
            images={images}
            activeImage={activeImage}
            activeIndex={activeImageIndex}
            onSelectImage={setActiveImageIndex}
          />

          <ProductInfoCard
            product={product}
            avgRating={avgRating}
            reviewCount={reviews.length}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Row 2: Thông tin dịch vụ + Thông số kỹ thuật */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ServiceInfoCard />
          {Array.isArray(product.specs) && product.specs.length > 0 && (
            <SpecsCard specs={product.specs} />
          )}
        </div>
      </div>

      {/* BOTTOM GRID: Rating + Comment form */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProductReviewsCard
          ratingInfo={ratingInfo}
          reviews={reviews}
          avgRating={avgRating}
        />

        <ProductReviewFormCard
          reviewName={reviewName}
          onChangeReviewName={setReviewName}
          reviewText={reviewText}
          onChangeReviewText={setReviewText}
          reviewRating={reviewRating}
          onChangeReviewRating={setReviewRating}
          isSubmitting={isSubmittingReview}
          onSubmit={handleSubmitReview}
        />
      </div>

      {/* SẢN PHẨM LIÊN QUAN */}
      <RelatedProductsSection
        products={relatedProducts}
        onClickProduct={onGoToProduct}
      />
    </div>
  );
}
