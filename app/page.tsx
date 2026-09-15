import { InitializationCard } from "@/components/initialization-card";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-8">
      <div className="confetti confetti-coral top-[12%] left-[8%] rotate-12" />
      <div className="confetti confetti-blue top-[18%] right-[10%] -rotate-12" />
      <div className="confetti confetti-yellow bottom-[16%] left-[12%] -rotate-6" />
      <div className="confetti confetti-indigo right-[9%] bottom-[12%] rotate-6" />
      <div className="bg-party-blue/70 absolute top-[24%] left-[18%] size-3 rounded-full" />
      <div className="bg-party-coral/60 absolute right-[19%] bottom-[23%] size-4 rounded-full" />

      <InitializationCard />
    </main>
  );
}
