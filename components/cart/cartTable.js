const CartTable = ({ cartItems, handleQuantityChange, removeItemFromCart }) => {
    return (
        <div className="p-6">
            {cartItems.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-600 text-lg">Twój koszyk jest pusty.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Produkt</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cena</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ilość</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Akcje</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            <div className="text-sm text-gray-500">{item.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.price.toFixed(2)} zł</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="number"
                                        id={`quantity-${item.id}`}
                                        min="0"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e)}
                                        className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => removeItemFromCart(item.id)}
                                        className="text-red-600 hover:text-red-900 cursor-pointer"
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CartTable;
