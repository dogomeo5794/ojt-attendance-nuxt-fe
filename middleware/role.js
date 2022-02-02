export default function ({ store, redirect, params, route, next, error }) {
  let meta = {};
  if (Object.prototype.toString.call(route.meta) === "[object Array]") {
    meta = route.meta.find((i, k) => i["role"]);
  } else if (Object.prototype.toString.call(route.meta) === "[object Object]") {
    meta = route.meta;
  }

  let roleMeta = meta?.role || "!QJH82w=k~r<y@H)";
  let roleAccount = store.state?.userAccount?.user_type || "SsyAZf>x`*4sZg4~";

  // let routename = route.name?.toLowerCase() || null;
  // let except = ["check-attendance"];

  // console.log("routename", routename);
  // console.log("except", !except.includes(routename));

  if (roleAccount !== roleMeta) {
    // redirect(404, "/404/el?e=rnf"); // show default 404 not found in nuxt
    error({
      statusCode: 404,
      message: "ERR_404: Page could not be found",
    });
  }
}
