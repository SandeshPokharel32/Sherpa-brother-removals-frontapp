import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Mountain, ArrowRight } from "lucide-react";
import { fetchCategoriesSlugs } from "@/graphql/api/fetchCategoriesSlugs";
import { fetchCategoryBySlug } from "@/graphql/api/fetchCategoryBySlug";
import CtaSection from "@/components/home/CtaSection";

export async function generateStaticParams() {
  const slugs = await fetchCategoriesSlugs();
  return slugs;
}

type RegionParams = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RegionPage(props: RegionParams) {
  const params = await props.params;
  const { slug } = params;
  const pageData = await fetchCategoryBySlug(slug);

  if (!pageData?.name) {
    return notFound();
  }

  const { expeditionsCollection, name, description, type } = pageData;

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
          <h4 className="text-lg md:text-xl lg:text-2xl  text-blue-lagoon font-bold mb-1">
            {type?.name || ""}
          </h4>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight">
            {name}
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Expeditions Section */}
      <section className="py-20 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-4xl font-semibold mb-12 text-blue-lagoon">
            {name} Expeditions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12">
            {expeditionsCollection?.items?.map(
              (expedition: any, index: number) => (
                <Link
                  href={`/expedition/${expedition?.slug}`}
                  key={index}
                  className="expedition-card bg-white rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative h-64">
                    <Image
                      src={
                        expedition?.mainImage?.url ||
                        "/images/fallback-image.jpeg"
                      }
                      alt={expedition.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-3 text-prussianBlue">
                      {expedition.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {expedition.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1 text-blueLagoon" />
                        {expedition.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mountain className="h-4 w-4 mr-1 text-blueLagoon" />
                        {expedition.altitude}
                      </div>
                    </div>

                    <div className="flex items-center text-blueLagoon font-semibold text-sm">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
