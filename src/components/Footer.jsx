import { Link } from 'react-router-dom'
import { Atom, Facebook, Linkedin, Youtube, Mail, MapPin } from 'lucide-react'
import { clubInfo, navLinks } from '../data/dummyData.js'

export default function Footer() {
  return (
    <footer className="border-t border-containment-600 bg-containment-950 hex-bg bg-repeat">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Atom className="h-7 w-7 text-cherenkov-400" strokeWidth={1.5} />
            <span className="font-display text-lg font-bold text-alloy-100">{clubInfo.name}</span>
          </div>
          <p className="text-sm text-alloy-400 max-w-sm leading-relaxed">{clubInfo.mission}</p>
          <div className="flex gap-3 mt-5">
            <a href={clubInfo.social.facebook} className="p-2 border border-containment-600 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 transition-colors" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href={clubInfo.social.linkedin} className="p-2 border border-containment-600 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 transition-colors" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={clubInfo.social.youtube} className="p-2 border border-containment-600 rounded-sm hover:border-cherenkov-400 hover:text-cherenkov-300 transition-colors" aria-label="YouTube">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="data-label mb-4">Navigate</h4>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-sm text-alloy-400 hover:text-cherenkov-300 transition-colors">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="data-label mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-alloy-400">
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 text-cherenkov-400 shrink-0" />
              {clubInfo.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 text-cherenkov-400 shrink-0" />
              {clubInfo.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="divider-dashed">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-alloy-500 font-mono">
          <span>© {new Date().getFullYear()} {clubInfo.name} · {clubInfo.institution}</span>
          <span>Built for the department, by the department.</span>
        </div>
      </div>
    </footer>
  )
}
