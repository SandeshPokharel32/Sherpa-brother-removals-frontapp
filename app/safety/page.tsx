import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Safety | Extreme Himalayan Adventure",
  description:
    "Learn about the safety measures and guidelines at Extreme Himalayan Adventure to ensure your well-being during your adventure.",
};

export default function SafetyPage() {
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
            Safety
          </h1>
        </div>
      </div>

      <section className="container max-w-7xl px-4 py-12 mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Safety</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Last updated: May 13, 2025
        </p>
        <Separator className="mb-8" />

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="safety-overview">
            <AccordionTrigger className="text-xl font-semibold">
              1. Safety Overview
            </AccordionTrigger>
            <AccordionContent>
              <p>
                At Extreme Himalayan Adventure, your safety is our top priority.
                We follow strict safety protocols and continuously update our
                procedures to ensure a secure and enjoyable experience.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="equipment-standards">
            <AccordionTrigger className="text-xl font-semibold">
              2. Equipment Standards
            </AccordionTrigger>
            <AccordionContent>
              <p>
                All equipment provided is regularly inspected and maintained to
                meet industry safety standards. We only use certified gear for
                all activities.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="guide-training">
            <AccordionTrigger className="text-xl font-semibold">
              3. Guide Training and Certification
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Our guides are highly trained professionals with certifications
                in first aid, wilderness survival, and emergency response. They
                are experienced in managing risks in challenging environments.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="health-requirements">
            <AccordionTrigger className="text-xl font-semibold">
              4. Health Requirements
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Participants must disclose any medical conditions prior to
                booking and ensure they are physically fit for the adventure. We
                reserve the right to refuse participation if safety is
                compromised.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="emergency-procedures">
            <AccordionTrigger className="text-xl font-semibold">
              5. Emergency Procedures
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We have comprehensive emergency plans in place, including
                evacuation protocols and communication systems to respond
                quickly to any incidents.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="participant-responsibilities">
            <AccordionTrigger className="text-xl font-semibold">
              6. Participant Responsibilities
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Participants must follow all safety instructions, respect the
                environment, and act responsibly to ensure their own safety and
                that of others.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact-safety-team">
            <AccordionTrigger className="text-xl font-semibold">
              7. Contact Our Safety Team
            </AccordionTrigger>
            <AccordionContent>
              <p>
                For any safety concerns or questions, please contact our safety
                team at{" "}
                <a
                  href="mailto:safety@extremehimalayan.com"
                  className="underline text-primary"
                >
                  safety@extremehimalayan.com
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
