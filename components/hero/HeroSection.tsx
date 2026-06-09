"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export function HeroSection() {
  return (
    <section style={{ maxWidth: "960px", margin: "0 auto", padding: "80px 24px" }} className="relative overflow-hidden mx-auto max-w-[960px] px-6 pt-20 pb-24">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="hero-glow absolute -top-32 -left-32 opacity-60 pointer-events-none"
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-14 items-center">
        {/* Text */}
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item} className="flex items-center gap-2 mb-5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="text-xs tracking-widest uppercase font-medium"
              style={{ color: "var(--text2)" }}
            >
              Full-Stack Developer · Lagos, Nigeria
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-extrabold leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
          >
            Building
            <br />
            <span style={{ color: "var(--accent)" }}>products that</span>
            <br />
            matter.
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base leading-relaxed max-w-md mb-8"
            style={{ color: "var(--text2)" }}
          >
            I design and engineer AI-powered mobile and web experiences — from
            document automation to social discovery — for users in Africa and
            beyond. Founder of{" "}
            <span style={{ color: "var(--text)" }}>Empyreal Works</span>.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-85"
              style={{ background: "var(--accent)" }}
            >
              View Work
            </a>
            <a
              href="#ai"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
              style={{ borderColor: "var(--border2)", color: "var(--text2)" }}
            >
              Ask My AI Guide ✦
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-5">
            {[
              { label: "GitHub", href: "https://github.com/adelaykay" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/adeleke-olasope-0a097b19b/" },
              { label: "Portfolio", href: "https://adeleke.web.app" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs flex items-center gap-1 transition-colors"
                style={{ color: "var(--text3)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text3)")
                }
              >
                ↗ {l.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <AvatarCard />
        </motion.div>
      </div>
    </section>
  );
}

function AvatarCard() {
  return (
    <div
      className="relative rounded-2xl border overflow-hidden"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        aspectRatio: "3/4",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, var(--surface) 0%, #0e1d3a 50%, #090e1a 100%)",
        }}
      />

      {/* Stylised portrait — oblong head, pointy at top, natural hair */}
      <Image
      src="/hero.png"
      alt="Profile"
      width={500}
      height={500}
      className="w-full h-full object-cover absolute inset-0"
      />

      {/* Badge */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 border-t"
        style={{ background: "rgba(9,9,15,0.85)", backdropFilter: "blur(8px)", borderColor: "var(--border)" }}
      >
        <div className="font-display font-bold text-sm" style={{ color: "var(--text)" }}>
          Adeleke Olasope
        </div>
        <div className="text-xs mt-0.5" style={{ color: "var(--text3)" }}>
          Software Developer · Empyreal Works
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "var(--live)" }} />
          <span className="text-xs" style={{ color: "var(--live)" }}>
            Available for opportunities
          </span>
        </div>
      </div>
    </div>
  );
}
