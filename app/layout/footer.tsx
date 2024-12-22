import { FaCcAmex, FaCcDiscover, FaPaypal } from 'react-icons/fa';
import { TbBrandMastercard, TbBrandVisa } from 'react-icons/tb';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { footerMenu } from '../navigation/menu';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 py-12 mt-12">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Store Location */}
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold font-playfair">
              Store Location
            </h3>
            <div className="flex flex-col gap-y-2 pt-4">
              <h4 className="font-noto text-sm md:text-base">
                Mohammdpur, Townhall Market
              </h4>
              <a
                href="mailto:info@mysite.com"
                className="text-blue-600 pt-3 font-noto text-base"
              >
                info@mysite.com
              </a>
              <a
                href="tel:+11234567890"
                className="text-blue-600 font-noto text-base"
              >
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

          {Object.entries(footerMenu).map(([section, links]) => (
            <div key={section} className="space-y-4">
              <h3 className="text-2xl font-semibold font-playfair">
                {section}
              </h3>
              <ul className="space-y-2 pt-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 font-noto text-sm md:text-base"
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
            <div className="text-sm font-medium font-noto text-gray-600">
              <span>We accept the following paying methods:</span>
              <div className="flex space-x-8 mt-3">
                <TbBrandVisa className="h-4 w-4 text-gray-800" />
                <TbBrandMastercard className="h-4 w-4 text-gray-800" />
                <FaCcAmex className="h-4 w-4 text-gray-800" />
                <FaCcDiscover className="h-4 w-4 text-gray-800" />
                <FaPaypal className="h-4 w-4 text-gray-800" />
              </div>
            </div>
            <div className="text-sm text-gray-600 font-medium font-noto">
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
