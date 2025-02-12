'use client'

import { motion } from 'framer-motion';
import MenuItem from '@/components/menu/menuItem';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            when: 'beforeChildren'
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const MenuGrid = ({ menuItems }) => {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {menuItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                    <MenuItem item={item} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default MenuGrid;
