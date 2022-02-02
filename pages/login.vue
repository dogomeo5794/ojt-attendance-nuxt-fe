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
        <p class="login-box-msg">Sign in your account to start your session</p>

        <div class="input-group mb-3">
          <input
            type="text"
            :class="`form-control ${
              loginError.code !== null ? 'is-invalid' : ''
            }`"
            placeholder="Username"
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

          <router-link
            :to="{ name: 'admin-login' }"
            tag="a"
            exact
            class="btn btn-block btn-primary"
          >
            <i class="fas fa-unlock mr-2"></i> Sign in as Admin
          </router-link>

          <router-link
            :to="{ name: 'authorized-personnel-register' }"
            tag="a"
            exact
            class="btn btn-block btn-danger"
          >
            <i class="fas fa-user-tie mr-2"></i> Register as Authorized
            Personnel
          </router-link>

          <router-link
            :to="{ name: 'verify-id' }"
            tag="a"
            exact
            class="btn btn-block btn-outline-danger"
          >
            <i class="fas fa-clipboard-list mr-2"></i> View Attendance
          </router-link>
        </div>

        <p class="mb-1">
          <a href="forgot-password.html">I forgot my password</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      loginError: {
        code: null,
        message: null,
      },
    };
  },

  computed: {
    loginLabel() {
      return this.originPage === "UAM" ? "UAM-Admin" : "USER";
    },
  },

  props: ["originPage"],

  methods: {
    async login() {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const payload = {
          username: this.username,
          password: this.password,
          login_as: "personnel",
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
                name: "personnel",
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
