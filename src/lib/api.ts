

const rawApiUrl = import.meta.env.VITE_API_URL;

if (!rawApiUrl) {
  throw new Error(
    "Missing VITE_API_URL environment variable. " +
    "Please check your .env.local file."
  );
}


export const API_URL = rawApiUrl.replace(/\/$/, "");

