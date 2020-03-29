<template>
  <div class="AudoDisplay">
    <!--情報の表示-->
    <div class="info">
      track[{{ index + 1 }}/{{ playlistLength }}]
      <div class="info__music">
        <p class="info__music--title">{{ title }}</p>
        <img v-show="isLoop" src="@/assets/ui-icon/loop.svg" class="info__music--icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioDisplay',
  computed: {
    title () {
      return this.$store.getters.title
    },
    isLoop () {
      return this.$store.getters.isLoop
    },
    index () {
      return this.$store.getters.index
    },
    playlistLength () {
      return this.$store.getters.playlistLength
    }
  }
}
</script>

<style scoped>
/* 再生中の曲に関する情報　*/
.info {
  height: 155px;
  width: 90%;
  margin: 5px auto;
  text-align: center;
  border: solid 1px black;
}

.info__music {
  margin: 50px auto;
  line-height: 10px;
}

.info__music--title {
  word-wrap: break-word;
}

.info__music--icon {
  height: 15px;
  width: 15px;
}
</style>
