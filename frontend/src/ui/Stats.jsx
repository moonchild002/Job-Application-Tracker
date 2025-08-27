import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline"

const statConfigs = {
  Total: {
    color: "bg-slate-100 text-slate-800 border-slate-200",
    icon: ChartBarIcon,
    darkColor: "dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700",
  },
  Applied: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: ClockIcon,
    darkColor: "dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
  },
  Interview: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: StarIcon,
    darkColor: "dark:bg-amber-900 dark:text-amber-200 dark:border-amber-700",
  },
  Rejected: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircleIcon,
    darkColor: "dark:bg-red-900 dark:text-red-200 dark:border-red-700",
  },
  Offer: {
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircleIcon,
    darkColor: "dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700",
  },
  Hired: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: TrophyIcon,
    darkColor: "dark:bg-green-900 dark:text-green-200 dark:border-green-700",
  },
}

export default function Stats({ stats }) {
  const items = [
    { label: "Total", value: stats.total },
    { label: "Applied", value: stats.applied },
    { label: "Interview", value: stats.interview },
    { label: "Rejected", value: stats.rejected },
    { label: "Offer", value: stats.offer },
    { label: "Hired", value: stats.hired },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((item) => {
        const config = statConfigs[item.label]
        const Icon = config.icon

        return (
          <div
            key={item.label}
            className={`group p-4 rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${config.color} ${config.darkColor}`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm font-medium opacity-80">{item.label}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
