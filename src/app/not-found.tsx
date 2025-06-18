import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col text-center min-h-screen text-xl text-foreground">
      <div>
        <h2>404 | Page not found</h2>
      </div>
      <div>
        <p className="underline underline-offset-4">
          You cannot Escape From Tarkov...
        </p>
      </div>
    </div>
  );
}
