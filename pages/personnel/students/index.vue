<template>
  <StudentsList />
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
    console.log("route personnel student list", this.$route);
  },

  methods: {},
};
</script>
