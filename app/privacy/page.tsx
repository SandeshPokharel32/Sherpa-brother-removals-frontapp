import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Privacy Policy | Extreme Himalayan Adventure",
  description:
    "Read how we collect, use, and protect your personal information at Extreme Himalayan Adventure.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div
        className="relative h-[50vh] md:h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${"/images/fallback-image.jpeg"})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-raisinBlack/50 to-raisinBlack/80"></div>
        <div className="container-custom relative z-10 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Privacy policy
          </h1>
        </div>
      </div>

      <section className="container max-w-7xl px-4 py-12 mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          Last updated: May 13, 2025
        </p>
        <Separator className="mb-8" />

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="introduction">
            <AccordionTrigger className="text-xl font-semibold">
              1. Introduction
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Welcome to Extreme Himalayan Adventure. We are committed to
                protecting your privacy and ensuring the safety of your personal
                information.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="information-we-collect">
            <AccordionTrigger className="text-xl font-semibold">
              2. Information We Collect
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Personal identification information (name, email address,
                  phone number)
                </li>
                <li>Payment details for bookings</li>
                <li>Travel preferences and emergency contact details</li>
                <li>IP address and browser data (for analytics)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-we-use-your-information">
            <AccordionTrigger className="text-xl font-semibold">
              3. How We Use Your Information
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                <li>To process bookings and payments</li>
                <li>To send trip updates and promotional emails</li>
                <li>To improve user experience on our website</li>
                <li>To comply with legal obligations</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-sharing">
            <AccordionTrigger className="text-xl font-semibold">
              4. Data Sharing
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We do not sell your personal data. We may share your information
                with:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>
                  Trusted partners (guides, insurance, transport providers)
                </li>
                <li>Government authorities when legally required</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-security">
            <AccordionTrigger className="text-xl font-semibold">
              5. Data Security
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We implement industry-standard security practices to protect
                your data from unauthorized access, alteration, or destruction.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="your-rights">
            <AccordionTrigger className="text-xl font-semibold">
              6. Your Rights
            </AccordionTrigger>
            <AccordionContent>
              <p>
                You have the right to access, update, or delete your personal
                information. Contact us anytime at{" "}
                <a
                  href="mailto:info@extremehimalayan.com"
                  className="underline text-primary"
                >
                  info@extremehimalayan.com
                </a>
                .
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="changes-to-policy">
            <AccordionTrigger className="text-xl font-semibold">
              7. Changes to This Policy
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We may update this Privacy Policy occasionally. Changes will be
                posted on this page with a revised "Last Updated" date.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact-us">
            <AccordionTrigger className="text-xl font-semibold">
              8. Contact Us
            </AccordionTrigger>
            <AccordionContent>
              <p>
                If you have any questions about this policy, please contact us
                at:{" "}
                <a
                  href="mailto:info@extremehimalayan.com"
                  className="underline text-primary"
                >
                  info@extremehimalayan.com
                </a>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}
