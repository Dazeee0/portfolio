"use client";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export default function WLANProject() {
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
        <title>WLAN Installation — Achmad Atha</title>
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
        .nav-back {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-back:hover { color: var(--accent); }

        .page-header {
          padding: 160px 48px 80px;
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        .page-header-bg {
          position: absolute;
          top: 50%; left: -20px;
          transform: translateY(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(120px, 20vw, 280px);
          color: transparent;
          -webkit-text-stroke: 1px #161616;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .breadcrumb {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: fadeUp 0.6s 0.1s forwards;
        }
        .breadcrumb a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: var(--accent); }
        .breadcrumb span { color: var(--border); }
        .page-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 8vw, 100px);
          line-height: 0.9;
          letter-spacing: 2px;
          margin-bottom: 24px;
          opacity: 0;
          animation: fadeUp 0.6s 0.2s forwards;
        }
        .page-title span { color: var(--accent); }
        .page-meta {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.6s 0.3s forwards;
        }
        .meta-item { display: flex; flex-direction: column; gap: 4px; }
        .meta-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
        .meta-value { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--text); letter-spacing: 1px; }

        .content { max-width: 900px; margin: 0 auto; padding: 80px 48px 120px; }

        .tags-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 64px; opacity: 0; animation: fadeUp 0.6s 0.4s forwards; }
        .tag { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border: 1px solid var(--border); color: var(--muted); }
        .tag.accent { border-color: var(--accent); color: var(--accent); }

        .block { margin-bottom: 64px; opacity: 0; animation: fadeUp 0.6s forwards; }
        .block:nth-child(1) { animation-delay: 0.5s; }
        .block:nth-child(2) { animation-delay: 0.6s; }
        .block:nth-child(3) { animation-delay: 0.7s; }
        .block:nth-child(4) { animation-delay: 0.8s; }
        .block:nth-child(5) { animation-delay: 0.9s; }

        .block-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
        .block-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(28px, 4vw, 42px); letter-spacing: 1px; margin-bottom: 20px; }
        .block-text { font-size: 15px; color: var(--muted); line-height: 1.95; }
        .block-text p + p { margin-top: 16px; }
        .block-text strong { color: var(--text); font-weight: 500; }

        .divider { height: 1px; background: var(--border); margin: 64px 0; }

        .steps { display: flex; flex-direction: column; gap: 2px; margin-top: 24px; }
        .step {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 24px;
          padding: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          align-items: start;
          transition: border-color 0.2s;
        }
        .step:hover { border-color: var(--accent); }
        .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--accent); line-height: 1; opacity: 0.5; }
        .step-title { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
        .step-desc { font-size: 13px; color: var(--muted); line-height: 1.75; }

        .spec-table { width: 100%; border-collapse: collapse; margin-top: 24px; font-family: 'DM Mono', monospace; font-size: 12px; }
        .spec-table tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
        .spec-table tr:hover { background: var(--surface); }
        .spec-table td { padding: 14px 16px; vertical-align: top; }
        .spec-table td:first-child { color: var(--muted); letter-spacing: 1px; text-transform: uppercase; font-size: 10px; width: 180px; padding-top: 16px; }
        .spec-table td:last-child { color: var(--text); }

        .callout { border-left: 2px solid var(--accent); padding: 20px 24px; background: var(--surface); margin-top: 24px; }
        .callout p { font-size: 14px; color: var(--muted); line-height: 1.8; }
        .callout strong { color: var(--text); }

        .img-placeholder {
          width: 100%; aspect-ratio: 16 / 7;
          background: var(--surface);
          border: 1px solid var(--border);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; margin-top: 24px; position: relative;
        }
        .img-placeholder::before { content: ''; position: absolute; top: 0; left: 0; width: 20px; height: 20px; border-top: 2px solid var(--accent); border-left: 2px solid var(--accent); }
        .img-placeholder::after { content: ''; position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; border-bottom: 2px solid var(--accent); border-right: 2px solid var(--accent); }
        .img-placeholder span { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); opacity: 0.4; }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          border: 1px solid var(--border);
          padding: 14px 28px;
          margin-top: 32px;
          transition: border-color 0.2s, color 0.2s;
        }
        .back-btn:hover { border-color: var(--accent); color: var(--accent); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          body { cursor: auto; }
          .cursor, .cursor-ring { display: none; }
          nav { padding: 20px 24px; }
          .page-header { padding: 120px 24px 56px; }
          .content { padding: 56px 24px 80px; }
          .page-meta { gap: 20px; }
          .step { grid-template-columns: 36px 1fr; gap: 16px; }
          .spec-table td:first-child { width: 120px; }
        }
      `}</style>

      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <nav id="navbar">
        <Link href="/" className="nav-logo">Achmad Atha</Link>
        <Link href="/#projects" className="nav-back">← Back to Projects</Link>
      </nav>

      <div className="page-header">
        <div className="page-header-bg">WLAN</div>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#projects">Projects</Link>
          <span>/</span>
          <span style={{ color: "var(--text)" }}>WLAN Installation</span>
        </div>
        <h1 className="page-title">
          WLAN<br /><span>Installation</span>
        </h1>
        <div className="page-meta">
          <div className="meta-item"><span className="meta-label">Type</span><span className="meta-value">Internship Project</span></div>
          <div className="meta-item"><span className="meta-label">Role</span><span className="meta-value">Network Technician</span></div>
          <div className="meta-item"><span className="meta-label">Hardware</span><span className="meta-value">MikroTik</span></div>
          <div className="meta-item"><span className="meta-label">Status</span><span className="meta-value" style={{ color: "var(--accent)" }}>Completed</span></div>
        </div>
      </div>

      <div className="content">
        <div className="tags-row">
          <span className="tag accent">MikroTik</span>
          <span className="tag">WLAN</span>
          <span className="tag">Wireless</span>
          <span className="tag">Network Setup</span>
          <span className="tag">Hardware Installation</span>
          <span className="tag">Internship</span>
        </div>

        <div className="block">
          <div className="block-label">— 01 / Overview</div>
          <h2 className="block-title">What Was the Goal</h2>
          <div className="block-text">
            <p>During my internship, I was tasked with planning and deploying a <strong>wireless local area network (WLAN)</strong> for the office. The goal was to provide stable wireless connectivity across the workspace using MikroTik hardware, configured from scratch by me.</p>
            <p>This was a hands-on project that covered everything from physical installation of the access point to full software configuration — including IP addressing, DHCP, and wireless security settings.</p>
          </div>
          <div className="img-placeholder">
            {/* Replace with: <img src="/wlan-setup.jpg" alt="WLAN Setup" style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
            <span>Add a photo of the setup here</span>
          </div>
        </div>

        <div className="divider" />

        <div className="block">
          <div className="block-label">— 02 / Hardware</div>
          <h2 className="block-title">Equipment Used</h2>
          <div className="block-text">
            <p>The network was built entirely on MikroTik hardware, chosen for its flexibility and the level of manual control it gives over network configuration.</p>
          </div>
          <table className="spec-table">
            <tbody>
              <tr><td>Router</td><td>MikroTik RouterBOARD — used as the main gateway and DHCP server</td></tr>
              <tr><td>Access Point</td><td>MikroTik wireless access point — mounted on ceiling/wall for coverage</td></tr>
              <tr><td>Cabling</td><td>Cat5e UTP — run from router to AP for wired backhaul</td></tr>
              <tr><td>Config Tool</td><td>WinBox — MikroTik&apos;s GUI configuration software</td></tr>
              <tr><td>Protocol</td><td>802.11n (Wi-Fi 4) — adequate for the office environment</td></tr>
            </tbody>
          </table>
        </div>

        <div className="divider" />

        <div className="block">
          <div className="block-label">— 03 / Process</div>
          <h2 className="block-title">Installation Steps</h2>
          <div className="steps">
            {[
              { title: "Site Survey", desc: "Walked the office to identify coverage dead zones, assess wall materials, and decide on the best mounting position for the access point to maximize signal range." },
              { title: "Physical Installation", desc: "Mounted the MikroTik access point at the optimal location. Ran Cat5e cable from the router to the AP, securing it along the wall using cable clips. Connected everything with proper RJ45 crimped ends." },
              { title: "Router Configuration via WinBox", desc: "Connected to the MikroTik router using WinBox. Set up the WAN interface, created a LAN bridge, and assigned a static IP address to the router on the local network." },
              { title: "DHCP Server Setup", desc: "Configured the DHCP server on the router to automatically assign IP addresses to devices connecting to the network. Defined the IP pool range, gateway, and DNS servers." },
              { title: "Wireless Profile Configuration", desc: "Created a wireless security profile using WPA2 encryption. Set the SSID, channel, and band. Assigned the security profile to the wireless interface to prevent unauthorized access." },
              { title: "Testing & Verification", desc: "Connected multiple devices to verify DHCP assignment was working, tested internet connectivity, and walked the office to confirm there were no significant dead zones in the coverage area." },
            ].map((step, i) => (
              <div className="step" key={i}>
                <div className="step-num">0{i + 1}</div>
                <div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="block">
          <div className="block-label">— 04 / Challenges</div>
          <h2 className="block-title">What I Had to Figure Out</h2>
          <div className="block-text">
            <p>The biggest challenge was <strong>signal interference</strong> — the office had thick concrete walls that significantly reduced wireless range. I resolved this by repositioning the access point to a more central location and adjusting the transmit power settings in WinBox.</p>
            <p>I also ran into an issue where some devices weren&apos;t receiving IP addresses correctly. This turned out to be a DHCP pool conflict from a previously configured address range. I cleared the old lease table and reconfigured the pool from scratch.</p>
          </div>
          <div className="callout">
            <p><strong>Key takeaway:</strong> Physical placement of the access point matters just as much as the software configuration. A well-placed AP with default settings will outperform a misconfigured AP with perfect settings.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="block">
          <div className="block-label">— 05 / Outcome</div>
          <h2 className="block-title">Result</h2>
          <div className="block-text">
            <p>The WLAN was successfully deployed and handed over to the office staff. All workstations and mobile devices were able to connect without issue. The network has been running stably since installation with no reported connectivity problems.</p>
            <p>This project gave me real hands-on experience with <strong>MikroTik configuration</strong>, physical network installation, and end-to-end wireless network deployment — skills I wouldn&apos;t have gotten from classroom work alone.</p>
          </div>
        </div>

        <Link href="/#projects" className="back-btn">← Back to All Projects</Link>
      </div>
    </>
  );
}