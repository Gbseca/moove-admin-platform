import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';

// Lazy load admin pages
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<div className="container py-20">Sobre (Em construção)</div>} />
          <Route path="/unidades" element={<div className="container py-20">Unidades (Em construção)</div>} />
          <Route path="/depoimentos" element={<div className="container py-20">Depoimentos (Em construção)</div>} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={
            <Suspense fallback={<div>Carregando dashboard...</div>}>
              <AdminDashboard />
            </Suspense>
          } />
          <Route path="leads" element={<div className="p-4">Leads Kanban (Em construção)</div>} />
          <Route path="content" element={<div className="p-4">Gestão de Conteúdo (Em construção)</div>} />
          <Route path="team" element={<div className="p-4">Gestão de Equipe (Em construção)</div>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
