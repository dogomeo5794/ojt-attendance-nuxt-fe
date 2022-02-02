<template>
  <AdminStudentsInfo :student_id="student_id" v-if="is_loading === false" />
</template>

<script>
export default {
  meta: {
    role: "admin",
  },
  data: () => ({
    is_loading: null,
    student_id: null,
  }),

  watch: {},

  computed: {},

  mounted() {
    this.initApp();
  },

  methods: {
    initApp() {
      this.is_loading = true;
      this.student_id = this.$route.params.student_id || null;
      this.$nextTick(() => {
        this.is_loading = false;
      });
    },
  },
};
</script>
