'use client';
import MenuItem from '@/components/menuItem/MenuItem';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Błąd: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Nasze Menu
          </h1>
          <p className="text-gray-500">Odkryj nasze pyszne propozycje</p>
        </motion.div>
    <div className="min-h-screen py-12"> 
      <div className="container mx-auto px-6"> 
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10"> 
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