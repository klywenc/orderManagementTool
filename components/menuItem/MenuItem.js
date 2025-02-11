'use client'
import { useState } from 'react';
import { useCart } from '@/app/contexts/CartContext';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const MenuItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItemToCart(item, quantity);
    setQuantity(1);

    toast.success(`Dodano ${item.name} x ${quantity} do koszyka!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105"> {/* Dodano klasy Tailwind */}
      <h2 className="text-2xl font-bold text-orange-600 mb-2">{item.name}</h2>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <p className="text-lg font-semibold text-gray-800 mb-4">Cena: {item.price.toFixed(2)} zł</p>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <label htmlFor={`quantity-${item.id}`} className="mr-2">Ilość:</label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default MenuItem;