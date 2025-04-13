'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/utils/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const logout = React.useCallback(() => {
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        setIsAuthenticated(false);
        router.push('/login');
    }, [router]);

    const checkAuth = useCallback(async () => {
        try {
            const token = getAuthToken();
            if (!token) {
                logout();
                return false;
            }

            const response = await fetch('/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                logout();
                return false;
            }

            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Auth check failed:', error);
            logout();
            return false;
        }
    }, [logout]);

    useEffect(() => {
        checkAuth();
        // Check token validity every 5 minutes
        const interval = setInterval(checkAuth, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [checkAuth]);

    const login = (token: string) => {
        document.cookie = `auth_token=${token}; path=/; max-age=86400; secure; samesite=strict`;
        setIsAuthenticated(true);
        router.push('/dashboard/home');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
