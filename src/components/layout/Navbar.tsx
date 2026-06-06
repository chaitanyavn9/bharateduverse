"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Compare", href: "/compare" },
  { label: "Exams", href: "/exams" },
  { label: "Research", href: "/research" },
  { label: "Government", href: "/government" },
  { label: "Colleges", href: "/colleges" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        backgroundColor: "rgba(11, 16, 32, 0.95)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Image
              src="/logo.png"
              alt="BharatEduVerse"
              width={72}
              height={72}
              style={{ borderRadius: 8, objectFit: "contain" }}
              priority
            />
            <div>
              <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 18 }}>
                <span style={{ color: "#FF8C00" }}>Bharat</span>
                <span style={{ color: "#f1f5f9" }}>Edu</span>
                <span style={{ color: "#1E8E3E" }}>Verse</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF8C00")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/discover" className="btn-primary" style={{ marginLeft: 8, textDecoration: "none", fontSize: 14, padding: "8px 18px" }}>
              Find My Path
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", display: "none" }}
            className="show-mobile"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingBottom: 16,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 4px",
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontSize: 15,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/discover"
              onClick={() => setOpen(false)}
              className="btn-primary"
              style={{ marginTop: 12, textDecoration: "none", justifyContent: "center" }}
            >
              Find My Path
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
