<template>
  <nav class="main-header navbar navbar-expand navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">OJT Attendance Monitoring System</a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="refreshPage">
          <i class="fas fa-sync-alt"></i> Refresh
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link btn-logout" href="#" @click.prevent="logoutMeOut">
          <i class="fas fa-power-off"></i> Logout
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// import Popup from "../../vuesrc/helper/ConfirmHelper";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      userdetails: [],
    };
  },
  computed: {
    ...mapGetters({
      user: "getSession",
      label: "getRoute",
    }),
  },
  watch: {},

  async created() {},

  methods: {
    refreshPage() {
      window.location.reload();
    },

    logoutMeOut() {
      this.$swal.preConfirm({
        title: `About to Logout`,
        text: `Are you sure you want to logout? Your session and information will remove to this device.`,
        icon: "warning",
        preConfirm: () => {
          let vm = this;
          return new Promise((resolve, reject) => {
            localStorage.clear();
            setTimeout(() => {
              vm.$router.push({
                name: "login",
              });
              resolve(true);
            }, 1000);
          });
        },
      });
    },

    myProfile() {
      this.$router.push({ name: "My Profile" }).catch((err) => {});
    },

    goToDashboard() {
      this.$router.push({ name: "Dashboard" }).catch((err) => {});
    },
  },
};
</script>

<style scoped>
.black-text {
  color: #fff;
}
.nav-item .nav-link.btn-logout {
  background: #e04646;
  color: white;
  border: 1px solid transparent;
  padding: 6px 15px;
}
.nav-item .nav-link.btn-logout:hover {
  background: transparent;
  color: #e04646;
  border: 1px solid #e04646;
}
</style>
