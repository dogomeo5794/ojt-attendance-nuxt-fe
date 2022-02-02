export default function ({ store, redirect, params, route, next }) {
  let is_logged = store.state.isLogged || false;

  console.log("middleware auth is_logged", is_logged);
  if (!is_logged) {
    return redirect("/login");
  }
}
