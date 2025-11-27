import { Star } from "lucide-react";

type RatingInfo = {
  baseRating: number;
  r1: number;
  r2: number;
  r3: number;
};

type LocalReview = {
  id: number;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type ProductReviewsCardProps = {
  ratingInfo: RatingInfo;
  reviews: LocalReview[];
  avgRating: number;
};

export default function ProductReviewsCard({
  ratingInfo,
  reviews,
  avgRating,
}: ProductReviewsCardProps) {
  return (
    <div className="rounded-xl bg-white shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-body font-semibold">Đánh giá từ khách hàng</h2>
          <p className="text-caption text-muted">
            Điểm số được tổng hợp từ các đánh giá gần đây.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-amber-400/90 stroke-amber-500" />
            <span className="text-xl font-semibold">
              {avgRating.toFixed(1)}
            </span>
          </div>
          <p className="text-caption text-muted">
            {reviews.length} đánh giá
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-caption text-muted">
        <p>
          Đánh giá 1:{" "}
          <span className="font-medium">{ratingInfo.r1}/5</span>
        </p>
        <p>
          Đánh giá 2:{" "}
          <span className="font-medium">{ratingInfo.r2}/5</span>
        </p>
        <p>
          Đánh giá 3:{" "}
          <span className="font-medium">{ratingInfo.r3}/5</span>
        </p>
      </div>

      {/* Danh sách review */}
      <div className="space-y-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-lg bg-slate-50 px-3 py-2 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-body-sm font-semibold">{rev.author}</p>
              <span className="text-caption text-muted">
                {rev.createdAt}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-3.5 h-3.5 ${
                    idx < rev.rating
                      ? "fill-amber-400 stroke-amber-500"
                      : "stroke-slate-300"
                  }`}
                />
              ))}
            </div>
            <p className="mt-1 text-body-sm text-gray-700">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
