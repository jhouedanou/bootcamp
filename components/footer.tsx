import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-navy text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                BIG FIVE
              </span>
            </Link>
            <p className="font-sans text-sm text-blue-soft leading-relaxed mb-4">
              Agence de stratégie digitale et de formation. Nous accompagnons les professionnels dans leur transformation digitale.
            </p>
            <p className="font-serif text-lg text-gold font-medium italic">
              &quot;Laissez votre empreinte&quot;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/bootcamps" className="font-sans text-sm text-blue-soft hover:text-gold transition-colors">
                  Nos Bootcamps
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="font-sans text-sm text-blue-soft hover:text-gold transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-sans text-sm text-blue-soft hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="font-sans text-sm text-blue-soft hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-blue-soft">
                  Abidjan, Côte d&apos;Ivoire
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+22500000000" className="font-sans text-sm text-blue-soft hover:text-gold transition-colors">
                  +225 00 00 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:contact@bigfive.ci" className="font-sans text-sm text-blue-soft hover:text-gold transition-colors">
                  contact@bigfive.ci
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Suivez-nous</h4>
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-slate flex items-center justify-center hover:bg-violet transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-slate flex items-center justify-center hover:bg-violet transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-slate flex items-center justify-center hover:bg-violet transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-slate flex items-center justify-center hover:bg-violet transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-slate">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-sm text-blue-soft">
              © {new Date().getFullYear()} Big Five. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/mentions-legales" className="font-sans text-sm text-blue-soft hover:text-gold transition-colors">
                Mentions légales
              </Link>
              <Link href="/cgv" className="font-sans text-sm text-blue-soft hover:text-gold transition-colors">
                CGV
              </Link>
              <Link href="/confidentialite" className="font-sans text-sm text-blue-soft hover:text-gold transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
