'use client';

import { useCart } from '@/app/contexts/CartContext';
import { useRouter } from 'next/navigation';
import CartTable from "@/components/cart/cartTable";

const CartPage = () => {
    const { cartItems, removeItemFromCart, updateItemQuantity, clearCart } = useCart();
    const router = useRouter();

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
        <main className="container mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Twój <span className="text-orange-600">Koszyk</span>
                    </h1>
                </div>

                <CartTable
                    cartItems={cartItems}
                    handleQuantityChange={handleQuantityChange}
                    removeItemFromCart={removeItemFromCart}
                />

                {cartItems.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                        <div>
                            <p className="text-xl font-semibold text-gray-800">
                                Suma: <span className="text-orange-600">{totalPrice.toFixed(2)} zł</span>
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={clearCart}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200 cursor-pointer"
                            >
                                Wyczyść koszyk
                            </button>
                            <button
                                onClick={() => router.push('/checkout')}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors duration-200 cursor-pointer"
                            >
                                Przejdź do kasy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CartPage;