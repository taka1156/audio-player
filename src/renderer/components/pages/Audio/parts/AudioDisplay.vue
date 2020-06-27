<template>
  <div class="AudoDisplay">
    <!--情報の表示-->
    <div class="info">
      <div class="info__music">
        <p class="info__music--text">
          track[{{ trackInfo.now + 1 }}/{{ trackInfo.max }}]
        </p>
        <div v-if="isLoaded">
          <p class="info__music--text">title: {{ playedSong.title }}</p>
          <p class="iinfo__music--text">artist: {{ playedSong.artist }}</p>
          <img :src="playedSong.picture" class="info__music--artwork" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioDisplay',
  computed: {
    isLoaded () {
      return this.$store.getters.isLoaded
    },
    trackInfo () {
      return this.$store.getters.trackInfo
    },
    playedSong () {
      return this.$store.getters.playedSong
    }
  }
}
</script>

<style scoped>
/* 再生中の曲に関する情報　*/
.info {
  height: 200px;
  width: 90%;
  margin: 5px auto;
  text-align: center;
}

.info__music {
  margin: 15px auto;
  line-height: 8px;
}

.info__music--text {
  word-wrap: break-word;
  font-size: 13px;
}

.info__music--artwork {
  height: 50%;
  width: 50%;
}

.info__music--icon {
  height: 15px;
  width: 15px;
}
</style>
