import { useEffect, useState } from 'react';

const useMenuData = () => {
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

    return { menuItems, error };
};

export default useMenuData;
