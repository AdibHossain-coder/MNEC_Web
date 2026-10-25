import { Link } from 'react-router-dom'
import { Atom, Facebook, Linkedin, Youtube, Mail, MapPin, ArrowUp, ShieldCheck } from 'lucide-react'
import { clubInfo, navLinks } from '../data/dummyData.js'

export default function Footer() {
  return (
    <footer className="relative bg-repeat border-t border-containment-600 bg-containment-950 hex-bg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-containment-900/50 via-transparent to-containment-950/90" />

      <div className="relative grid grid-cols-1 gap-10 container-page py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-9 h-9 rounded-sm border border-cherenkov-400/40 bg-containment-800 shadow-glow">
              <Atom className="h-6 w-6 text-cherenkov-400" strokeWidth={1.5} />
            </span>
            <div>
              <span className="block text-lg font-bold font-display text-alloy-100">{clubInfo.name}</span>
              <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-cherenkov-400">
                {clubInfo.institution}
              </span>
            </div>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-alloy-300 border-l-2 border-cherenkov-400/50 pl-4 py-1">
            {clubInfo.charter}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a
              href={clubInfo.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-containment-600 bg-containment-900/80 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 hover:shadow-glow hover:-translate-y-1 transition-all"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href={clubInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-containment-600 bg-containment-900/80 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 hover:shadow-glow hover:-translate-y-1 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={clubInfo.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-containment-600 bg-containment-900/80 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 hover:shadow-glow hover:-translate-y-1 transition-all"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 ml-1 font-mono text-[10px] uppercase tracking-wider rounded-sm border border-safety/30 bg-safety/10 text-safety">
              <ShieldCheck size={13} /> Safe Nuclear Energy Advocacy
            </span>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 data-label text-cherenkov-400">Navigation Matrix</h4>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="inline-flex items-center gap-1.5 text-sm transition-all text-alloy-400 hover:text-cherenkov-300 hover:translate-x-1"
                >
                  <span className="w-1 h-1 rounded-full bg-cherenkov-400/60" />
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 data-label text-uranium-400">Command &amp; Contact</h4>
          <ul className="space-y-3.5 text-sm text-alloy-400">
            <li className="flex items-start gap-2.5">
              <Mail size={15} className="mt-0.5 text-cherenkov-400 shrink-0" />
              <a href={`mailto:${clubInfo.email}`} className="transition-colors hover:text-cherenkov-300">
                {clubInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 text-uranium-400 shrink-0" />
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(clubInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-uranium-300"
              >
                {clubInfo.address}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative divider-dashed">
        <div className="flex flex-col items-center justify-between gap-3 py-5 font-mono text-xs container-page sm:flex-row text-alloy-500">
          <span>
            © {new Date().getFullYear()} {clubInfo.name} ({clubInfo.shortName}) · {clubInfo.institution}
          </span>
          <div className="flex items-center gap-4">
            <span>Safe Nuclear Energy · Scholar &amp; Industry Career Seminars</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 p-2 border border-containment-600 bg-containment-900 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 hover:shadow-glow transition-all"
              aria-label="Back to top"
            >
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
