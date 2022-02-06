<template>
  <AuthPersonnelDashboard />
</template>

<script>
export default {
  meta: {
    role: "authorized-personnel",
  },
  data: () => ({}),

  watch: {},

  computed: {},

  mounted() {
    this.$router.push({
      name: "personnel-students",
    });
  },

  methods: {},
};
</script>
