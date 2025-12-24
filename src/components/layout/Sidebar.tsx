import { LayoutDashboard } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">
          DITJEN PEMBANGUNAN DAERAH
        </h1>
        <p className="text-sm text-gray-500 mt-1">Dashboard Gaji Pegawai</p>
      </div>

      <nav className="mt-6">
        <div className="w-full flex items-center gap-3 px-6 py-3 bg-blue-50 text-blue-600 border-r-4 border-blue-600">
          <LayoutDashboard className="h-5 w-5" />
          <span className="font-medium">Dashboard</span>
        </div>
      </nav>
    </aside>
  );
}
