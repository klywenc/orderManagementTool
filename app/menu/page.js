'use client';
import MenuItem from '@/components/menuItem/MenuItem';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        setError(error);
        console.error("Błąd podczas pobierania danych menu:", error);
      }
    };

    fetchMenu();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Błąd: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12"> {/* Background color for the page */}
      <div className="container mx-auto px-6"> {/* Container for centering content and padding */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10"> {/* Card-like container for heading */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-semibold text-gray-800 mb-3"> {/* Heading style */}
              Nasze <span className="text-orange-600">Menu</span> {/* Orange accent for "Menu" */}
            </h1>
            <p className="text-gray-600 text-lg">Odkryj nasze pyszne propozycje</p> {/* Subtitle style */}
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
            >
              <MenuItem item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MenuPage;