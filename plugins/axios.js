export default function ({ $axios, store }) {
  $axios.interceptors.request.use((config) => {
    const except_url = [
      "/api/api-token",
      // "/api/forgotpassword",
      // "/auth/register",
      // "/auth/changePassword",
    ];
    if (
      localStorage.getItem("_access") &&
      except_url.indexOf(config.url) === -1
    ) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "_access"
      )}`;
      // config.headers.access = `Bearer ${localStorage.getItem("_token")}`;
    }
    // config.headers.Vary = "Accept";
    // config.headers.Accept = "*/*";
    // config.headers["Content-Type"] = "application/json";
    // config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  });

  $axios.interceptors.response.use(
    (config) => {
      // let token = config.headers.authorization;
      return config;
    },
    function (error) {
      // console.log("error axios resonse: ", error);
      return Promise.reject(error);
    }
  );
}
