<template>
  <AttendanceRecords :student_id="student_id" />
</template>

<script>
export default {
  data: () => ({}),

  watch: {},

  computed: {
    student_id() {
      return this.$route.params.student_id || null;
    },
  },

  mounted() {
    this.initApp();
  },

  methods: {
    initApp() {
      if (!this.student_id) {
        this.$router.push({
          name: "verify-id",
        });
      }
    },
  },
};
</script>
