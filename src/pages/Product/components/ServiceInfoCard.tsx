import { Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../ui/card";

export default function ServiceInfoCard() {
  return (
    <Card className="border-border bg-white">
      <CardHeader>
        <CardTitle className="text-body">Thông tin dịch vụ</CardTitle>
        <CardDescription>Giao hàng, bảo hành, đổi trả.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-body-sm">
        <div className="flex items-start gap-3">
          <Truck className="w-4 h-4 mt-0.5 text-primary" />
          <div>
            <p className="font-medium">Giao hàng nhanh</p>
            <p className="text-muted">
              Dự kiến 1-3 ngày nội thành, 3-5 ngày ngoại tỉnh tùy khu vực.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 mt-0.5 text-primary" />
          <div>
            <p className="font-medium">Bảo hành chính hãng</p>
            <p className="text-muted">
              Hỗ trợ bảo hành theo chính sách từ nhà sản xuất, có phiếu / hóa đơn.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RefreshCcw className="w-4 h-4 mt-0.5 text-primary" />
          <div>
            <p className="font-medium">Đổi trả linh hoạt</p>
            <p className="text-muted">
              Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm gặp lỗi kỹ thuật.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
