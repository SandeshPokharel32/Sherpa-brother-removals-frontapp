import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  MapPin,
  Mountain,
  Users,
  Clock,
  Shield,
  DollarSign,
} from "lucide-react";
import Itenaries from "@/components/itenaries";
import { fetchExpeditionSlugs } from "@/graphql/api/fetchExpeditionSlugs";
import { fetchExpeditionBySlug } from "@/graphql/api/fetchExpeditionBySlug";

type ExpeditionParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await fetchExpeditionSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export function BookingLink({ expedition }: { expedition: { title: string } }) {
  const phone = "+9779851235820";
  const message = `Hi, I want to book a ${expedition.title} adventure.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedMessage}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary p-3 rounded-lg text-white"
    >
      Book This Expedition
    </Link>
  );
}

export default async function ExpeditionPage(props: ExpeditionParams) {
  const params = await props.params;
  const expedition = await fetchExpeditionBySlug(params.slug);

  if (!expedition) {
    notFound();
  }

  // Map images from nested objects
  const mainImageUrl =
    expedition.mainImage?.url || "/images/fallback-image.jpeg";
  const galleryImages =
    expedition.galleryImageCollection?.items.map((img: any) => img.url) || [];

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-[60vh] md:h-[75vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${mainImageUrl})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-raisinBlack/80"></div>
        <div className="container-custom relative z-10 h-full flex flex-col justify-end pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {expedition.title}
            </h1>
            <p className="text-xl text-white/90">{expedition.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <section className="py-8 bg-blue-lagoon text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-blueLagoon" />
              <div>
                <p className="text-sm text-white/70">Region</p>
                <p className="font-medium">{expedition?.region}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mountain className="h-6 w-6 text-blueLagoon" />
              <div>
                <p className="text-sm text-white/70">Altitude</p>
                <p className="font-medium">{expedition.altitude}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-blueLagoon" />
              <div>
                <p className="text-sm text-white/70">Duration</p>
                <p className="font-medium">{expedition.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-blueLagoon" />
              <div>
                <p className="text-sm text-white/70">Group Size</p>
                <p className="font-medium">{expedition.groupSize}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Expedition Details */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-prussianBlue">
                Overview
              </h2>
              <div className="prose max-w-none mb-12">
                <p className="text-gray-700">{expedition.overview}</p>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-prussianBlue">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-12">
                {galleryImages.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="relative h-48 md:h-64 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${expedition.title} - Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <Itenaries expedition={expedition} />

              <h2 className="text-3xl font-bold mb-6 text-prussianBlue">
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-raisin-black">
                    Included
                  </h3>
                  <ul className="space-y-2">
                    {expedition?.included?.items?.map(
                      (item: any, index: any) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-blue-lagoon mt-1">✗</span>
                          <span className="text-blue-lagoon bold text-lg">
                            {item?.title}
                          </span>
                          <span className="text-gray-700 text-sm">
                            {item?.description}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-raisin-black">
                    Excluded
                  </h3>
                  <ul className="space-y-2">
                    {expedition?.excluded?.items?.map(
                      (item: any, index: any) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-red-500 mt-1">✗</span>
                          <span className="text-red-500 bold text-lg">
                            {item?.title}
                          </span>
                          <span className="text-gray-700 text-sm">
                            {item?.description}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-prussianBlue">
                Gear List
              </h2>
              <div className="mb-12">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {expedition?.gearListCollection?.items?.map(
                    (item: any, index: any) => (
                      <li
                        key={index}
                        className="region-card group cursor-pointer"
                      >
                        <Link href={item.url} target="_blank">
                          <div className="relative h-72 overflow-hidden rounded-lg">
                            <Image
                              src="https://images.pexels.com/photos/4496593/pexels-photo-4496593.jpeg"
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                {item.title}
                              </h3>
                              <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Right Column - Booking Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gray-50 rounded-lg p-6 shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-prussianBlue">
                  Expedition Details
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blueLagoon" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{expedition.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blueLagoon" />
                    <div>
                      <p className="text-sm text-gray-500">Best Season</p>
                      <p className="font-medium">{expedition.season}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mountain className="h-5 w-5 text-blueLagoon" />
                    <div>
                      <p className="text-sm text-gray-500">Difficulty</p>
                      <p className="font-medium">{expedition.difficulty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blueLagoon" />
                    <div>
                      <p className="text-sm text-gray-500">Guide Ratio</p>
                      <p className="font-medium">1:2 - 1:4</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-blueLagoon" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-bold text-xl">{expedition.price}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="border-t border-gray-200 pt-6 mb-6">
                  <h4 className="font-bold mb-3">Upcoming Departures</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>June 15, 2025</span>
                      <span className="text-green-600">Available</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>July 10, 2025</span>
                      <span className="text-green-600">Available</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>August 5, 2025</span>
                      <span className="text-amber-600">3 spots left</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>August 25, 2025</span>
                      <span className="text-red-600">Full</span>
                    </div>
                  </div>
                </div> */}
                <BookingLink expedition={expedition} />
                {/* <Link
                  href="/contact"
                  className="block w-full border border-prussianBlue text-prussianBlue text-center py-3 rounded-md font-medium hover:bg-prussianBlue/5 transition-colors"
                >
                  Request Custom Dates
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Expeditions CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4 text-prussianBlue">
            Explore Related Expeditions
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700">
            Discover more adventures in the {expedition?.region?.split(",")[0]}{" "}
            region or explore other expeditions of similar difficulty.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="p-4 bg-blue-lagoon text-white rounded-lg">
              Browse {expedition?.region?.split(",")[0]} Trips
            </Link>
            <Link
              href="/expeditions"
              className="p-4 bg-primary text-white rounded-lg"
            >
              View All Expeditions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
