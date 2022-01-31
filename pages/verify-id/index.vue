<template>
  <AttendanceScanID :callbackResult="result" />
</template>

<script>
export default {
  data: () => ({}),

  watch: {},

  computed: {},

  mounted() {},

  methods: {
    result(resp) {
      console.log("result", resp);
      this.$router.push({
        name: "my-attendance",
        params: {
          student_id: resp,
        },
        query: {
          rid: Math.random().toString(36).substring(2),
        },
      });
    },
  },
};
</script>
