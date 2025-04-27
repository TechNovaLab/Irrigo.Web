import { parse, serialize } from "cookie";

const sessionStorageManager = {
  set: (key: string, value: unknown) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  get: (key: string) => {
    if (typeof window !== "undefined") {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },
  remove: (key: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(key);
    }
  },
};

const cookieStorageManager = {
  set: (key: string, value: unknown, options: Record<string, unknown> = {}) => {
    if (typeof document !== "undefined") {
      const serializedValue = serialize(key, JSON.stringify(value), {
        path: "/",
        secure: false,
        sameSite: "strict",
        httpOnly: false,
        ...options,
      });
      document.cookie = serializedValue;
    }
  },
  get: (key: string) => {
    if (typeof document !== "undefined") {
      const cookies = parse(document.cookie || "");
      const value = cookies[key];

      return value ? JSON.parse(value) : null;
    }
    return null;
  },
  remove: (key: string) => {
    if (typeof document !== "undefined") {
      document.cookie = serialize(key, "", {
        path: "/",
        maxAge: 0,
      });
    }
  },
};

export { sessionStorageManager, cookieStorageManager };
