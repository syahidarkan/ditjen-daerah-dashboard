import { LogOut, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AuthUser } from "@/types";

interface TopbarProps {
  user: AuthUser;
  onLogout: () => void;
  onMenuClick: () => void;
}

export function Topbar({ user, onLogout, onMenuClick }: TopbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 shrink-0">
      {/* Left Side - Hamburger Menu & Title */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {/* Hamburger Menu - Mobile Only */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden h-9 w-9 p-0"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Title */}
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate">
          <span className="hidden sm:inline">Sistem Manajemen Data Gaji</span>
          <span className="sm:hidden">Data Gaji</span>
        </h2>
      </div>

      {/* Right Side - User Menu */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 h-9 sm:h-10 px-2 sm:px-3">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 sm:w-56">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-gray-600">
              <User className="mr-2 h-4 w-4" />
              <span className="truncate">Username: {user.username}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onLogout}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
