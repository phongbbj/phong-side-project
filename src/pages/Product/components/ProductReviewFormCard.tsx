import type { FormEvent } from "react";
import { Star, Loader2 } from "lucide-react";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";

type ProductReviewFormCardProps = {
  reviewName: string;
  onChangeReviewName: (value: string) => void;
  reviewText: string;
  onChangeReviewText: (value: string) => void;
  reviewRating: number;
  onChangeReviewRating: (value: number) => void;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function ProductReviewFormCard({
  reviewName,
  onChangeReviewName,
  reviewText,
  onChangeReviewText,
  reviewRating,
  onChangeReviewRating,
  isSubmitting,
  onSubmit,
}: ProductReviewFormCardProps) {
  return (
    <div className="rounded-xl bg-white shadow-sm p-4">
      <div className="space-y-1.5 mb-3">
        <h2 className="text-body font-semibold">Viết đánh giá của bạn</h2>
        <p className="text-caption text-muted">
          Chia sẻ trải nghiệm thực tế để giúp người dùng khác.
        </p>
      </div>

      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="review-name">Tên hiển thị</Label>
          <Input
            id="review-name"
            value={reviewName}
            onChange={(e) => onChangeReviewName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn A"
            className="bg-slate-50 focus:bg-white border-none"
          />
        </div>

        {/* Chọn rating 1–5 sao */}
        <div className="space-y-1.5">
          <Label>Đánh giá của bạn</Label>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              const active = value <= reviewRating;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onChangeReviewRating(value)}
                  className="
                    inline-flex items-center justify-center rounded-full
                    p-1.5 transition-transform hover:scale-[1.05]
                  "
                >
                  <Star
                    className={`w-5 h-5 ${
                      active
                        ? "fill-amber-400 stroke-amber-500"
                        : "stroke-slate-300"
                    }`}
                  />
                </button>
              );
            })}
            <span className="text-caption text-muted">
              {reviewRating} / 5
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="review-text">Nội dung đánh giá</Label>
          <textarea
            id="review-text"
            value={reviewText}
            onChange={(e) => onChangeReviewText(e.target.value)}
            placeholder="Nhập đánh giá về chất lượng, trải nghiệm sử dụng..."
            className="
              min-h-[120px] w-full rounded-md px-3 py-2
              text-body-sm outline-none bg-slate-50
              focus:bg-white focus:ring-2 focus:ring-primary/60
            "
          />
        </div>

        <Button
          type="submit"
          className="w-full text-white"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          Gửi đánh giá
        </Button>

        <p className="text-caption text-muted">
          Đánh giá của bạn sẽ được hiển thị ngay tại mục “Đánh giá từ khách hàng”.
        </p>
      </form>
    </div>
  );
}
