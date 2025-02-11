'use client';
import { useCart } from '@/app/contexts/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

const CartPage = () => {
  const { cartItems, removeItemFromCart, updateItemQuantity, clearCart } = useCart();
  const router = useRouter(); // Initialize useRouter

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      if (newQuantity === 0) {
        removeItemFromCart(itemId);
      } else {
        updateItemQuantity(itemId, newQuantity);
      }
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Twój Koszyk</h1>

        {cartItems.length === 0 ? (
            <p>Twój koszyk jest pusty.</p>
        ) : (
            <div>
              {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-orange-600">{item.name}</h2>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-lg font-semibold">Cena: {item.price.toFixed(2)} zł</p>
                      <div className="flex items-center mt-2">
                        <label htmlFor={`quantity-${item.id}`} className="mr-2">Ilość:</label>
                        <input
                            type="number"
                            id={`quantity-${item.id}`}
                            min="0"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e)}
                            className="w-16 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                      </div>
                    </div>
                    <button
                        onClick={() => removeItemFromCart(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                      Usuń
                    </button>
                  </div>
              ))}

              <div className="mt-6">
                <p className="text-xl font-bold">Suma: {totalPrice.toFixed(2)} zł</p>
                <button
                    onClick={clearCart}
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mr-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  Wyczyść koszyk
                </button>
                <button
                    onClick={() => {
                      router.push('/checkout');
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Przejdź do kasy
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default CartPage;