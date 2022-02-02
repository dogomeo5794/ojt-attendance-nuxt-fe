<template>
  <aside class="main-sidebar elevation-4 sidebar-dark-indigo" v-if="!isLoading">
    <a href="#" class="brand-link navbar-dark" title="Click to view profile">
      <img
        src="/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light" title="E-Attendance for OJT">
        EA-OJT
      </span>
    </a>

    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="/img/icons/avatar.jpg"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ getUserName }}</a>
        </div>
      </div>

      <nav class="mt-2" id="list-nav">
        <ul
          class="nav nav-pills nav-sidebar flex-column nav-child-indent nav-flat"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li
            v-for="(item, key) in getSidebarList"
            :key="key"
            :class="`${
              item.isHeader === true
                ? 'nav-header'
                : item.children !== undefined
                ? 'nav-item has-treeview'
                : 'nav-item'
            }`"
          >
            {{ item.isHeader === true ? item.label : "" }}
            <a
              href="#"
              :class="`nav-link`"
              v-if="!item.isHeader && item.children !== undefined"
            >
              <i :class="`nav-icon ${item.icon}`"></i>
              <p>{{ item.label }} <i class="right fas fa-angle-left"></i></p>
            </a>

            <ul
              class="nav nav-treeview"
              v-if="!item.isHeader && item.children !== undefined"
            >
              <li class="nav-item" v-for="(i, k) in item.children" :key="k">
                <router-link
                  :to="{ name: i.routeName, params: i.params || {} }"
                  tag="a"
                  exact
                  class="nav-link"
                >
                  <i :class="`nav-icon ${i.icon}`"></i>
                  <p>{{ i.label }}</p>
                </router-link>
              </li>
            </ul>

            <router-link
              :to="{
                name: item.routeName,
                params: { personnel_id: getPersonnelID },
              }"
              tag="a"
              exact
              class="nav-link"
              v-if="!item.isHeader && item.children === undefined"
            >
              <i :class="`nav-icon ${item.icon}`"></i>
              <p>{{ item.label }}</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  data: () => ({
    title: "EA-OJT",
    isLoading: false,
    adminSidenavLinks: [
      {
        isHeader: true,
        label: "Dashboard",
      },
      {
        isHeader: false,
        label: "Dashboard",
        icon: "fas fa-tachometer-alt",
        routeName: "admin-dashboard",
        routePath: "/",
      },
      {
        isHeader: true,
        label: "Main App",
      },
      {
        isHeader: false,
        label: "Student List",
        icon: "fas fa-user-graduate",
        routeName: "admin-dashboard-students",
        routePath: "/admin-dashboard/students",
      },
      {
        isHeader: false,
        label: "Add Student",
        icon: "fas fa-user-plus",
        routeName: "admin-dashboard-students-create",
        routePath: "/admin-dashboard/students/create",
      },
      {
        isHeader: false,
        label: "Auth. Person List",
        icon: "fas fa-user-tie",
        routeName: "admin-dashboard-personnels",
        routePath: "/admin-dashboard/personnels",
      },
      {
        isHeader: true,
        label: "Reports",
      },
      {
        isHeader: false,
        label: "Generate Reports",
        icon: "fas fa-file-excel",
        routeName: "",
        routePath: "",
      },
    ],
    personnelSidenavLinks: [
      {
        isHeader: true,
        label: "Dashboard",
      },
      {
        isHeader: false,
        label: "Dashboard",
        icon: "fas fa-tachometer-alt",
        routeName: "personnel",
        routePath: "/personnel",
      },
      {
        isHeader: true,
        label: "Main App",
      },
      {
        isHeader: false,
        label: "Student List",
        icon: "fas fa-file-medical-alt",
        routeName: "personnel-students",
        routePath: "/personnel/students",
      },
      {
        isHeader: false,
        label: "Check Attendance",
        icon: "fas fa-qrcode",
        routeName: "check-attendance",
        routePath: "/check-attendance",
      },
      {
        isHeader: true,
        label: "Reports",
      },
      {
        isHeader: false,
        label: "Generate Reports",
        icon: "fas fa-file-excel",
        routeName: "",
        routePath: "",
      },
    ],
  }),

  mounted() {},

  computed: {
    user() {
      return this.$store.state.user;
    },
    account() {
      return this.$store.state.userAccount;
    },
    getPersonnelID() {
      return this.user?.company_id || null;
    },
    getUserName() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },

    getUserType() {
      return this.account?.user_type?.toLowerCase() || null;
    },

    subIsActive() {
      return (input) => {
        const paths = Array.isArray(input) ? input : [input];
        return paths.some((path) => {
          return this.$route.name === path;
        });
      };
    },

    getSidebarList() {
      if (this.getUserType === "authorized-personnel") {
        return this.personnelSidenavLinks;
      } else if (this.getUserType === "admin") {
        return this.adminSidenavLinks;
      } else {
        return [];
      }
    },
  },

  methods: {
    checkModule(id) {
      if (this.session.is_password_changed == 0) {
        return true;
      } else {
        return this.session.modules.includes(id) ? true : false;
      }
    },

    goToDashboard() {
      // this.$router.push({ name: "Home" }).catch(err => {});
    },
  },
};
</script>

<style scoped>
.custom_head_navbar {
  margin-left: -17px;
  font-weight: bold;
  font-size: 22px;
}

.navbar-toggler {
  margin-left: -5px;
  padding-left: 0 !important;
}
</style>
