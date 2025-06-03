import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-accent">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
              <li><Link to="/guides" className="hover:text-accent">Guides</Link></li>
              <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com/company/propvia" className="hover:text-accent">LinkedIn</a></li>
              <li><a href="https://instagram.com/propviaai" className="hover:text-accent">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-600 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm">
            <p>© {new Date().getFullYear()} Propvia. All rights reserved.</p>
            <p>440 Burroughs Street #114, Detroit MI 48202</p>
          </div>
          <Link to="/admin" className="text-sm hover:text-accent">Admin</Link>
        </div>
      </div>
    </footer>
  );
}