export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-on-surface">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Cards */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
          <h3 className="text-sm font-medium text-on-surface-variant mb-2">Total Bookings</h3>
          <div className="text-3xl font-bold text-primary">0</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
          <h3 className="text-sm font-medium text-on-surface-variant mb-2">Active Services</h3>
          <div className="text-3xl font-bold text-primary">0</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
          <h3 className="text-sm font-medium text-on-surface-variant mb-2">Published Blogs</h3>
          <div className="text-3xl font-bold text-primary">0</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
          <h3 className="text-sm font-medium text-on-surface-variant mb-2">Active Offers</h3>
          <div className="text-3xl font-bold text-primary">0</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
          <h2 className="text-lg font-bold text-on-surface mb-4">Recent Bookings</h2>
          <p className="text-sm text-on-surface-variant">No recent bookings found.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
          <h2 className="text-lg font-bold text-on-surface mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors border border-outline-variant/20 text-sm font-medium">
              + Add New Service
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors border border-outline-variant/20 text-sm font-medium">
              + Create Blog Post
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors border border-outline-variant/20 text-sm font-medium">
              + Upload to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
