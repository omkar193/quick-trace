// export const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// export const getUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };

export const getUser = () => {
  if (typeof window === "undefined") return null; // ✅ Prevents SSR issues
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// export const getAuthHeaders = () => {
//   if (typeof window === "undefined") return {}; // ✅ Prevents SSR issues
//   const token = localStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

export const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
