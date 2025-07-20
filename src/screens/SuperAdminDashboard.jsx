import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import CustomerJobsTable from "../components/CustomerJobsTable";
import { UserPlus, Users, Settings, ClipboardList, Trash2 } from "lucide-react";

const SuperAdminDashboard = () => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "worker" });
  const [message, setMessage] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState("");

  // New states for jobs table
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [showCustomerJobs, setShowCustomerJobs] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "superadmin") {
      // Show nothing while redirecting
      document.body.innerHTML = '';
      window.location.href = "/admin-login";
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5001/auth/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("User created successfully!");
        setForm({ username: "", password: "", role: "worker" });
      } else {
        setMessage(data.message || "Failed to create user");
      }
    } catch (err) {
      setMessage("Failed to create user");
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setUsersError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/auth/api/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      } else {
        setUsersError(data.message || "Failed to fetch users");
      }
    } catch (err) {
      setUsersError("Failed to fetch users");
    }
    setLoadingUsers(false);
  };

  // Fetch jobs (customers) - use same endpoint as AdminDashboard
  const fetchJobs = async () => {
    setLoadingJobs(true);
    setJobsError("");
    try {
      const response = await fetch("http://localhost:5001/api/customers");
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      setFilteredCustomers(data);
    } catch (err) {
      setJobsError(err.message);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleShowUsers = () => {
    if (!showUsers) fetchUsers();
    setShowUsers(!showUsers);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/admin-login";
  };

  // Handler for status change (use same as AdminDashboard)
  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`http://localhost:5001/api/jobs/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobStatus: newStatus })
      });
      if (!response.ok) throw new Error("Failed to update status");
      setFilteredCustomers(customers => customers.map(c => c._id === id ? { ...c, jobStatus: newStatus } : c));
    } catch (err) {
      setJobsError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Handler for deleting jobs
  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      return;
    }
    
    setDeletingId(id);
    try {
      const response = await fetch(`http://localhost:5001/api/customers/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete job");
      setFilteredCustomers(customers => customers.filter(c => c._id !== id));
    } catch (err) {
      setJobsError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Handler for deleting users
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    
    setDeletingUserId(userId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/auth/api/users/${userId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
      setUsers(users => users.filter(u => u._id !== userId));
      setMessage("User deleted successfully!");
    } catch (err) {
      setUsersError(err.message);
    } finally {
      setDeletingUserId(null);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <DashboardHeader onLogout={handleLogout} />
      <section className="min-h-screen bg-gradient-to-br from-automotive-blue to-automotive-charcoal py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow">Super Admin Portal</h1>
              <p className="text-lg text-gray-200">Welcome, Nabil! Manage users and advanced settings here.</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/95 rounded-2xl shadow-lg p-6 flex items-center gap-4 cursor-pointer hover:shadow-xl transition" onClick={handleShowUsers}>
              <Users className="h-10 w-10 text-automotive-blue bg-automotive-blue/10 rounded-full p-2" />
              <div>
                <div className="text-2xl font-bold text-automotive-charcoal">All Users</div>
                <div className="text-gray-500 text-sm">Manage all admin and worker accounts</div>
              </div>
            </div>
            <div className="bg-white/95 rounded-2xl shadow-lg p-6 flex items-center gap-4">
              <Settings className="h-10 w-10 text-automotive-blue bg-automotive-blue/10 rounded-full p-2" />
              <div>
                <div className="text-2xl font-bold text-automotive-charcoal">Settings</div>
                <div className="text-gray-500 text-sm">Advanced portal controls</div>
              </div>
            </div>
            <div className="bg-white/95 rounded-2xl shadow-lg p-6 flex items-center gap-4 cursor-pointer hover:shadow-xl transition" onClick={() => setShowCreateUser(!showCreateUser)}>
              <UserPlus className="h-10 w-10 text-automotive-blue bg-automotive-blue/10 rounded-full p-2" />
              <div>
                <div className="text-2xl font-bold text-automotive-charcoal">Create User</div>
                <div className="text-gray-500 text-sm">Add new admins or workers</div>
              </div>
            </div>
            <div className="bg-white/95 rounded-2xl shadow-lg p-6 flex items-center gap-4 cursor-pointer hover:shadow-xl transition" onClick={() => setShowCustomerJobs(!showCustomerJobs)}>
              <ClipboardList className="h-10 w-10 text-automotive-blue bg-automotive-blue/10 rounded-full p-2" />
              <div>
                <div className="text-2xl font-bold text-automotive-charcoal">Customer Jobs</div>
                <div className="text-gray-500 text-sm">View and manage all customer jobs</div>
              </div>
            </div>
          </div>

          {/* Admin Jobs Table Section (shared with AdminDashboard) */}
          {showCustomerJobs && (
            <div className="mb-10" id="customer-jobs-table">
              <CustomerJobsTable
                loading={loadingJobs}
                error={jobsError}
                filteredCustomers={filteredCustomers}
                updatingId={updatingId}
                handleStatusChange={handleStatusChange}
                handleDeleteJob={handleDeleteJob}
                deletingId={deletingId}
              />
            </div>
          )}

          {/* Create User Form */}
          {showCreateUser && (
            <div className="bg-white/95 rounded-2xl shadow-lg p-8 mb-10 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-automotive-blue">Register New User</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-automotive-blue"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-automotive-blue"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Role</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-automotive-blue"
                  >
                    <option value="worker">Worker</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-automotive-red text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Register
                </button>
              </form>
              {message && <div className="mt-4 text-center text-automotive-blue font-semibold">{message}</div>}
            </div>
          )}

          {/* Users List Modal/Section */}
          {showUsers && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative">
                <button className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl" onClick={handleShowUsers}>&times;</button>
                <h2 className="text-2xl font-bold mb-4 text-automotive-blue">All Users</h2>
                {loadingUsers ? (
                  <div className="text-center text-gray-600">Loading users...</div>
                ) : usersError ? (
                  <div className="text-center text-red-600">{usersError}</div>
                ) : users.length === 0 ? (
                  <div className="text-center text-gray-600">No users found.</div>
                ) : (
                  <table className="w-full border mt-2">
                    <thead>
                      <tr className="bg-automotive-blue text-white">
                        <th className="py-2 px-3">Username</th>
                        <th className="py-2 px-3">Role</th>
                        <th className="py-2 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, i) => (
                        <tr key={i} className="border-b hover:bg-gray-100">
                          <td className="py-2 px-3">{u.username}</td>
                          <td className="py-2 px-3 capitalize">{u.role}</td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              disabled={deletingUserId === u._id}
                              className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors duration-200"
                              title="Delete user"
                            >
                              {deletingUserId === u._id ? (
                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Welcome/Info Section */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 text-center mt-8">
            <h2 className="text-2xl font-bold text-automotive-blue mb-2">Welcome, Nabil!</h2>
            <p className="text-gray-700 mb-2">Here you can manage users, access advanced features, and oversee the entire portal.</p>
            <p className="text-gray-500">Use the cards above to navigate to different sections or create new users as needed.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SuperAdminDashboard;
