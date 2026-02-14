import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Terms and Conditions | Extreme Himalayan Adventure",
  description:
    "Read the terms and conditions for using Extreme Himalayan Adventure services and website.",
};

export default function TermsPage() {
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
            Terms and Conditions
          </h1>
        </div>
      </div>

      <section className="container max-w-7xl px-4 py-12 mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Terms and Conditions
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
                Welcome to Extreme Himalayan Adventure. By accessing or using
                our services, you agree to be bound by these Terms and
                Conditions. Please read them carefully.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="booking-and-payment">
            <AccordionTrigger className="text-xl font-semibold">
              2. Booking and Payment
            </AccordionTrigger>
            <AccordionContent>
              <p>
                All bookings are subject to availability. Payment must be made
                in full before the start of your adventure. We accept various
                payment methods as specified on our website.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cancellations-and-refunds">
            <AccordionTrigger className="text-xl font-semibold">
              3. Cancellations and Refunds
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Cancellation policies vary depending on the trip. Refunds will
                be processed according to the terms outlined at the time of
                booking. Please review these carefully.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="health-and-safety">
            <AccordionTrigger className="text-xl font-semibold">
              4. Health and Safety
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Your health and safety are our priority. You must disclose any
                medical conditions before booking. Follow all safety
                instructions provided by our guides.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="liability">
            <AccordionTrigger className="text-xl font-semibold">
              5. Liability
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Extreme Himalayan Adventure is not liable for any injury, loss,
                or damage incurred during your trip, except where required by
                law. Participants assume all risks associated with adventure
                activities.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="intellectual-property">
            <AccordionTrigger className="text-xl font-semibold">
              6. Intellectual Property
            </AccordionTrigger>
            <AccordionContent>
              <p>
                All content on our website, including text, images, and logos,
                is owned by Extreme Himalayan Adventure or its licensors and is
                protected by intellectual property laws.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="governing-law">
            <AccordionTrigger className="text-xl font-semibold">
              7. Governing Law
            </AccordionTrigger>
            <AccordionContent>
              <p>
                These Terms and Conditions are governed by the laws of the
                country where Extreme Himalayan Adventure operates. Any disputes
                will be resolved in the appropriate courts.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="changes-to-terms">
            <AccordionTrigger className="text-xl font-semibold">
              8. Changes to Terms
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We may update these Terms and Conditions from time to time.
                Changes will be posted on this page with a revised &ldquo;Last
                Updated&rdquo; date.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact-us">
            <AccordionTrigger className="text-xl font-semibold">
              9. Contact Us
            </AccordionTrigger>
            <AccordionContent>
              <p>
                If you have any questions about these Terms and Conditions,
                please contact us at{" "}
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
        </Accordion>
      </section>
    </>
  );
}
