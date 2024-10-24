import { HydrateClient } from "~/trpc/server";
import { Navbar } from "./navbar";

export default function Overlay({ children }: { children?: React.ReactNode }) {
  return (
    <HydrateClient>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </HydrateClient>
  )
}