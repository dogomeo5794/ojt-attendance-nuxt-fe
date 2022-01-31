<template>
  <div class="hold-transition layout-top-nav">
    <div class="wrapper">
      <nav
        class="main-header navbar navbar-expand-md navbar-light navbar-white"
      >
        <div class="container">
          <span class="navbar-brand">
            <img
              src="/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              class="brand-image img-circle elevation-3"
              style="opacity: 0.8"
            />
            <span class="brand-text font-weight-light">
              Authorized Personnel Registration
            </span>
          </span>
        </div>
      </nav>
      <div class="content-wrapper">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dashboard-layout",
  props: [],

  computed: {
    getTitle() {
      return this.$route?.meta?.label || "";
    },
  },

  mounted() {
    // document.body.classList.remove('hold-transition','login-page');
    // document.body.classList.add('sidebar-mini','layout-navbar-fixed','layout-fixed','text-sm','accent-primary');
  },

  beforeMount() {
    document.body.className = "";
    document.body.classList.add("hold-transition", "layout-top-nav");
  },

  beforeDestroy() {
    document.body.className = "";
  },
};
</script>
