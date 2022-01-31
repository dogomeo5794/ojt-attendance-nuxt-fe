<template>
  <nav class="navbar navbar-transparent navbar-absolute">
    <div class="container">
      <div class="navbar-header">
        <button
          type="button"
          :class="`navbar-toggle ${
            getRouteName === 'register' ? 'navbar-toggle-black' : ''
          }`"
          data-toggle="collapse"
          data-target="#navigation-example-2"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li v-if="getRouteName !== 'login'">
            <a href="/login" class="btn"> Login</a>
          </li>
          <li v-if="getRouteName !== 'register'">
            <a href="/register"> Register </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    getRouteName() {
      return this.$route.name || null;
    },
  },
  mounted() {
    console.log("getRouteName", this.getRouteName);
  },
  methods: {},
};
</script>

<style scoped></style>
