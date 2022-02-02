<template>
  <AdminPersonnelsInfo
    :personnel_id="personnel_id"
    v-if="is_loading === false"
  />
</template>

<script>
export default {
  meta: {
    role: "admin",
  },
  data: () => ({
    is_loading: null,
    personnel_id: null,
  }),

  watch: {},

  computed: {},

  mounted() {
    this.initApp();
  },

  methods: {
    initApp() {
      this.is_loading = true;
      this.personnel_id = this.$route.params.personnel_id || null;
      this.$nextTick(() => {
        this.is_loading = false;
      });
    },
  },
};
</script>
