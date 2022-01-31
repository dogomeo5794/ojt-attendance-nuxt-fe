<template>
  <span :class="`btn btn-${size} btn-default`" v-if="loadingState"
    style="pointer-events: none;border: none;"
  >
    <i class="fas fa-spinner fa-pulse"></i> {{ label }}
  </span>
</template>

<script>
export default {
  data() {
    return {
      loadingState: false,
      loadingSize: 'small',
    };
  },

  props: ["isLoading", "size", "label"],

  watch: {
    isLoading: {
      handler: function(newVal) {
        this.loadingState = newVal||false;
      },
      immediate: true,
    },
    size: {
      handler: function(newVal) {
        this.loadingSize = {
          'medium': 'md',
          'small': 'sm',
          'large': 'lg'
        }[newVal]||"md";
      },
      immediate: true,
    },
  },

  created() {},

  methods: {},

  mounted() {},
};
</script>

<style scoped>

</style>
