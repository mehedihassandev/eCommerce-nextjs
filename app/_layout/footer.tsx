import { Button } from '@/components/ui/button';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';
import { TbBrandVisa, TbBrandMastercard } from 'react-icons/tb';
import { FaCcAmex, FaPaypal, FaCcDiscover } from 'react-icons/fa';

const footerSections = {
  Shop: [
    { title: 'Shop All', href: '#' },
    { title: 'Computers', href: '#' },
    { title: 'Tablets', href: '#' },
    { title: 'Drones & Cameras', href: '#' },
    { title: 'Audio', href: '#' },
    { title: 'Mobile', href: '#' },
    { title: 'T.V & Home Cinema', href: '#' },
    { title: 'Wearable Tech', href: '#' },
    { title: 'Sale', href: '#' },
  ],
  'Customer Support': [
    { title: 'Contact Us', href: '#' },
    { title: 'Help Center', href: '#' },
    { title: 'About Us', href: '#' },
    { title: 'Careers', href: '#' },
  ],
  Policy: [
    { title: 'Shipping & Returns', href: '#' },
    { title: 'Terms & Conditions', href: '#' },
    { title: 'Payment Methods', href: '#' },
    { title: 'FAQ', href: '#' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 py-12">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Store Location */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Store Location</h3>
            <div className="flex flex-col gap-y-2 pt-4">
              <h4>Mohammdpur</h4>
              <h5>Townhall Market</h5>
              <a href="mailto:info@mysite.com" className="text-blue-600">
                info@mysite.com
              </a>
              <a href="tel:+11234567890" className="text-blue-600">
                123-456-7890
              </a>
            </div>
            <div className="flex space-x-4 pt-6">
              <Button variant="link" size="icon" aria-label="Facebook">
                <FacebookIcon className="h-6 w-6 text-gray-800" />
              </Button>
              <Button variant="link" size="icon" aria-label="Instagram">
                <InstagramIcon className="h-6 w-6 text-gray-800" />
              </Button>
              <Button variant="link" size="icon" aria-label="Twitter">
                <TwitterIcon className="h-6 w-6 text-gray-800" />
              </Button>
              <Button variant="link" size="icon" aria-label="YouTube">
                <YoutubeIcon className="h-6 w-6 text-gray-800" />
              </Button>
            </div>
          </div>

          {Object.entries(footerSections).map(([section, links]) => (
            <div key={section} className="space-y-4">
              <h3 className="text-lg font-semibold">{section}</h3>
              <ul className="space-y-2 pt-4">
                {links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span>We accept the following paying methods:</span>
              <div className="flex space-x-8 mt-3">
                <TbBrandVisa className="h-6 w-6 text-gray-800" />
                <TbBrandMastercard className="h-6 w-6 text-gray-800" />
                <FaCcAmex className="h-6 w-6 text-gray-800" />
                <FaCcDiscover className="h-6 w-6 text-gray-800" />
                <FaPaypal className="h-6 w-6 text-gray-800" />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <span>
                © 2024 by Team. Powered and secured by{' '}
                <a href="https://nextjs.org/" className="text-blue-600">
                  Next.js
                </a>
                .
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
