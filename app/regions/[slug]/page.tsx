import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Mountain, ArrowRight } from "lucide-react";

// This would typically come from a CMS or API
const regions = {
  himalayas: {
    name: "The Himalayas",
    description:
      "The Himalayas are home to the world's highest peaks, including Mount Everest, K2, and many others above 8,000 meters. This magnificent mountain range spans across five countries: India, Nepal, Bhutan, China, and Pakistan.",
    image: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg",
    expeditions: [
      {
        id: 1,
        title: "Everest Base Camp Trek",
        description:
          "A classic trek to the base of the world's highest mountain",
        duration: "14 days",
        difficulty: "Moderate",
        image:
          "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
        link: "/expeditions/everest-base-camp",
      },
      {
        id: 2,
        title: "Annapurna Circuit",
        description:
          "One of the world's best trekking routes with diverse landscapes",
        duration: "18 days",
        difficulty: "Moderate",
        image:
          "https://images.pexels.com/photos/2649166/pexels-photo-2649166.jpeg",
        link: "/expeditions/annapurna-circuit",
      },
      {
        id: 3,
        title: "Island Peak Climb",
        description:
          "Popular trekking peak offering spectacular views of Everest",
        duration: "16 days",
        difficulty: "Challenging",
        image:
          "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg",
        link: "/expeditions/island-peak",
      },
      {
        id: 4,
        title: "Manaslu Circuit",
        description:
          "A remote and rewarding trek around the world's eighth highest mountain",
        duration: "17 days",
        difficulty: "Challenging",
        image:
          "https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg",
        link: "/expeditions/manaslu-circuit",
      },
    ],
  },
  alps: {
    name: "European Alps",
    description:
      "The European Alps are one of the world's most iconic mountain ranges, spanning across eight Alpine countries: Austria, France, Germany, Italy, Liechtenstein, Monaco, Slovenia, and Switzerland. Famous for dramatic peaks, pristine lakes, and charming villages.",
    image: "https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg",
    expeditions: [
      {
        id: 1,
        title: "Mont Blanc Summit",
        description: "Climb to the summit of Western Europe's highest peak",
        duration: "7 days",
        difficulty: "Challenging",
        image:
          "https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg",
        link: "/expeditions/mont-blanc",
      },
      {
        id: 2,
        title: "Haute Route Ski Tour",
        description:
          "Classic ski mountaineering route from Chamonix to Zermatt",
        duration: "7 days",
        difficulty: "Advanced",
        image:
          "https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg",
        link: "/expeditions/haute-route",
      },
      {
        id: 3,
        title: "Eiger Climb",
        description: "Ascend the famous north face of the Eiger",
        duration: "5 days",
        difficulty: "Expert",
        image:
          "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg",
        link: "/expeditions/eiger",
      },
      {
        id: 4,
        title: "Tour du Mont Blanc",
        description: "Circumnavigate Western Europe's highest mountain",
        duration: "11 days",
        difficulty: "Moderate",
        image:
          "https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg",
        link: "/expeditions/tour-du-mont-blanc",
      },
    ],
  },
  andes: {
    name: "The Andes",
    description:
      "The Andes is the longest continental mountain range in the world, stretching 7,000 km through seven South American countries: Venezuela, Colombia, Ecuador, Peru, Bolivia, Chile, and Argentina. The range includes the world's highest volcanoes and diverse ecosystems.",
    image: "https://images.pexels.com/photos/97906/pexels-photo-97906.jpeg",
    expeditions: [
      {
        id: 1,
        title: "Aconcagua Expedition",
        description: "Climb the highest peak in the Americas",
        duration: "21 days",
        difficulty: "Difficult",
        image:
          "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
        link: "/expeditions/aconcagua",
      },
      {
        id: 2,
        title: "Inca Trail to Machu Picchu",
        description: "Hike the legendary trail to the lost city of the Incas",
        duration: "4 days",
        difficulty: "Moderate",
        image:
          "https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg",
        link: "/expeditions/inca-trail",
      },
      {
        id: 3,
        title: "Cotopaxi Volcano Climb",
        description: "Summit one of the world's highest active volcanoes",
        duration: "2 days",
        difficulty: "Challenging",
        image: "https://images.pexels.com/photos/57553/pexels-photo-57553.jpeg",
        link: "/expeditions/cotopaxi",
      },
      {
        id: 4,
        title: "Huayna Potosi Climb",
        description: "A perfect first 6000m peak for beginner mountaineers",
        duration: "3 days",
        difficulty: "Challenging",
        image:
          "https://images.pexels.com/photos/572688/pexels-photo-572688.jpeg",
        link: "/expeditions/huayna-potosi",
      },
    ],
  },
  alaska: {
    name: "Alaska Range",
    description:
      "The Alaska Range is a 650 km long mountain range in the southcentral region of Alaska. The centerpiece of the range is Denali, formerly known as Mount McKinley, the highest peak in North America at 20,310 feet (6,190 m).",
    image: "https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg",
    expeditions: [
      {
        id: 1,
        title: "Denali Expedition",
        description: "Climb North America's highest peak",
        duration: "21 days",
        difficulty: "Extreme",
        image:
          "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg",
        link: "/expeditions/denali",
      },
      {
        id: 2,
        title: "Mount Hunter Climb",
        description:
          "Technical climb on the steepest of the Alaska Range giants",
        duration: "16 days",
        difficulty: "Extreme",
        image:
          "https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg",
        link: "/expeditions/mount-hunter",
      },
      {
        id: 3,
        title: "Ruth Gorge Exploration",
        description: "Ski and climb in the stunning Ruth Glacier region",
        duration: "10 days",
        difficulty: "Advanced",
        image:
          "https://images.pexels.com/photos/940323/pexels-photo-940323.jpeg",
        link: "/expeditions/ruth-gorge",
      },
      {
        id: 4,
        title: "Mount Foraker Expedition",
        description: "Climb Alaska's third highest peak with spectacular views",
        duration: "18 days",
        difficulty: "Extreme",
        image:
          "https://images.pexels.com/photos/1034887/pexels-photo-1034887.jpeg",
        link: "/expeditions/mount-foraker",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(regions).map((key) => ({ slug: key }));
}

type RegionParams = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RegionPage(props: RegionParams) {
  const params = await props.params;
  const { slug } = params;

  if (!regions[slug as keyof typeof regions]) {
    notFound();
  }

  const region = regions[slug as keyof typeof regions];

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-[50vh] md:h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${region.image})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-raisinBlack/50 to-raisinBlack/80"></div>
        <div className="container-custom relative z-10 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {region.name}
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              {region.description}
            </p>
          </div>
        </div>
      </section>

      {/* Expeditions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-prussianBlue">
            {region.name} Expeditions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {region.expeditions.map((expedition) => (
              <Link
                href={expedition.link}
                key={expedition.id}
                className="expedition-card bg-white rounded-lg overflow-hidden hover:shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={expedition.image}
                    alt={expedition.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-prussianBlue">
                    {expedition.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {expedition.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1 text-blueLagoon" />
                      {expedition.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mountain className="h-4 w-4 mr-1 text-blueLagoon" />
                      {expedition.difficulty}
                    </div>
                  </div>

                  <div className="flex items-center text-blueLagoon font-medium text-sm">
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-prussianBlue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Plan Your {region.name} Adventure
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our expert guides will help you create the perfect expedition in the{" "}
            {region.name}. Contact us today to start planning your next mountain
            adventure.
          </p>
          <Link href="/contact" className="btn-secondary">
            Contact Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
