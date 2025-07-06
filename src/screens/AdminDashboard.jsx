import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ClipboardList, Clock, CheckCircle } from 'lucide-react';
import CustomerJobsTable from "../components/CustomerJobsTable";

const JOB_STATUS_OPTIONS = ["Pending", "Started", "Completed"];
const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Started: "bg-automotive-blue/20 text-automotive-blue border-automotive-blue/30",
  Completed: "bg-green-100 text-green-800 border-green-300",
};

const AdminDashboard = () => {
  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/admin-login";
    }
  }, []);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/customers");
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`http://localhost:5001/api/jobs/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobStatus: newStatus })
      });
      if (!response.ok) throw new Error("Failed to update status");
      setCustomers(customers => customers.map(c => c._id === id ? { ...c, jobStatus: newStatus } : c));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered and searched customers
  const filteredCustomers = customers.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.vehicle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? c.jobStatus === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalJobs: customers.length,
    inProgress: customers.filter(c => c.jobStatus === "Started").length,
    completed: customers.filter(c => c.jobStatus === "Completed").length
  };

  return (
    <>
      <Header />
      <section className="relative min-h-screen bg-gradient-to-br from-automotive-blue to-automotive-charcoal py-24 px-4">
        <div className="absolute inset-0 bg-black opacity-20 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow">Customer Jobs</h1>
              <p className="text-gray-200 text-lg">Track and manage service requests</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/admin-login";
              }}
              className="mt-6 md:mt-0 bg-automotive-red hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/95 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="bg-automotive-blue/10 rounded-lg p-3">
                  <ClipboardList className="h-6 w-6 text-automotive-blue" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Jobs</p>
                  <h3 className="text-2xl font-bold text-automotive-charcoal">{stats.totalJobs}</h3>
                </div>
              </div>
            </div>
            <div className="bg-white/95 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="bg-automotive-blue/10 rounded-lg p-3">
                  <Clock className="h-6 w-6 text-automotive-blue" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">In Progress</p>
                  <h3 className="text-2xl font-bold text-automotive-charcoal">{stats.inProgress}</h3>
                </div>
              </div>
            </div>
            <div className="bg-white/95 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="bg-automotive-blue/10 rounded-lg p-3">
                  <CheckCircle className="h-6 w-6 text-automotive-blue" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Completed</p>
                  <h3 className="text-2xl font-bold text-automotive-charcoal">{stats.completed}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white/95 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name, phone, or vehicle..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-blue focus:border-automotive-blue bg-white/50"
                />
              </div>
              <div className="w-full md:w-48">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-blue focus:border-automotive-blue bg-white/50"
                >
                  <option value="">All Statuses</option>
                  {JOB_STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <CustomerJobsTable
            loading={loading}
            error={error}
            filteredCustomers={filteredCustomers}
            updatingId={updatingId}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
