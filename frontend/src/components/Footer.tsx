import { Link } from 'react-router-dom';
import { Building2, Mail, MapPin, Linkedin, Instagram, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-brand via-brand-600 to-brand-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top Section with Logo and CTA */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-brand" />
              </div>
              <h2 className="text-2xl font-bold">Propvia</h2>
            </div>
            <p className="text-lg text-white/90 mb-4 max-w-xl mx-auto">
              Transforming Detroit through AI-powered property analysis and community development
            </p>
            <Link
              to="/platform"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-accent-light text-brand-900 font-bold rounded-xl hover:from-accent-light hover:to-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Analysis
              <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-4 text-accent">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-white/80 hover:text-accent transition-colors duration-300 flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/80 hover:text-accent transition-colors duration-300 flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-white/80 hover:text-accent transition-colors duration-300 flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Careers</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-4 text-accent">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-white/80 hover:text-accent transition-colors duration-300 flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Blog</span>
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-white/80 hover:text-accent transition-colors duration-300 flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Guides</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-white/80 hover:text-accent transition-colors duration-300 flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-4 text-accent">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-white/80 hover:text-accent transition-colors duration-300 flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-white/80 hover:text-accent transition-colors duration-300 flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Terms of Service</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-4 text-accent">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://linkedin.com/company/propvia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-accent transition-all duration-300 flex items-center group text-sm"
                  >
                    <Linkedin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com/propviaai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-accent transition-all duration-300 flex items-center group text-sm"
                  >
                    <Instagram className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Instagram</span>
                  </a>
                </li>
              </ul>
              
              {/* Contact Info */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-start space-x-2 text-xs text-white/70 mb-2">
                  <MapPin className="w-3 h-3 mt-0.5 text-accent" />
                  <span>440 Burroughs Street #114<br />Detroit MI 48202</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-white/70">
                  <Mail className="w-3 h-3 text-accent" />
                  <a href="mailto:hello@propvia.com" className="hover:text-accent transition-colors">
                    hello@propvia.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-brand-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <div className="text-xs text-white/70">
                <p>© {currentYear} Propvia. All rights reserved.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-xs text-white/50">
                  🏢 Empowering Communities • 🤖 AI-Driven Insights • 🚀 Detroit Strong
                </div>
                <Link 
                  to="/admin" 
                  className="text-xs text-white/60 hover:text-accent transition-colors duration-300 font-medium"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}