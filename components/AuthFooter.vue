<template>
  <footer class="footer footer-transparent">
    <div class="container">
      <div class="copyright">
        &copy;
        Telcom Live Content Inc.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    getFullYear() {
      return new Date().getFullYear();
    },
  },
  methods: {},
};
</script>
