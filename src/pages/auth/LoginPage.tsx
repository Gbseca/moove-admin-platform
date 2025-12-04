export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Administrativo</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-md dark:bg-slate-950 dark:border-slate-700" placeholder="seu@email.com" />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Senha</label>
            <input type="password" className="w-full px-3 py-2 border rounded-md dark:bg-slate-950 dark:border-slate-700" placeholder="••••••••" />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
