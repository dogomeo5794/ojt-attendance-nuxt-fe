<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="#"><b>EA-OJT</b> Login Page</a>
    </div>
    <div
      class="alert alert-danger alert-dismissible text-sm"
      v-if="loginError.code != null"
    >
      <h6>
        <i class="icon fas fa-exclamation-triangle"></i> The following error(s)
        occurred
      </h6>
      {{ loginError.message }}
    </div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">
          Sign in your admin account to start your session
        </p>

        <div class="input-group mb-3">
          <input
            type="text"
            :class="`form-control ${
              loginError.code !== null ? 'is-invalid' : ''
            }`"
            placeholder="Company ID Number"
            v-model="username"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input
            type="password"
            :class="`form-control ${
              loginError.code !== null ? 'is-invalid' : ''
            }`"
            placeholder="Password"
            v-model="password"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="icheck-primary">
              <input type="checkbox" id="remember" />
              <label for="remember"> Remember Me </label>
            </div>
          </div>
          <div class="col-5 text-right">
            <button
              type="submit"
              @click.prevent="login"
              class="btn btn-primary"
              :disabled="isLoading"
            >
              <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
              {{ isLoading ? " Signing..." : " Sign In" }}
            </button>
          </div>
        </div>

        <div class="social-auth-links text-center mb-3">
          <p>- OR -</p>
          <!-- <a href="#" class="btn btn-block btn-primary">
            <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
          </a> -->
        </div>

        <p class="mb-1">
          <a href="#">I forgot my password</a>
        </p>
        <!-- <p class="mb-0">
          <a href="#">Register account</a>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
    isLoading: false,
    loginError: {
      code: null,
      message: null,
    },
  }),

  computed: {},

  mounted() {},

  methods: {
    async login() {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const payload = {
          username: this.username,
          password: this.password,
          login_as: "admin",
        };
        const { status, data } = await this.$store.dispatch(
          `Account/userLogin`,
          payload
        );
        console.log("status", status);
        console.log("data", data);
        if ([200, 201].indexOf(status) > -1) {
          localStorage.setItem("_token", data.access_token);
          localStorage.setItem("_user_logged", JSON.stringify(data.user));
          this.$nextTick(() => {
            this.$store.commit("setUserAccount", data?.user?.account || {});
            this.$store.commit("setIsLogged", true);
            delete data.user.account;
            this.$store.commit("setUser", data.user || {});
            console.log("set is_logged");
            this.$nextTick(() => {
              console.log("login set is_logged", this.$store.state.isLogged);
              this.$router.push({
                name: "admin-dashboard",
              });
            });
          });
          this.isLoading = false;
          this.loginError = {
            code: null,
            message: null,
          };
          return;
        }
        this.loginError = {
          code: status,
          message: "Incorrect username or password.",
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
};
</script>
