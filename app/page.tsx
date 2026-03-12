"use client";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

type Project = {
  num: string;
  name: string;
  desc: string;
  slug: string;
};

const projects: Project[] = [
  {
    num: "001",
    name: "Portfolio Website",
    desc: "This portfolio — built with Next.js and deployed on Vercel. Fully responsive with custom animations.",
    slug: "portfolio-website",
  },
  {
    num: "002",
    name: "WLAN Installation",
    desc: "Configured a MikroTik-based WLAN during internship including DHCP, wireless security, and physical installation.",
    slug: "wlan-installation",
  },
  {
    num: "003",
    name: "Your Next Project",
    desc: "Something cool is coming. Stay tuned.",
    slug: "coming-soon",
  },
];

export default function Home() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    const navbar = document.getElementById("navbar");
    if (!cursor || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.classList.add("active");
      ring.classList.add("active");
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button"))
        cursor.classList.add("hovered");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button"))
        cursor.classList.remove("hovered");
    };
    const onScroll = () => {
      navbar?.classList.toggle("scrolled", window.scrollY > 50);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", onScroll);

    const loop = () => {
      cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0a;
          --surface: #111111;
          --border: #1e1e1e;
          --text: #e8e4dc;
          --muted: #5a5a5a;
          --accent: #c8f060;
          --accent2: #60c8f0;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          line-height: 1.6;
          cursor: none;
        }

        .cursor {
          width: 8px; height: 8px;
          background: var(--accent);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          top: 0; left: 0;
          will-change: transform;
          transition: opacity 0.3s, width 0.15s, height 0.15s;
        }
        .cursor-ring {
          width: 32px; height: 32px;
          border: 1px solid var(--accent);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          opacity: 0;
          top: 0; left: 0;
          will-change: transform;
          transition: opacity 0.3s;
        }
        .cursor.active { opacity: 1; }
        .cursor-ring.active { opacity: 0.35; }
        .cursor.hovered { width: 14px; height: 14px; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

        nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 24px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s, background 0.3s;
        }
        nav.scrolled {
          background: rgba(10,10,10,0.9);
          border-color: var(--border);
          backdrop-filter: blur(12px);
        }
        .nav-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          color: var(--accent);
          text-decoration: none;
        }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--accent); }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 48px 80px;
          position: relative;
          overflow: hidden;
        }
        .hero-bg-text {
          position: absolute;
          top: 50%;
          left: -20px;
          transform: translateY(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(180px, 30vw, 420px);
          color: transparent;
          -webkit-text-stroke: 1px #1a1a1a;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .hero-tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp 0.8s 0.2s forwards;
        }
        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 10vw, 140px);
          line-height: 0.9;
          letter-spacing: 2px;
          opacity: 0;
          animation: fadeUp 0.8s 0.4s forwards;
        }
        .hero-title span { color: var(--accent); }
        .hero-sub {
          max-width: 480px;
          font-size: 15px;
          color: var(--muted);
          margin-top: 28px;
          line-height: 1.8;
          opacity: 0;
          animation: fadeUp 0.8s 0.6s forwards;
        }
        .hero-cta {
          display: flex;
          gap: 16px;
          margin-top: 40px;
          opacity: 0;
          animation: fadeUp 0.8s 0.8s forwards;
        }
        .btn-primary {
          padding: 14px 32px;
          background: var(--accent);
          color: #0a0a0a;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 500;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(200, 240, 96, 0.25);
        }
        .btn-outline {
          padding: 14px 32px;
          border: 1px solid var(--border);
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

        .scroll-indicator {
          position: absolute;
          right: 48px;
          bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: fadeIn 1s 1.2s forwards;
        }
        .scroll-indicator span {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
          writing-mode: vertical-rl;
        }
        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollPulse 2s infinite;
        }

        section { padding: 120px 48px; }
        .section-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 64px;
        }
        .section-num {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--accent);
          letter-spacing: 2px;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 5vw, 56px);
          letter-spacing: 2px;
        }
        .section-line { flex: 1; height: 1px; background: var(--border); }

        .about-grid {
          display: grid;
          grid-template-columns: 240px 1fr 160px;
          gap: 48px;
          align-items: start;
        }
        .about-photo-col { display: flex; flex-direction: column; gap: 12px; }
        .about-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
        }
        .about-photo-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 24px; height: 24px;
          border-top: 2px solid var(--accent);
          border-left: 2px solid var(--accent);
          z-index: 2;
          pointer-events: none;
        }
        .about-photo-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 24px; height: 24px;
          border-bottom: 2px solid var(--accent);
          border-right: 2px solid var(--accent);
          z-index: 2;
          pointer-events: none;
        }
        .about-photo-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(30%) contrast(1.05);
          transition: filter 0.4s;
        }
        .about-photo-wrap:hover img { filter: grayscale(0%) contrast(1.1); }
        .about-photo-placeholder {
          width: 100%; height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--muted);
        }
        .about-photo-placeholder span:first-child { font-size: 24px; opacity: 0.25; }
        .about-photo-placeholder span:last-child {
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.35;
          text-align: center;
          padding: 0 12px;
        }
        .about-photo-caption {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          opacity: 0.45;
        }
        .about-text-col { display: flex; flex-direction: column; padding-top: 4px; }
        .about-text { font-size: 15px; color: var(--muted); line-height: 1.95; }
        .about-text p + p { margin-top: 18px; }
        .about-text strong { color: var(--text); font-weight: 500; }
        .about-stats-col { display: flex; flex-direction: column; gap: 2px; padding-top: 4px; }
        .stat-box {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 20px 16px;
          transition: border-color 0.2s;
        }
        .stat-box:hover { border-color: var(--accent); }
        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: var(--accent);
          line-height: 1;
        }
        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 4px;
        }

        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .skill-card {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 36px 32px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 2px; height: 0;
          background: var(--accent);
          transition: height 0.3s;
        }
        .skill-card:hover { border-color: var(--border); }
        .skill-card:hover::before { height: 100%; }
        .skill-icon { font-size: 28px; margin-bottom: 16px; }
        .skill-name { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; margin-bottom: 10px; }
        .skill-desc { font-size: 13px; color: var(--muted); line-height: 1.7; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
        .skill-tag {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px;
          border: 1px solid var(--border);
          color: var(--muted);
        }

        .projects-list { display: flex; flex-direction: column; gap: 2px; }
        .project-item {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 36px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: border-color 0.2s, background 0.2s;
          text-decoration: none;
          color: inherit;
        }
        .project-item:hover { border-color: var(--accent); background: #141414; }
        .project-left { flex: 1; }
        .project-num { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--accent); letter-spacing: 2px; margin-bottom: 10px; }
        .project-name { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 1px; }
        .project-desc { font-size: 13px; color: var(--muted); margin-top: 8px; max-width: 480px; }
        .project-arrow { font-size: 28px; color: var(--muted); transition: color 0.2s, transform 0.2s; }
        .project-item:hover .project-arrow { color: var(--accent); transform: translateX(6px); }

        .contact-inner { max-width: 720px; }
        .contact-big {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 8vw, 96px);
          letter-spacing: 2px;
          line-height: 0.95;
          margin-bottom: 40px;
        }
        .contact-big span { color: var(--accent); }
        .contact-links { display: flex; flex-direction: column; gap: 2px; margin-top: 48px; }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          border: 1px solid var(--border);
          text-decoration: none;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 1px;
          transition: border-color 0.2s, color 0.2s;
        }
        .contact-link:hover { border-color: var(--accent); color: var(--accent); }
        .contact-link-label { font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: var(--border); min-width: 60px; }
        .contact-link:hover .contact-link-label { color: var(--accent); opacity: 0.5; }

        footer {
          padding: 32px 48px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        footer span { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 2px; color: var(--muted); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes scrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }

        .video-section { padding: 0 48px 120px; display: flex; justify-content: flex-end; }
        .video-card { width: 320px; }
        .video-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
        .video-wrapper { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border: 1px solid var(--border); background: #000; }
        .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }

        @media (max-width: 768px) {
          body { cursor: auto; }
          .cursor, .cursor-ring { display: none; }
          nav { padding: 20px 24px; }
          .nav-links { display: none; }
          .hero { padding: 0 24px 60px; }
          .hero-bg-text { font-size: 28vw; }
          .scroll-indicator { display: none; }
          section { padding: 72px 24px; }
          .about-grid { grid-template-columns: 1fr; gap: 32px; }
          .about-photo-col { display: grid; grid-template-columns: 120px 1fr; gap: 16px; align-items: end; }
          .about-photo-wrap { aspect-ratio: 3 / 4; }
          .about-stats-col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
          .skills-grid { grid-template-columns: 1fr; }
          .project-item { padding: 24px 20px; }
          .project-name { font-size: 22px; }
          .contact-big { font-size: clamp(36px, 12vw, 64px); }
          .video-section { padding: 0 24px 72px; }
          .video-card { width: 100%; }
          footer { padding: 24px; flex-direction: column; gap: 10px; text-align: center; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 14vw; }
          .hero-cta { flex-direction: column; }
          .btn-primary, .btn-outline { text-align: center; }
          .about-photo-col { grid-template-columns: 1fr; }
          .about-photo-wrap { aspect-ratio: 4 / 3; }
          .about-stats-col { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <nav id="navbar">
        <Link href="/" className="nav-logo">Achmad Atha</Link>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-bg-text">ATHA</div>
        <div className="hero-tag">— Available for opportunities</div>
        <h1 className="hero-title">
          IT Student<br />
          <span>&amp;</span> Developer
        </h1>
        <p className="hero-sub">
          Based in Indonesia. Passionate about networking, web development, and building things that work beautifully.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="video-section">
        <div className="video-card">
          <div className="video-label">— Featured Video</div>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/tMn_OOMfS5w"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Featured video"
            />
          </div>
        </div>
      </div>

      <section id="about">
        <div className="section-header">
          <span className="section-num">01</span>
          <h2 className="section-title">About</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid">
          <div className="about-photo-col">
            <div className="about-photo-wrap">
              {/* To add your photo: replace the div below with <img src="/photo.jpg" alt="Achmad Atha" /> */}
              <img src="/photo.HEIC" alt="Achmad Atha" />
            </div>
            <div className="about-photo-caption">— Achmad Atha · ID</div>
          </div>
          <div className="about-text-col">
            <div className="about-text">
              <p>I&apos;m a vocational IT student from Indonesia, currently finishing my studies with a focus on <strong>networking and web development</strong>. I enjoy solving technical problems and building things from the ground up.</p>
              <p>My background spans <strong>MikroTik network configuration</strong>, PC hardware, and software troubleshooting. Outside of tech, I&apos;m fluent in Japanese and English alongside Bahasa Indonesia.</p>
              <p>I&apos;m currently looking for opportunities where I can apply my technical skills and keep growing as a developer and IT professional.</p>
            </div>
          </div>
          <div className="about-stats-col">
            <div className="stat-box"><div className="stat-num">3</div><div className="stat-label">Languages</div></div>
            <div className="stat-box"><div className="stat-num">TKJ</div><div className="stat-label">SMK Major</div></div>
            <div className="stat-box"><div className="stat-num">∞</div><div className="stat-label">Curiosity</div></div>
            <div className="stat-box"><div className="stat-num">ID</div><div className="stat-label">Based In</div></div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="section-header">
          <span className="section-num">02</span>
          <h2 className="section-title">Skills</h2>
          <div className="section-line" />
        </div>
        <div className="skills-grid">
          {[
            { icon: "🌐", name: "Networking", desc: "Hands-on experience configuring MikroTik routers, network troubleshooting, and basic infrastructure setup.", tags: ["MikroTik", "TCP/IP", "VLAN", "Routing"] },
            { icon: "💻", name: "Web Development", desc: "Building websites and web applications using modern tools like Next.js, React, and Tailwind CSS.", tags: ["Next.js", "React", "HTML/CSS", "JavaScript"] },
            { icon: "🔧", name: "Hardware & OS", desc: "PC building, component diagnostics, Windows optimization, driver management, and system tuning.", tags: ["Windows", "Hardware", "Drivers", "Optimization"] },
            { icon: "🗣️", name: "Languages", desc: "Multilingual communicator — able to work in professional and technical contexts across three languages.", tags: ["Indonesian", "English", "Japanese"] },
            { icon: "⚙️", name: "IT Support", desc: "Software troubleshooting, system maintenance, and technical problem-solving for hardware and software issues.", tags: ["Troubleshooting", "Maintenance", "Support"] },
            { icon: "📚", name: "Always Learning", desc: "Currently deepening knowledge in web development, networking certifications, and software engineering fundamentals.", tags: ["Self-Taught", "Curious", "Driven"] },
          ].map((skill, i) => (
            <div className="skill-card" key={i}>
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-desc">{skill.desc}</div>
              <div className="skill-tags">
                {skill.tags.map((t, j) => <span className="skill-tag" key={j}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="projects">
        <div className="section-header">
          <span className="section-num">03</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>
        <div className="projects-list">
          {projects.map((proj: Project) => (
            <Link href={`/projects/${proj.slug}`} className="project-item" key={proj.num}>
              <div className="project-left">
                <div className="project-num">{proj.num}</div>
                <div className="project-name">{proj.name}</div>
                <div className="project-desc">{proj.desc}</div>
              </div>
              <div className="project-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>
      <section id="contact">
        <div className="section-header">
          <span className="section-num">04</span>
          <h2 className="section-title">Contact</h2>
          <div className="section-line" />
        </div>
        <div className="contact-inner">
          <div className="contact-big">
            Let&apos;s Work<br /><span>Together.</span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.8 }}>
            Whether it&apos;s a job opportunity, freelance project, or just a chat about tech — feel free to reach out.
          </p>
          <div className="contact-links">
            <a href="mailto:athacore75@gmail.com" className="contact-link">
              <span className="contact-link-label">Email</span>
              athacore75@gmail.com
            </a>
            <a href="https://github.com/Dazeee0" target="_blank" rel="noreferrer" className="contact-link">
              <span className="contact-link-label">GitHub</span>
              github.com/Dazeee0
            </a>
            <a href="https://www.linkedin.com/in/achmad-atha-431663368/" target="_blank" rel="noreferrer" className="contact-link">
              <span className="contact-link-label">LinkedIn</span>
              linkedin.com/in/achmad-atha-431663368/
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="contact-link">
              <span className="contact-link-label">Discord</span>
              xeotrlaze</a>
            </a>
          </div>
        </div>
      </section>
      <footer>
        <span>© 2025 Achmad Atha</span>
        <span>Built with Next.js · Deployed on Vercel</span>
      </footer>
    </>
  );
}