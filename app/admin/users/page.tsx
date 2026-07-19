import { Users, Plus } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-on-surface">Manage Users</h1>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
        {users.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant flex flex-col items-center justify-center min-h-[300px]">
            <Users size={48} className="mb-4 text-primary/50" />
            <h2 className="text-lg font-medium text-on-surface mb-2">No Users Found</h2>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/30">
                <th className="p-4 font-semibold text-sm text-on-surface-variant">Name</th>
                <th className="p-4 font-semibold text-sm text-on-surface-variant">Email</th>
                <th className="p-4 font-semibold text-sm text-on-surface-variant">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="p-4 font-medium text-on-surface">{user.name || "Unknown"}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{user.email}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">{user.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
