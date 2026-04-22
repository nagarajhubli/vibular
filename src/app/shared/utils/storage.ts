/**
 * SSR/sandbox-safe localStorage wrapper. Silently no-ops when storage is
 * unavailable (e.g. pre-hydration, private mode quota errors).
 */
export const safeStorage = {
  get(key: string): string | null {
    try {
      if (typeof localStorage === 'undefined') return null;
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
};
