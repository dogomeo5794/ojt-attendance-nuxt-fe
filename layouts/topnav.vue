<template>
  <div class="wrapper">
    <nav class="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div class="container">
        <span class="navbar-brand">
          <img
            src="/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style="opacity: 0.8"
          />
          <span class="brand-text font-weight-light">
            {{ getTitle }}
          </span>
        </span>
      </div>
    </nav>
    <div class="content-wrapper">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["unauth"],
  name: "dashboard-layout",
  props: [],

  computed: {
    getTitle() {
      let titleList = {
        "my-attendance": "Attendance Records",
      };
      let name = this.$route.name?.toLowerCase() || "";
      return titleList[name] || "Authorized Personnel Registration";
    },
  },

  mounted() {
    // document.body.classList.remove('hold-transition','login-page');
    // document.body.classList.add('sidebar-mini','layout-navbar-fixed','layout-fixed','text-sm','accent-primary');
  },

  beforeMount() {
    document.body.style = "";
    document.body.className = "";
    document.body.classList.add("hold-transition", "layout-top-nav");
    $(document).ready(function () {
      $(`[data-card-widget="card-refresh"]`).each(function () {
        CardRefresh._jQueryInterface.call($(this));
      });
    });
  },

  beforeDestroy() {
    document.body.className = "";
  },
};
</script>
