import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Mountain, ArrowRight } from "lucide-react";
import CtaSection from "@/components/home/CtaSection";
import { fetchExpeditionTypeSlugs } from "@/graphql/api/fetchExpeditionTypeSlugs";
import { fetchExpeditionTypeBySlug } from "@/graphql/api/fetchExpeditionTypeBySlug";

export async function generateStaticParams() {
  const slugs = await fetchExpeditionTypeSlugs();
  return slugs;
}

type ExpeditionsParams = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ExpeditionsPage(props: ExpeditionsParams) {
  const params = await props.params;
  const { slug } = params;
  const pageData = await fetchExpeditionTypeBySlug(slug);

  if (!pageData?.name) {
    notFound();
  }

  const {
    name,
    expeditionCategoriesCollection: { items: categories },
  } = pageData;

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-[50vh] md:h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${"/images/fallback-image.jpeg"})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        <div className="container-custom relative z-10 h-full flex flex-col justify-end pb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {name}
          </h1>
        </div>
      </div>

      {/* Expeditions Section */}
      <section className="py-20 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-4xl font-semibold mb-12 text-prussianBlue">
            Explore {name} Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
            {categories.map((category, index) => (
              <Link
                href={`/categories/${category?.slug}`}
                key={index}
                className="expedition-card bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-64">
                  <Image
                    src="/images/fallback-image.jpeg"
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-prussianBlue">
                    {category.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-5 line-clamp-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-blueLagoon font-semibold text-sm space-x-2">
                    <span>View Details</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
