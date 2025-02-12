'use client'

import { motion } from 'framer-motion';

const MenuSection = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-semibold text-gray-800 mb-3">
                    Nasze <span className="text-orange-600">Menu</span>
                </h1>
                <p className="text-gray-600 text-lg">Odkryj nasze pyszne propozycje</p>
            </motion.div>
        </div>
    );
};

export default MenuSection;
