import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_PROD_API_URL

export const getToken = () => {
  if (typeof window !== "undefined") {
    // Client-side-only code
    const token = sessionStorage.getItem("admin");
    return token
  } else {
    return "";
  }
};

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      config.headers.Authorization = "Bearer " + getToken();
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export function formatNaira(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
}
