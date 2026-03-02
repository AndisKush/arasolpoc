// LocalStorage utility with type safety

const STORAGE_KEYS = {
    AUTH_TOKEN: '@linkservice:token',
    REFRESH_TOKEN: '@linkservice:refresh_token',
    USER: '@linkservice:user',
} as const;

export const storage = {
    // Token
    getToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    },

    setToken(token: string): void {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    },

    removeToken(): void {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    },

    // Refresh Token
    getRefreshToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    },

    setRefreshToken(token: string): void {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    },

    removeRefreshToken(): void {
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    },

    // User
    getUser(): any | null {
        const user = localStorage.getItem(STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : null;
    },

    setUser(user: any): void {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },

    removeUser(): void {
        localStorage.removeItem(STORAGE_KEYS.USER);
    },

    // Clear all
    clearAll(): void {
        this.removeToken();
        this.removeRefreshToken();
        this.removeUser();
    },
};
