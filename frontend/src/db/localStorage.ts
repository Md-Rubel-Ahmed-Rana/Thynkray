/* eslint-disable @typescript-eslint/no-explicit-any */
export const getLocalStorageValue = (key: string): string | null => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
};

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
