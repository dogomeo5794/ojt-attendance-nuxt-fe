<template>
  <div class="wrapper">
    <UtilityAuthenticatedTopnav />
    <UtilityAuthenticatedSidenav />
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>{{ getTitle }}</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">General Form</li>
              </ol>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <section class="content">
        <div class="container-fluid">
          <!-- <router-view></router-view> -->
          <Nuxt />
        </div>
      </section>
    </div>
    <UtilityAuthenticatedFooter />
  </div>
</template>

<script>
export default {
  middleware: ["auth", "role"],
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
    // document.body.classList.remove('hold-transition','login-page');
    document.body.classList.add(
      "sidebar-mini",
      "layout-navbar-fixed",
      "layout-fixed",
      "accent-primary"
    );
  },
};
</script>
