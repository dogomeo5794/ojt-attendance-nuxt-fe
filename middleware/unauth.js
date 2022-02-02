export default function ({ store, redirect, params, route, next }) {
  let is_logged = store.state.isLogged || false;

  if (is_logged) {
    let userType = store?.state?.userAccount?.user_type || null;

    let routename = route.name?.toLowerCase() || null;
    let except = ["check-attendance"];

    if (userType === "authorized-personnel" && !except.includes(routename)) {
      return redirect("/personnel");
    } else if (userType === "admin" && !except.includes(routename)) {
      return redirect("/admin-dashboard");
    }
  }
}
