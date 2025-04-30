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
  Backpack,
  DollarSign,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// This would typically come from a CMS or API
const expeditions = {
  "everest-base-camp": {
    title: "Everest Base Camp Trek",
    subtitle: "Journey to the foot of the world's highest peak",
    region: "Himalayas, Nepal",
    altitude: "5,364m / 17,598ft",
    duration: "14 days",
    difficulty: "Moderate",
    groupSize: "4-12",
    season: "March-May, September-November",
    price: "From $3,499",
    mainImage:
      "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
    galleryImages: [
      "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg",
      "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg",
      "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
      "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
    ],
    overview:
      "The trek to Everest Base Camp is one of the most iconic and rewarding hiking experiences in the world. This adventure takes you through the magnificent Khumbu region of Nepal, home to the Sherpa people, ancient monasteries, and stunning Himalayan peaks including Everest (8,848m), Lhotse, Nuptse, and Ama Dablam. The journey begins with a thrilling flight to Lukla and continues through picturesque villages, rhododendron forests, and dramatic suspension bridges. As you acclimate to the altitude, you'll have rest days in charming mountain towns like Namche Bazaar. The trek culminates at Everest Base Camp (5,364m) and an optional hike to Kala Patthar (5,545m) for the best views of Mount Everest.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu (1,400m)",
        description:
          "Arrive at Tribhuvan International Airport where our representative will meet you and transfer you to your hotel. Overnight in Kathmandu.",
      },
      {
        day: 2,
        title: "Fly to Lukla (2,840m), trek to Phakding (2,610m)",
        description:
          "Early morning flight to Lukla. Begin trek to Phakding, descending through Cheplung village. 3-4 hours walking. Overnight in Phakding.",
      },
      {
        day: 3,
        title: "Trek to Namche Bazaar (3,440m)",
        description:
          "Ascend through pine forests along the Dudh Kosi River. Cross several suspension bridges, including the famous Hillary Bridge. Steep climb to Namche Bazaar. 5-6 hours walking. Overnight in Namche Bazaar.",
      },
      {
        day: 4,
        title: "Acclimatization day in Namche Bazaar",
        description:
          "Rest day for acclimatization. Optional hike to Everest View Hotel for panoramic views. Visit the Sherpa Culture Museum and local market. Overnight in Namche Bazaar.",
      },
      {
        day: 5,
        title: "Trek to Tengboche (3,860m)",
        description:
          "Trek along the side of the valley with views of Everest, Lhotse, and Ama Dablam. Descend to Phunki Tenga then climb through rhododendron forest to Tengboche Monastery. 5-6 hours walking. Overnight in Tengboche.",
      },
      {
        day: 6,
        title: "Trek to Dingboche (4,410m)",
        description:
          "Descend through forest to Deboche, cross the Imja River, and climb to Pangboche village. Continue to the Imja Valley and Dingboche. 5-6 hours walking. Overnight in Dingboche.",
      },
      {
        day: 7,
        title: "Acclimatization day in Dingboche",
        description:
          "Rest day for acclimatization. Optional hike to Nangkartshang Peak (5,083m) for views of Makalu and Ama Dablam. Overnight in Dingboche.",
      },
      {
        day: 8,
        title: "Trek to Lobuche (4,940m)",
        description:
          "Trek along the lateral moraine of Khumbu Glacier. Pass stone memorials for climbers who have perished on Everest. 4-5 hours walking. Overnight in Lobuche.",
      },
      {
        day: 9,
        title:
          "Trek to Everest Base Camp (5,364m), return to Gorak Shep (5,170m)",
        description:
          "Early morning trek to Gorak Shep. Drop bags and continue to Everest Base Camp. Return to Gorak Shep for overnight stay. 7-8 hours walking. Overnight in Gorak Shep.",
      },
      {
        day: 10,
        title: "Climb Kala Patthar (5,545m), trek to Pheriche (4,280m)",
        description:
          "Pre-dawn hike to Kala Patthar for sunrise views of Everest. Return to Gorak Shep for breakfast, then descend to Pheriche. 7-8 hours walking. Overnight in Pheriche.",
      },
      {
        day: 11,
        title: "Trek to Namche Bazaar (3,440m)",
        description:
          "Descend through Pangboche and Tengboche to Namche Bazaar. 6-7 hours walking. Overnight in Namche Bazaar.",
      },
      {
        day: 12,
        title: "Trek to Lukla (2,840m)",
        description:
          "Final day of trekking. Descend to Phakding then continue to Lukla. 6-7 hours walking. Overnight in Lukla.",
      },
      {
        day: 13,
        title: "Fly to Kathmandu",
        description:
          "Morning flight from Lukla to Kathmandu. Free time to explore the city. Farewell dinner in the evening. Overnight in Kathmandu.",
      },
      {
        day: 14,
        title: "Departure from Kathmandu",
        description:
          "Transfer to Tribhuvan International Airport for your departure flight.",
      },
    ],
    included: [
      "All airport/hotel transfers",
      "Domestic flights (Kathmandu-Lukla-Kathmandu)",
      "3 nights accommodation in Kathmandu with breakfast",
      "Teahouse accommodation during the trek",
      "All meals during the trek (breakfast, lunch, and dinner)",
      "Experienced English-speaking guide and porters",
      "Sagarmatha National Park permit and TIMS card",
      "Staff insurance, salary, equipment, food, and accommodation",
      "Welcome and farewell dinners in Kathmandu",
      "Medical kit",
    ],
    notIncluded: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance (mandatory)",
      "Personal expenses (phone calls, laundry, bar bills, etc.)",
      "Tips for guides and porters",
      "Extra nights in Kathmandu due to early return or flight cancellation",
      "Personal trekking equipment",
    ],
    gear: [
      "Waterproof trekking boots",
      "Down jacket and sleeping bag (can be rented)",
      "Multiple layers of clothing for varying temperatures",
      "Thermal underwear",
      "Waterproof jacket and pants",
      "Trekking poles",
      "Headlamp with spare batteries",
      "Water purification tablets or filter",
      "Comprehensive medical kit",
      "High-factor sunscreen and lip balm",
      "Sunglasses with UV protection",
    ],
  },
  "mont-blanc": {
    title: "Mont Blanc Summit",
    subtitle: "Climb to the top of Western Europe's highest peak",
    region: "French Alps, France",
    altitude: "4,810m / 15,781ft",
    duration: "7 days",
    difficulty: "Challenging",
    groupSize: "2-4",
    season: "June-September",
    price: "From $2,799",
    mainImage:
      "https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg",
    galleryImages: [
      "https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg",
      "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg",
      "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
      "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg",
    ],
    overview:
      "Climbing Mont Blanc (4,810m), the highest peak in Western Europe, is a dream for many mountaineers. This challenging expedition combines technical alpine climbing with breathtaking scenery in the heart of the French Alps. Our 7-day program includes essential acclimatization climbs and training sessions to prepare you for the summit push. Using the classic Goûter Route, we'll ascend through dramatic glacier terrain and rocky ridges to reach the magnificent summit dome, where you'll enjoy panoramic views across France, Italy, and Switzerland. This expedition is designed for those with previous mountaineering experience who are looking to challenge themselves on one of the world's most famous peaks.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Chamonix",
        description:
          "Arrive in Chamonix, meet your guide for a detailed briefing and equipment check. Overnight in Chamonix.",
      },
      {
        day: 2,
        title: "Training Day - Glacier du Tour",
        description:
          "Travel to Le Tour and take the chairlift to practice essential mountaineering skills on Glacier du Tour. Review rope techniques, crampon use, and ice axe self-arrest. Return to Chamonix for overnight.",
      },
      {
        day: 3,
        title: "Acclimatization Climb - Gran Paradiso (Day 1)",
        description:
          "Drive to Val d'Aosta, Italy. Trek to Rifugio Vittorio Emanuele II (2,732m) in Gran Paradiso National Park. 3-4 hours hiking. Overnight in the mountain hut.",
      },
      {
        day: 4,
        title: "Summit Gran Paradiso (4,061m) and Return",
        description:
          "Alpine start to climb Gran Paradiso (4,061m), Italy's highest mountain. Return to the hut and drive back to Chamonix. 8-10 hours total. Overnight in Chamonix.",
      },
      {
        day: 5,
        title: "Rest Day in Chamonix",
        description:
          "Rest and prepare for Mont Blanc summit attempt. Review weather forecasts and finalize equipment. Overnight in Chamonix.",
      },
      {
        day: 6,
        title: "Mont Blanc Ascent (Day 1)",
        description:
          "Take the Bellevue cable car to the Nid d'Aigle (2,372m). Trek to Tête Rousse Hut (3,167m) or Goûter Hut (3,835m) depending on conditions. 4-6 hours hiking. Overnight in mountain hut.",
      },
      {
        day: 7,
        title: "Summit Day and Descent",
        description:
          "Alpine start (usually around 2-3 AM). Climb via the Goûter Route to the summit of Mont Blanc (4,810m). Descend to Nid d'Aigle and return to Chamonix. 10-14 hours total. Celebration dinner and overnight in Chamonix.",
      },
    ],
    included: [
      "Professional IFMGA/UIAGM mountain guide (1:2 ratio on summit day)",
      "4 nights accommodation in Chamonix (3-star hotel)",
      "2 nights in mountain huts (dormitory style)",
      "All breakfasts and dinners while in mountain huts",
      "All lifts and local transportation as per itinerary",
      "Group equipment (ropes, etc.)",
      "Welcome and farewell dinners",
    ],
    notIncluded: [
      "International flights",
      "Personal mountaineering equipment (can be rented)",
      "Lunches and dinners in Chamonix (except welcome/farewell dinners)",
      "Travel insurance (mandatory, must include mountain rescue)",
      "Personal expenses",
      "Tips for guides",
      "Additional nights required due to weather delays",
    ],
    gear: [
      "Mountaineering boots (stiff enough for crampons)",
      "Crampons (12-point)",
      "Ice axe",
      "Climbing harness",
      "Helmet",
      "Down jacket",
      "Waterproof shell jacket and pants",
      "Thermal layers",
      "Mountaineering gloves",
      "Climbing pack (30-40L)",
      "Headlamp with spare batteries",
      "Sleeping bag liner (for huts)",
      "Sunglasses with side protection",
      "High SPF sunscreen and lip protection",
    ],
  },
};

