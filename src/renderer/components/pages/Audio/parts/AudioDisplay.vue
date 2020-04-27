<template>
  <div class="AudoDisplay">
    <!--情報の表示-->
    <div class="info">
      <div class="info__music">
        <p class="info__music--text">
          track[{{ index + 1 }}/{{ playlistLength }}]
        </p>
        <div v-if="status">
          <p class="info__music--text">title: {{ musicInfo.title }}</p>
          <p class="iinfo__music--text">artist: {{ musicInfo.artist }}</p>
          <img :src="musicInfo.picture" class="info__music--artwork" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioDisplay',
  computed: {
    status () {
      return this.$store.getters.status
    },
    index () {
      return this.$store.getters.index
    },
    playlistLength () {
      return this.$store.getters.playlistLength
    },
    musicInfo () {
      return this.$store.getters.musicInfo
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
