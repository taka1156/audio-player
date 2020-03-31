<template>
  <div class="AudoDisplay">
    <!--情報の表示-->
    <div class="info">
      <div class="info__music">
        track[{{ index + 1 }}/{{ playlistLength }}]
        <div v-if="status">
          <p class="info__music--title">title: {{ musicInfo.title }}</p>
          <p class="info__music--title">artist: {{ musicInfo.artist }}</p>
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
  height: 220px;
  width: 90%;
  margin: 5px auto;
  text-align: center;
  border: dotted 1px black;
}

.info__music {
  margin: 28px auto;
  line-height: 8px;
}

.info__music--title {
  word-wrap: break-word;
  font-size: 14px;
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
