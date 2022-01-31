<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>Oops!</h1>
        <h2>404 - The Page can't be found</h2>
      </div>
      <a href="#" @click.prevent="$router.go(-1)">Go back</a>
    </div>
  </div>
</template>

<style scoped>
#notfound {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.notfound {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
</style>
