import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  subItems?: { label: string; path: string; }[];
}

const menuItems: MenuItem[] = [
  { label: 'Services', path: '/services' },
  { label: 'Why Choose Us', path: '/why-choose-us' },
  { label: 'Insurance Claims', path: '/insurance-claims' },
  { label: 'Financing', path: '/financing' },
  {
    label: 'Resources',
    path: '/resources',
    subItems: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Product', path: '/product' },
      { label: 'Careers', path: '/careers' },
      { label: 'Apply Now', path: '/application' },
      { label: 'Admin Portal', path: '/admin' },
    ],
  },
  { label: 'Contact', path: '/contact' },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.2,
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };

  const submenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-4 z-50 p-2 rounded-lg bg-roofing-orange hover:bg-roofing-orange/90 transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-40 pt-20"
          >
            <nav className="container mx-auto px-4 py-4">
              <motion.div className="space-y-2">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    className="overflow-hidden"
                  >
                    {item.subItems ? (
                      <div className="rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg text-gray-800"
                        >
                          <span className="font-medium">{item.label}</span>
                          <motion.div
                            animate={{ rotate: openSubmenu === item.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </button>
                        <AnimatePresence initial={false}>
                          {openSubmenu === item.label && (
                            <motion.div
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={submenuVariants}
                              className="overflow-hidden"
                            >
                              <div className="bg-gray-50 rounded-b-lg">
                                {item.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block p-4 pl-8 hover:bg-gray-100 transition-colors text-gray-700"
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block p-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg text-gray-800 font-medium"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
