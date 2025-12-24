import { LayoutDashboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar - Always visible on lg screens */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen shrink-0">
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

      {/* Mobile Sidebar - Slide in from left */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-lg font-bold text-gray-800">Menu</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <h2 className="text-base font-bold text-gray-800">
            DITJEN PEMBANGUNAN DAERAH
          </h2>
          <p className="text-xs text-gray-500 mt-1">Dashboard Gaji Pegawai</p>
        </div>

        <nav className="mt-4">
          <div className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 border-r-4 border-blue-600">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </div>
        </nav>
      </aside>
    </>
  );
}
