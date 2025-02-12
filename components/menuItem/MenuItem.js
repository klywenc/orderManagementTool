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
      autoClose: 2000, 
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'bg-white shadow-lg rounded-md border border-gray-200 text-gray-800', 
      bodyClassName: 'py-2 px-3',
      progressClassName: 'bg-orange-500',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-orange-600 mb-2">{item.name}</h2>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <p className="text-lg font-semibold text-gray-800">Cena: {item.price.toFixed(2)} zł</p>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <label htmlFor={`quantity-${item.id}`} className="mr-2 text-sm text-gray-700">Ilość:</label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default MenuItem;