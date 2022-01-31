export default function ({ store, redirect, params, route }) {
  let token = localStorage.getItem("_access");

  if (!token) {
    return redirect("/login");
  }
}
