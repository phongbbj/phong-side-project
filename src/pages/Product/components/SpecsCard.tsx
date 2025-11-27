import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../ui/card";

type Spec = {
  label: string;
  value: string;
};

type SpecsCardProps = {
  specs: Spec[];
};

export default function SpecsCard({ specs }: SpecsCardProps) {
  return (
    <Card className="border-border bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-heading-md">Thông số kỹ thuật</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-y-2 text-body-sm">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline gap-4 border-b border-dashed border-gray-200 pb-1.5"
            >
              <dt className="min-w-20 text-gray-500">{spec.label}</dt>
              <dd className="flex-1 text-gray-800">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
