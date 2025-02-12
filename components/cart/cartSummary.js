import { useRouter } from 'next/router';

const CartSummary = ({ totalPrice, clearCart }) => {
    const router = useRouter();

    return (
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
    );
};

export default CartSummary;