import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — DUD Travel" },
      { name: "description", content: "The team and story behind DUD Travel." },
    ],
  }),
  component: AboutPage,
});

const TEAM = [
  { name: "Ananya Rao", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Vikram Mehta", role: "Head of Product", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Sara Kapoor", role: "Design Lead", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Rohan Singh", role: "Engineering", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar overlay />
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
          alt="travel"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <div className="relative z-10 mx-auto max-w-[1320px] h-full px-6 flex flex-col justify-end pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-7xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We make travel <span className="italic" style={{ color: "#E8A87C" }}>effortless</span>
          </motion.h1>
          <p className="mt-4 max-w-xl text-white/85">
            DUD Travel is on a mission to remove the friction from every trip — from your morning cab to a transcontinental flight.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 py-16">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Meet the team
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <img src={m.img} alt={m.name} className="h-64 w-full object-cover" />
              <div className="p-4">
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm text-foreground/60">{m.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <Link to="/" className="inline-block mt-8 text-[#2563EB] hover:underline">← Back home</Link>
      </section>

      <Footer />
    </div>
  );
}
