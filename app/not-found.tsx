import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-b from-blue-lagoon/80 to-raisinBlack/80 py-24">
      {/* Heading */}
      <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl mb-8 text-white">
        404
      </h1>

      {/* Subheading */}
      <p className="text-3xl font-semibold mb-10 sm:text-4xl text-white/90">
        Oops! Page Not Found
      </p>

      {/* Button to go back to home */}
      <Button asChild size="lg">
        <Link
          href="/"
          className="flex items-center gap-2 bg-prussian-blue text-white px-6 py-3 rounded-lg hover:bg-prussian-blue/90 transition duration-200"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
