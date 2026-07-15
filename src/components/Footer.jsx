import { Link } from 'react-router-dom'
import { Atom, Facebook, Linkedin, Youtube, Mail, MapPin, ArrowUp } from 'lucide-react'
import { clubInfo, navLinks } from '../data/dummyData.js'

export default function Footer() {
  return (
    <footer className="bg-repeat border-t border-containment-600 bg-containment-950 hex-bg">
      <div className="grid grid-cols-1 gap-10 container-page py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Atom className="h-7 w-7 text-cherenkov-400" strokeWidth={1.5} />
            <span className="text-lg font-bold font-display text-alloy-100">{clubInfo.name}</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-alloy-400">{clubInfo.mission}</p>
          <div className="flex gap-3 mt-5">
            <a href={clubInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 border border-containment-600 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 hover:-translate-y-0.5 transition-all" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href={clubInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border border-containment-600 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 hover:-translate-y-0.5 transition-all" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={clubInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="p-2 border border-containment-600 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 hover:-translate-y-0.5 transition-all" aria-label="YouTube">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 data-label">Navigate</h4>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-sm transition-colors text-alloy-400 hover:text-cherenkov-300">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 data-label">Contact</h4>
          <ul className="space-y-3 text-sm text-alloy-400">
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 text-cherenkov-400 shrink-0" />
              <a href={`mailto:${clubInfo.email}`} className="transition-colors hover:text-cherenkov-300">{clubInfo.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 text-cherenkov-400 shrink-0" />
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(clubInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cherenkov-300"
              >
                {clubInfo.address}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="divider-dashed">
        <div className="flex flex-col items-center justify-between gap-3 py-5 font-mono text-xs container-page sm:flex-row text-alloy-500">
          <span>© {new Date().getFullYear()} {clubInfo.name} · {clubInfo.institution}</span>
          <div className="flex items-center gap-4">
            <span>Built for the department, by the department.</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 p-1.5 border border-containment-600 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}