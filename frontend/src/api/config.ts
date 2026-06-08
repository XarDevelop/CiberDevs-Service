import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('VITE_API_URL is required. Set it in .env or Vercel environment variables.');
}

axios.defaults.withCredentials = true;

export const API_BASE = apiUrl;
