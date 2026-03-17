import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { companyInfo } from '../data/mockData';
import logo from "../images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Services', path: '/services' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/contact' }
    ],
    // Services: [
    //   { name: 'Web Development', path: '/services' },
    //   { name: 'Mobile Apps', path: '/services' },
    //   { name: 'Cloud Solutions', path: '/services' },
    //   { name: 'Digital Marketing', path: '/services' }
    // ],
    Support: [
      { name: 'Pricing', path: '/pricing' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Service', path: '/terms-of-service' }
    ]
  };

  const socialIcons = [
    { icon: Facebook, href: companyInfo.social.facebook, label: 'Facebook' },
    { icon: Twitter, href: companyInfo.social.twitter, label: 'Twitter' },
    { icon: Linkedin, href: companyInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: companyInfo.social.instagram, label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-40 h-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl mb-10">
                  <img src={logo} alt="" />
                </span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-blue-400">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400" />
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 mt-1" />
                <span className="text-gray-300">{companyInfo.address}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} {companyInfo.name}. All rights reserve
          </p>
          {/* <div className="flex space-x-6 text-sm">
            <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Cookie Policy
            </Link>
          </div> */}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
