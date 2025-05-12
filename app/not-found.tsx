import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl mb-8">
        404
      </h1>

      <p className="text-3xl font-semibold mb-10 sm:text-4xl">Page Not Found</p>

      <Button asChild size="lg">
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
