'use client'

import MenuGrid from "@/components/menu/menuGrid";
import useMenuData from "@/components/menu/useMenuData";
import MenuTitle from "@/components/menu/menuTitle";

const MenuPage = () => {
  const { menuItems, error } = useMenuData();

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-screen text-red-500">
          Błąd: {error.message}
        </div>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-6">
        <MenuTitle />
        <MenuGrid menuItems={menuItems} />
      </div>
    </main>
  );
};

export default MenuPage;