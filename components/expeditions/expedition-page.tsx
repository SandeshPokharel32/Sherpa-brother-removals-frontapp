"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CtaSection from "@/components/home/CtaSection";
import { Expedition } from "@/graphql/api/fetchAllExpeditions";

export default function ExpeditionsClientPage({
  expeditions,
}: {
  expeditions: Expedition[];
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredExpeditions, setFilteredExpeditions] =
    useState<any[]>(expeditions);

  // Handle search filter
  useEffect(() => {
    if (searchQuery) {
      setFilteredExpeditions(
        expeditions.filter(
          (expedition) =>
            expedition?.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            expedition?.subtitle
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            expedition?.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredExpeditions(expeditions);
    }
  }, [searchQuery, expeditions]);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-[50vh] md:h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${"/images/fallback-image.jpeg"})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        <div className="container-custom relative z-10 h-full flex flex-col justify-end pb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Explore Expeditions
          </h1>
        </div>
      </div>

      {/* Expeditions Section */}
      <section className="py-20 bg-gray-100">
        <div className="container-custom mb-20">
          <div className="flex justify-center">
            <input
              type="text"
              className="w-full md:w-1/2 lg:w-1/3 bg-white p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search expeditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12">
            {filteredExpeditions.length > 0 ? (
              filteredExpeditions.map((expedition: any, index: number) => (
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
                        <span className="h-4 w-4 mr-1 text-blueLagoon">📅</span>
                        {expedition.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="h-4 w-4 mr-1 text-blueLagoon">🏔️</span>
                        {expedition.altitude}
                      </div>
                    </div>

                    <div className="flex items-center text-blueLagoon font-semibold text-sm">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center text-xl text-gray-600">
                No expeditions found.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