type ExpeditionParams = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return Object.keys(expeditions).map((key) => ({ slug: key }));
}

export default function ExpeditionPage({ params }: ExpeditionParams) {
  const { slug } = params;
  if (!expeditions[slug as keyof typeof expeditions]) {
    notFound();
  }

  const expedition = expeditions[slug as keyof typeof expeditions];

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-[60vh] md:h-[75vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${expedition.mainImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-raisinBlack/80"></div>
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
      <section className="py-8 bg-prussianBlue text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-blueLagoon" />
              <div>
                <p className="text-sm text-white/70">Region</p>
                <p className="font-medium">{expedition.region}</p>
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
                {expedition.galleryImages.map((image, index) => (
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

              <h2 className="text-3xl font-bold mb-6 text-prussianBlue">
                Itinerary
              </h2>
              <div className="mb-12">
                <Accordion type="single" collapsible className="w-full">
                  {expedition.itinerary.map((day) => (
                    <AccordionItem key={day.day} value={`day-${day.day}`}>
                      <AccordionTrigger className="text-black text-lg font-medium">
                        Day {day.day}: {day.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {day.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-prussianBlue">
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blueLagoon">
                    Included
                  </h3>
                  <ul className="space-y-2">
                    {expedition.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blueLagoon">
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {expedition.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-prussianBlue">
                Required Equipment
              </h2>
              <div className="mb-12">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {expedition.gear.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Backpack className="h-5 w-5 text-blueLagoon flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
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

                <div className="border-t border-gray-200 pt-6 mb-6">
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
                </div>

                <Link
                  href="/contact"
                  className="block w-full bg-blueLagoon hover:bg-blueLagoon/90 text-white text-center py-3 rounded-md font-medium transition-colors mb-3"
                >
                  Book This Expedition
                </Link>
                <Link
                  href="/contact"
                  className="block w-full border border-prussianBlue text-prussianBlue text-center py-3 rounded-md font-medium hover:bg-prussianBlue/5 transition-colors"
                >
                  Request Custom Dates
                </Link>
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
            Discover more adventures in the {expedition.region.split(",")[0]}{" "}
            region or explore other expeditions of similar difficulty.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/regions/${expedition.region
                .split(",")[0]
                .toLowerCase()
                .replace(" ", "-")}`}
              className="btn-primary"
            >
              Browse {expedition.region.split(",")[0]} Trips
            </Link>
            <Link href="/expeditions" className="btn-secondary">
              View All Expeditions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
