export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Leads Hoje</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Vendas do Mês</h3>
          <p className="text-3xl font-bold">45</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Taxa de Conversão</h3>
          <p className="text-3xl font-bold">18%</p>
        </div>
      </div>
      <div className="h-64 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
        Gráficos aqui (Recharts)
      </div>
    </div>
  )
}
