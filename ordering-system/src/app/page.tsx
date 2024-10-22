
import { HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        </main>
      </div>
    </HydrateClient>
  );
}
