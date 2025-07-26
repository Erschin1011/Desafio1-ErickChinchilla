export function registerUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find(user => user.username === username);
  if (exists) return { success: false, message: "Usuario ya existe" };

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true };
}

export function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    user => user.username === username && user.password === password
  );
  if (user) {
    localStorage.setItem("session", JSON.stringify({ username }));
    return { success: true };
  }
  return { success: false, message: "Credenciales incorrectas" };
}

export function logoutUser() {
  localStorage.removeItem("session");
}

export function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}
