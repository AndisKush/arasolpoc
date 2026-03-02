import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '../types';

// Layouts
import { DashboardLayout } from '../layouts/DashboardLayout';

// Components
import { PrivateRoute } from '../components/PrivateRoute';

// Auth Pages
import { Login } from '../pages/auth/Login';

// Admin Pages
import { AdminDashboard } from '../pages/admin/Dashboard';
import { UsersList } from '../pages/admin/Users';
import { UserForm } from '../pages/admin/UserForm';

// User Pages
import { Modules } from '../pages/user/Modules';
import { CRMDashboard } from '../pages/user/CRMDashboard';
import { CadastrosProdutos } from '../pages/user/CadastrosProdutos';
import { CadastrosFluxos } from '../pages/user/CadastrosFluxos';
import { CadastrosUsuarios } from '../pages/user/CadastrosUsuarios';
import { Propostas } from '../pages/user/Propostas';
import { LeiaMe } from '../pages/user/LeiaMe';

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UsersList />} />
                <Route path="users/new" element={<UserForm />} />
                <Route path="users/:id/edit" element={<UserForm />} />
                {/* Redirecionar /admin para dashboard */}
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
            </Route>

            {/* User Routes */}
            <Route
                path="/modules"
                element={
                    <PrivateRoute allowedRoles={[UserRole.USER, UserRole.ADMIN]}>
                        <Modules />
                    </PrivateRoute>
                }
            />

            <Route
                path="/crm"
                element={
                    <PrivateRoute allowedRoles={[UserRole.USER, UserRole.ADMIN]}>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                <Route path="home" element={<CRMDashboard />} />
                <Route path="cadastros/produtos" element={<CadastrosProdutos />} />
                <Route path="cadastros/fluxos" element={<CadastrosFluxos />} />
                <Route path="cadastros/usuarios" element={<CadastrosUsuarios />} />
                <Route path="propostas" element={<Propostas />} />
                <Route path="leia-me" element={<LeiaMe />} />

                <Route index element={<Navigate to="/crm/home" replace />} />
            </Route>

            {/* Raiz redireciona para modulos */}
            <Route path="/" element={<Navigate to="/modules" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};
