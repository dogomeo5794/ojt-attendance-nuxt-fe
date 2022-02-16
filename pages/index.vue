<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="/"><b>EA-OJT</b> Welcome Page</a>
    </div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg"></p>

        <div class="social-auth-links text-center mb-3">
          <router-link
            :to="{ name: 'login' }"
            tag="a"
            exact
            class="btn btn-app"
          >
            <i class="fas fa-lock"></i> Login
          </router-link>

          <router-link
            :to="{ name: 'authorized-personnel-register' }"
            tag="a"
            exact
            class="btn btn-app"
          >
            <i class="fas fa-edit"></i> Register
          </router-link>

          <router-link
            :to="{ name: 'student-attendance' }"
            tag="a"
            exact
            class="btn btn-app"
          >
            <i class="fas fa-barcode"></i> Records
          </router-link>

          <router-link
            :to="{ name: 'init-check-attendance' }"
            tag="a"
            exact
            class="btn btn-app"
          >
            <i class="fas fa-barcode"></i> Check Attendance (remove me later -
            testing only)
          </router-link>
        </div>

        <!-- <p class="mb-1">
          <a href="forgot-password.html">I forgot my password</a>
        </p>
        <p class="mb-0">
          <a href="register.html" class="text-center">Register a new membership</a>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
export default {
  layout: "auth",
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },

  data() {
    return {};
  },

  computed: {
    loginLabel() {
      return this.originPage === "UAM" ? "UAM-Admin" : "USER";
    },
  },

  props: ["originPage"],

  mounted() {
    this.$router.push({
      name: "login",
    });
    // document.body.className = "";
    // document.body.classList.add("hold-transition", "login-page");
  },

  methods: {
    onDecode(decodedString) {
      console.log("decodedString", decodedString);
    },

    // login() {
    //   this.$store.commit("setIsLogged", true);
    //   this.$router.push({name: 'Base'})
    //   window.location.reload();
    // },
  },
};
</script>
