import { Button } from "@/components/ui/button";
import { Home, FileQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
            <FileQuestion className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ditemukan. Silakan kembali ke
          halaman utama atau periksa URL yang Anda masukkan.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline">
            Kembali
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            <Home className="h-4 w-4 mr-2" />
            Ke Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
