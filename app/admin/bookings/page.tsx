"use client";

import { useState, useEffect } from "react";
import { 
  CalendarCheck, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  CheckSquare, 
  ChevronRight,
  Filter
} from "lucide-react";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  notes: string;
  status: string;
  service: {
    title: string;
    price: number;
  };
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setBookings(prev => 
          prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking request?")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filterStatus === "ALL") return true;
    return b.status === filterStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "CONFIRMED":
        return "bg-green-50 text-green-700 border-green-200";
      case "COMPLETED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface font-display-lg">Manage Bookings</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Review, approve, and track client appointments.</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-outline-variant/30 shadow-sm text-sm">
          <Filter size={16} className="text-on-surface-variant" />
          <span className="font-bold text-on-surface-variant text-[12px] uppercase tracking-wide mr-2">Filter</span>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border-none focus:ring-0 text-sm font-medium bg-transparent cursor-pointer p-0 pr-8"
          >
            <option value="ALL">All Bookings</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-outline-variant/20 p-12 text-center text-on-surface-variant flex flex-col items-center justify-center min-h-[350px]">
          <CalendarCheck size={52} className="mb-4 text-black/20" />
          <h2 className="text-xl font-bold text-on-surface mb-2">No Bookings Found</h2>
          <p className="text-sm max-w-sm">No appointment bookings match your active filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-outline-variant/30 text-[11px] font-label-md uppercase tracking-wider text-on-surface-variant/80">
                  <th className="p-5 pl-8">Client</th>
                  <th className="p-5">Service</th>
                  <th className="p-5">Date &amp; Time</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Notes</th>
                  <th className="p-5 pr-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-body-md text-sm text-on-surface">
                {filteredBookings.map((booking) => {
                  const dateObj = new Date(booking.date);
                  const formattedDate = dateObj.toLocaleDateString(undefined, { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  });
                  const formattedTime = dateObj.toLocaleTimeString(undefined, { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  });

                  return (
                    <tr key={booking.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                      {/* Customer Info */}
                      <td className="p-5 pl-8">
                        <div>
                          <p className="font-bold text-[15px]">{booking.customerName}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{booking.customerPhone}</p>
                          {booking.customerEmail && (
                            <p className="text-[11px] text-on-surface-variant/70 italic mt-0.5">{booking.customerEmail}</p>
                          )}
                        </div>
                      </td>

                      {/* Service details */}
                      <td className="p-5">
                        <div>
                          <p className="font-semibold">{booking.service?.title || "Unknown Service"}</p>
                          <p className="text-xs text-secondary font-semibold mt-0.5">Rs. {booking.service?.price.toLocaleString() || "0"}</p>
                        </div>
                      </td>

                      {/* Date details */}
                      <td className="p-5">
                        <div>
                          <p className="font-semibold">{formattedDate}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{formattedTime}</p>
                        </div>
                      </td>

                      {/* Status select */}
                      <td className="p-5">
                        <select 
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer outline-none focus:ring-0 ${getStatusStyle(booking.status)}`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>

                      {/* Notes snippet */}
                      <td className="p-5">
                        <p className="text-xs text-on-surface-variant max-w-[180px] line-clamp-2" title={booking.notes}>
                          {booking.notes || "—"}
                        </p>
                      </td>

                      {/* Action buttons */}
                      <td className="p-5 pr-8 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleDelete(booking.id)}
                            className="w-9 h-9 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full transition-colors border-none"
                            title="Delete Booking"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
