import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function CategoryCard({ categoryData }: any) {
  return (
    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
      {categoryData.map(({ data }: any) => (
        <Card key={data?.id}>
          <Link href={`/categories/detail/${data?.id}`}>
            <CardHeader>
              <CardTitle>{data?.category_title}</CardTitle>
              <CardDescription>{data?.category_description}</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      ))}
    </section>
  );
}
