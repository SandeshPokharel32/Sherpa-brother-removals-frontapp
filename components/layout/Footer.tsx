"use client";
import Link from "next/link";
import {
  MountainSnow,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { ExpeditionTypesQuery } from "@/graphql/types";

export type Item = {
  title: string;
  href?: string;
  description?: string;
  slug?: string;
  subcategories?: { title: string; href?: string; description?: string }[];
};

export default function Footer({
  data,
}: {
  data: ExpeditionTypesQuery | null;
}) {
  console.log("🚀 ~ data:", data);

  const regionsData =
    data?.types?.items?.flatMap((category: any) => {
      return category.categories?.items || [];
    }) || [];

  const expeditionsData =
    (regionsData.length > 0 && regionsData[0].expeditions?.items) || [];

  console.log("🚀 ~ expeditionsData:", expeditionsData);
  // console.log("🚀 ~ expeditionsData:", expeditionsData);
  // console.log("🚀 ~ expeditionsData:", regionsData);
  return (
    <footer className="bg-raisin-black text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              {/* <MountainSnow className="h-8 w-8" />
              <span className="font-azosans font-bold text-xl tracking-wider">
                SUMMIT
              </span> */}
              <BrandLogo />
            </Link>
            <p className="text-gray-300 mb-6">
              Professional mountain guides offering summit expeditions and
              skiing services globally. With over 20 years of experience, we
              provide safe and unforgettable adventures.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-gray-300 hover:text-blueLagoon transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-gray-300 hover:text-blueLagoon transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-gray-300 hover:text-blueLagoon transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Expeditions */}
          <div>
            <h4 className="font-azosans font-bold text-lg mb-4">Expeditions</h4>
            <ul className="space-y-3">
              {expeditionsData.map((item: any) => {
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/expedition/${item.slug}`}
                      className="text-gray-300 hover:text-blueLagoon transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="font-azosans font-bold text-lg mb-4">Regions</h4>
            <ul className="space-y-3">
              {regionsData.length > 0 &&
                regionsData.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/categories/${item.slug}`}
                      className="text-gray-300 hover:text-blueLagoon transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-azosans font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-blueLagoon shrink-0" />
                <span className="text-gray-300">
                  123 Mountain View Drive
                  <br />
                  Chamonix, 74400
                  <br />
                  France
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-blueLagoon shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-blueLagoon shrink-0" />
                <span className="text-gray-300">
                  info@summitexpeditions.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Summit Expeditions. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <Link
              href="/terms"
              className="hover:text-blueLagoon transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-blueLagoon transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/safety"
              className="hover:text-blueLagoon transition-colors"
            >
              Safety
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
