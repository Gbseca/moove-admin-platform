export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-center">Proteção Veicular Inteligente</h1>
      <p className="text-lg text-slate-500 mb-8 max-w-2xl text-center">
        Cote agora e proteja seu veículo com a Moove. Rápido, fácil e sem burocracia.
      </p>
      {/* Wizard Placeholder */}
      <div className="w-full max-w-md p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-semibold mb-4">Simular Cotação</h2>
        <div className="space-y-4">
           <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
           <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
           <div className="h-10 bg-blue-600 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
