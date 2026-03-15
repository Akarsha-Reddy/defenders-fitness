export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl text-[var(--color-accent)] mb-4 font-hero uppercase tracking-wider">
        Defenders Fitness
      </h1>
      <p className="text-xl text-[var(--color-muted)] max-w-2xl text-center mb-8">
        Production-ready Next.js 15 fitness website with Three.js, GSAP, and Tailwind CSS v4.
      </p>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-[var(--color-accent)] text-white font-bold rounded hover:opacity-80 transition-all">
          Join Now
        </button>
        <button className="px-6 py-3 border border-[var(--color-gold)] text-[var(--color-gold)] font-bold rounded hover:bg-[var(--color-gold)] hover:text-black transition-all">
          View Classes
        </button>
      </div>
    </main>
  );
}
