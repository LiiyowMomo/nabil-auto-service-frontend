import React from "react";
import { Trash2 } from "lucide-react";

const JOB_STATUS_OPTIONS = ["Pending", "Started", "Completed"];
const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Started: "bg-automotive-blue/20 text-automotive-blue border-automotive-blue/30",
  Completed: "bg-green-100 text-green-800 border-green-300",
};

const CustomerJobsTable = ({
  loading,
  error,
  filteredCustomers,
  updatingId,
  handleStatusChange,
  handleDeleteJob,
  deletingId,
}) => (
  <div className="bg-white/95 rounded-xl shadow-lg overflow-hidden">
    {loading && (
      <div className="text-lg text-automotive-blue p-8 text-center">
        Loading...
      </div>
    )}
    {error && (
      <div className="text-red-600 p-8 text-center font-semibold">{error}</div>
    )}
    {!loading && !error && (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-automotive-blue text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Vehicle</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Service(s)</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Job Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">
                    {c.customerID}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {c.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {c.vehicle}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {Array.isArray(c.service) ? c.service.join(", ") : c.service}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {c.message}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.jobStatus]}`}
                      >
                        {c.jobStatus}
                      </span>
                      <select
                        value={c.jobStatus}
                        onChange={(e) =>
                          handleStatusChange(c._id, e.target.value)
                        }
                        disabled={updatingId === c._id}
                        className="text-sm border-gray-300 rounded-md focus:ring-automotive-blue focus:border-automotive-blue"
                      >
                        {JOB_STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteJob(c._id)}
                      disabled={deletingId === c._id}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors duration-200"
                      title="Delete job"
                    >
                      {deletingId === c._id ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default CustomerJobsTable;
