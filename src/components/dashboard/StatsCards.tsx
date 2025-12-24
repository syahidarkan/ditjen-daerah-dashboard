import { Card, CardContent } from "@/components/ui/card";
import { Database, Users, TrendingUp, DollarSign } from "lucide-react";
import type { DashboardStats } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface StatsCardsProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

export function StatsCards({ stats, isLoading = false }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Data",
      value: stats.totalData.toString(),
      icon: Database,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total PNS",
      value: stats.totalPNS.toString(),
      icon: Users,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Total Non-PNS",
      value: stats.totalNonPNS.toString(),
      icon: Users,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Kotor",
      value: formatCurrency(stats.totalKotor),
      icon: DollarSign,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Bersih",
      value: formatCurrency(stats.totalBersih),
      icon: TrendingUp,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">
                    {card.title}
                  </p>
                  <div className={`${card.bgColor} p-2 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                  {card.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
