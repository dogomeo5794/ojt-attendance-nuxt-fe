<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-minimize">
        <button
          id="minimizeSidebar"
          class="btn btn-round btn-white btn-fill btn-just-icon"
          @click.prevent="minimizeSideBar"
        >
          <i class="material-icons visible-on-sidebar-regular">more_vert</i>
          <i class="material-icons visible-on-sidebar-mini">view_list</i>
        </button>

        <button
          id="minimizeSidebar"
          @click="toggleSidebar()"
          class="btn btn-fill btn-icon"
        >
          <i class="ti-more-alt"></i>
        </button>
      </div>
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" @click="toggleSidebar()">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand" href="#regularforms">DASHBOARD</a>
      </div>
      <div class="collapse navbar-collapse">
        <!-- <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#" @click.prevent="logout()">
              <p>Log Out</p>
            </a>
          </li>
        </ul> -->
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      sidebar_mini_active: false,
    };
  },

  computed: {
    ...mapGetters({
      user: "getSession",
      headcrumps: "getRoute",
    }),
  },

  watch: {},

  methods: {
    logout() {
      this.$_swal
        .fire({
          title: "About to Logout",
          text: "Are you sure to logout? All session will reset.",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#dc3545",
          cancelButtonColor: "grey",
          confirmButtonText: "Logout",
        })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            this.$router.push({ path: "/login" });
          }
        });
    },
    goBack() {
      this.minimizeSideBar();
      this.$router.push({ name: "Dashboard" });
    },

    toggleSidebar() {
      $("body").toggleClass("sidebar-mini");
    },
  },

  created() {
    if ($("body").hasClass("sidebar-mini")) {
      this.sidebar_mini_active = false;
    }
  },
};
</script>
