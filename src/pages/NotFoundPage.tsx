import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function NotFoundPage() {
  const error = useRouteError();
  const is404 =
    isRouteErrorResponse(error) && (error.status === 404 || error.status === 400);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-2">
          {is404 ? "404" : "Có lỗi xảy ra"}
        </h1>
        <p className="text-sm text-muted mb-6">
          {is404
            ? "Không tìm thấy trang bạn yêu cầu."
            : "Vui lòng thử lại sau."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
