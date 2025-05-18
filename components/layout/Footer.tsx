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
import {
  FooterDetailItem,
  FooterDetailsData,
} from "@/graphql/api/fetchFooterDetails";

export type Item = {
  title: string;
  href?: string;
  description?: string;
  slug?: string;
  subcategories?: { title: string; href?: string; description?: string }[];
};

export default function Footer({ data }: { data: FooterDetailsData | null }) {
  const footerArray = data?.footerDetailsCollection?.items || [];

  const footerData = Object.fromEntries(
    footerArray.map((item: FooterDetailItem) => {
      return ["data", item];
    })
  );

  const {
    contactDetail,
    description,
    expeditionsCollection,
    regionsCollection,
  } = footerData?.data;

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
            <p className="text-gray-300 mb-6">{description || ""}</p>
            <div className="flex gap-4">
              <a
                href={contactDetail?.facebookLink || "#"}
                target="_blank"
                aria-label="Facebook"
                className="text-gray-300 hover:text-blueLagoon transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={contactDetail?.instagramLink || "#"}
                target="_blank"
                aria-label="Instagram"
                className="text-gray-300 hover:text-blueLagoon transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={contactDetail?.whatsappLink || "#"}
                target="_blank"
                aria-label="Twitter"
                className="text-gray-300 hover:text-blueLagoon transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Expeditions */}
          <div>
            <h4 className="font-azosans font-bold text-lg mb-4">Expeditions</h4>
            <ul className="space-y-3">
              {expeditionsCollection?.items.map((item: any) => {
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
              {regionsCollection?.items.map((item) => (
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
                  {/* 123 Mountain View Drive
                  <br />
                  Chamonix, 74400
                  <br />
                  France */}
                  {contactDetail?.address}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-blueLagoon shrink-0" />
                <span className="text-gray-300">
                  {contactDetail?.phoneNumber}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-blueLagoon shrink-0" />
                <span className="text-gray-300">{contactDetail?.email}</span>
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
