<template>
  <div class="login-box">
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: ["unauth"],
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

  watch: {
    $route() {
      this.initApp();
    },
  },

  methods: {
    initApp() {
      document.body.className = "";
      document.body.classList.add("hold-transition", "login-page");
    },
  },

  beforeMount() {
    this.initApp();
  },

  beforeDestroy() {
    document.body.className = "";
  },
};
</script>
