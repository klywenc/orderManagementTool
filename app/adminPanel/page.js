'use client';
import { useState, useEffect } from 'react';
import PrivateRoute from '@/components/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanelPage = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedRole, setEditedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (session?.user?.role !== 'admin') return;

        const response = await fetch('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Błąd podczas ładowania użytkowników');
        }

        setUsers(data);
      } catch (error) {
        setError(error);
        toast.error(error.message);
      }
    };

    fetchUsers();
  }, [session]);

  const handleDeleteUser = async (userId) => {
    if (confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Błąd podczas usuwania');
        }

        setUsers(prev => prev.filter(user => user.id !== userId));
        toast.success(data.message || 'Użytkownik został pomyślnie usunięty');
      } catch (error) {
        toast.error(error.message || 'Wystąpił błąd podczas usuwania użytkownika');
      }
    }
  };

  const handleEditRole = (userId, currentRole) => {
    setEditingUserId(userId);
    setEditedRole(currentRole);
  };
  
  const handleRoleChange = (e) => {
    setEditedRole(e.target.value);
  };
  
  const handleSaveRole = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ role: editedRole }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Błąd podczas aktualizacji roli');
      }

      setUsers(prev => 
        prev.map(user => user.id === userId ? { ...user, role: editedRole } : user)
      );
      setEditingUserId(null);
      
      toast.success(data.message || 'Pomyślnie zaktualizowano rolę użytkownika', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(error.message || 'Wystąpił błąd podczas zapisywania zmian', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <PrivateRoute requiredRole="admin">
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">
              Panel <span className="text-orange-600">Administratora</span>
            </h1>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rola</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data utworzenia</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Akcje</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {editingUserId === user.id ? (
                          <select
                            value={editedRole}
                            onChange={handleRoleChange}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md"
                          >
                            <option value="user">User</option>
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        {editingUserId === user.id ? (
                          <>
                            <button
                              onClick={() => handleSaveRole(user.id)}
                              className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                            >
                              Zapisz
                            </button>
                            <button
                              onClick={() => { setEditingUserId(null); setEditedRole(''); }}
                              className="inline-flex items-center px-3.5 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
                            >
                              Anuluj
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditRole(user.id, user.role)}
                              className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
                            >
                              Edytuj
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                            >
                              Usuń
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="border border-gray-200 shadow-lg"
          progressClassName="bg-orange-500"
          theme="colored"
        />
      </div>
    </PrivateRoute>
  );
};

export default AdminPanelPage;