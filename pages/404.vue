<template>
  <div class="ndf-main">
    <div class="ndf-body">
      <img
        src="/img/icons/files-icon.jpg"
        alt=""
        style="width: 200px; opacity: 0.5; margin: 30px"
      />
      <span class="ndf-title">No Matching items found.</span>
      <span class="ndf-subtitle">Please double check your request</span>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data: () => ({}),

  props: [],

  watch: {},

  computed: {},

  methods: {},

  mounted() {},
};
</script>

<style scoped>
.ndf-main {
  width: 100%;
  opacity: 0.5;
}
.ndf-body {
  position: relative;
  text-align: center;
}
.ndf-icon {
  display: block;
  font-size: 5rem;
  opacity: 0.3;
}
.ndf-title {
  display: block;
  font-size: 30px;
  font-weight: bold;
  color: #585353;
}
.ndf-subtitle {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: #585555;
}
</style>
