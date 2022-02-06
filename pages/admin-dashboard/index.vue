<template>
  <AdminDashboard />
</template>

<script>
export default {
  meta: {
    role: "admin",
  },
  data: () => ({}),

  watch: {},

  computed: {},

  mounted() {
    this.$router.push({
      name: "admin-dashboard-students",
    });
  },

  methods: {},
};
</script>
</script>
