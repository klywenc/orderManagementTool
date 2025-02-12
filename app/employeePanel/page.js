'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeePanelPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders?type=all', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
        toast.error(`Błąd: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.role === 'employee' || session?.user?.role === 'admin') {
      fetchOrders();
    } else {
      router.push('/');
    }
  }, [session, router]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }

      const updatedOrder = await response.json();

      setOrders((prevOrders) =>
          prevOrders
              .map((order) =>
                  order.id === orderId ? { ...order, status: newStatus } : order
              )
              .filter((order) => order.status !== 'completed' && order.status !== 'cancelled')
      );

      const successMessage = `Status zamówienia #${orderId} zmieniony na ${newStatus}`;
      toast.success(successMessage);

    } catch (error) {
      const errorMessage = `Błąd: ${error.message}`;
      toast.error(errorMessage);
    }
  };

  const pendingOrders = orders.filter((order) => order.status === 'pending');
  const preparingOrders = orders.filter((order) => order.status === 'preparing');

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-screen text-red-500">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Wystąpił błąd</h2>
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen p-8 font-sans">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Panel <span className="text-orange-600">Pracownika</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nowe zamówienia */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="px-5 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">
                  <span className="text-orange-600">Nowe</span> zamówienia
                </h2>
              </div>
              <div className="p-5">
                {pendingOrders.length > 0 ? (
                    pendingOrders.map((order) => (
                        <div
                            key={order.id}
                            className="mb-4 p-4 rounded-md border border-gray-200 bg-gray-50"
                        >
                          <h3 className="text-md font-medium text-gray-800 mb-1">Zamówienie <span className="font-semibold text-gray-600">#{order.id}</span></h3>
                          <p className="text-sm text-gray-500 mb-2">Kwota: <span className="text-gray-700">{order.total} zł</span></p>

                          <div className="mt-2">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Zamówione produkty:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {order.items && order.items.map((item, index) => (
                                  <li key={index}>{item.name} - Ilość: {item.quantity}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex justify-start space-x-2 mt-4">
                            <button
                                onClick={() => handleStatusChange(order.id, 'preparing')}
                                className="px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors duration-200 border border-blue-200 cursor-pointer"
                            >
                              Przygotuj
                            </button>
                            <button
                                onClick={() => handleStatusChange(order.id, 'cancelled')}
                                className="px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200 border border-red-200 cursor-pointer"
                            >
                              Anuluj
                            </button>
                          </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 italic text-sm">Brak nowych zamówień.</p>
                )}
              </div>
            </div>

            {/* Zamówienia w przygotowaniu */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="px-5 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">
                  W <span className="text-orange-600">przygotowaniu</span>
                </h2>
              </div>
              <div className="p-5">
                {preparingOrders.length > 0 ? (
                    preparingOrders.map((order) => (
                        <div
                            key={order.id}
                            className="mb-4 p-4 rounded-md border border-gray-200 bg-gray-50"
                        >
                          <h3 className="text-md font-medium text-gray-800 mb-1">Zamówienie <span className="font-semibold text-gray-600">#{order.id}</span></h3>
                          <p className="text-sm text-gray-500 mb-2">Kwota: <span className="text-gray-700">{order.total} zł</span></p>

                          <div className="mt-2">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Zamówione produkty:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {order.items && order.items.map((item, index) => (
                                  <li key={index}>{item.name} - Ilość: {item.quantity}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex justify-start space-x-2 mt-4">
                            <button
                                onClick={() => handleStatusChange(order.id, 'completed')}
                                className="px-3 py-2 text-sm font-semibold text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors duration-200 border border-green-200 cursor-pointer"
                            >
                              Zakończ
                            </button>
                            <button
                                onClick={() => handleStatusChange(order.id, 'cancelled')}
                                className="px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200 border border-red-200 cursor-pointer"
                            >
                              Anuluj
                            </button>
                          </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 italic text-sm">Brak zamówień w przygotowaniu.</p>
                )}
              </div>
            </div>
          </div>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </div>
  );
};

export default EmployeePanelPage;