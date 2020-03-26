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
    background-color: rgba(169, 169, 169, 0.8);
    color: #fff;
    -webkit-app-region: drag;
    -webkit-user-select: none;
  }
</style>
