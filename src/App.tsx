import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';

// Lazy load admin pages
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const ContentManager = React.lazy(() => import('./pages/admin/ContentManager'));
const LeadsManager = React.lazy(() => import('./pages/admin/LeadsManager'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
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
          <Route path="leads" element={
            <Suspense fallback={<div>Carregando leads...</div>}>
              <LeadsManager />
            </Suspense>
          } />
          <Route path="content" element={
             <Suspense fallback={<div>Carregando editor...</div>}>
               <ContentManager />
             </Suspense>
          } />
          <Route path="team" element={<div className="p-8">Gestão de Equipe (Em breve)</div>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
