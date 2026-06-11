"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden:   { opacity: 0, y: 18 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="hero-glow absolute -top-32 -left-32 opacity-60 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-14 items-center">

        {/* Left — text */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="visible"
          className="relative z-10" // Added z-10 to ensure text stays above the mobile portrait
        >

          <motion.div variants={item} className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xs tracking-widest uppercase font-medium text-text2">
              Full-Stack Developer · Lagos, Nigeria
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-extrabold leading-[1.06] tracking-tight mb-5 text-text"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)" }}
          >
            Building<br />
            <span className="text-accent">products that</span><br />
            matter.
          </motion.h1>

          <motion.p variants={item} className="text-base leading-relaxed max-w-md mb-8 text-text2">
            I design and engineer AI-powered mobile and web experiences — from
            document automation to social discovery — for users in Africa and
            beyond. Founder of <span className="text-text">Empyreal Works</span>.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-accent hover:opacity-85 transition-opacity"
            >
              View Work
            </a>
            <a
              href="#ai"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-border2 text-text2 hover:border-accent transition-colors"
            >
              Ask My AI Guide ✦
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-5">
            {[
              { label: "GitHub",    href: "https://github.com/adelaykay" },
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/adeleke-olasope-0a097b19b/" },
              { label: "Portfolio", href: "https://adeleke.web.app" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text3 hover:text-accent transition-colors flex items-center gap-1"
              >
                ↗ {l.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — avatar */}
        <div className="absolute -right-12 top-16 w-[280px] opacity-15 pointer-events-none z-0 lg:relative lg:right-auto lg:top-auto lg:w-full lg:opacity-100 lg:pointer-events-auto lg:z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          >
            <AvatarCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AvatarCard() {
  return (
    <div
      className="relative rounded-2xl border border-border overflow-hidden bg-surface"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Ambient gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #18182a 0%, #1a0e3a 50%, #090e1a 100%)" }}
      />

      {/* Portrait */}
      <Image src="/portrait.png" alt="Portrait of Adeleke Olasope" fill style={{ objectFit: "cover" }} />

      {/* Badge */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border"
        style={{ background: "rgba(9,9,15,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="font-display font-bold text-sm text-text">Adeleke Olasope</div>
        <div className="text-xs mt-0.5 text-text3">Software Developer · Empyreal Works</div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-1.5 h-1.5 rounded-full pulse-dot bg-live" />
          <span className="text-xs text-live">Available for opportunities</span>
        </div>
      </div>
    </div>
  );
}