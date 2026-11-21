const BASE_URL = "http://localhost:8080/api";

export function guardarSesion(data) {
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  if (data.rol) {
    localStorage.setItem("rol", data.rol);
  }
  localStorage.setItem(
    "usuarioLogueado",
    JSON.stringify({
      nombre: data.nombre || "",
      email: data.email || "",
      rol: data.rol || "",
    })
  );
}

export function obtenerToken() {
  return localStorage.getItem("token");
}

export function obtenerRol() {
  return localStorage.getItem("rol");
}

export function obtenerUsuario() {
  const raw = localStorage.getItem("usuarioLogueado");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  localStorage.removeItem("usuarioLogueado");
}

export function esAdmin() {
  return obtenerRol() === "ROLE_ADMIN";
}

export function esStaff() {
  const rol = obtenerRol();
  return rol === "ROLE_ADMIN" || rol === "ROLE_TRABAJADOR" || rol === "ROLE_VENDEDOR";
}

export async function apiFetch(endpoint, options = {}) {
  const token = obtenerToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
}