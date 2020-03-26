<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'audio-player'
  }
</script>

<style>
  body {
    background-color: rgba(235, 235, 235, 0.7);
    color: #fff;
    -webkit-app-region: drag;
    -webkit-user-select: none;
  }
</style>
