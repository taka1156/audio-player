<template>
  <div class="Favo">
    <div class="center">
      <h4>取り込んだ曲</h4>
      <div class="border" />
      <div class="list">
        <div v-for="(music, index) in playList" :key="index">
          <div class="list-item" @click="changeIndex(index)">{{ music.name.replace(/(.mp3|.m4a|.wav)/i, '') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Favo',
  computed: {
    isPlay () {
      return this.$store.getters.isPlay
    },
    playList () {
      return this.$store.getters.playList
    }
  },
  methods: {
    changeIndex (index) {
      if (this.isPlay) {
        this.$store.dispatch('stop')
      }
      this.$store.dispatch('changeIndex', index)
      this.$router.push('./music')
    }
  }
}
</script>

<style scoped>
.center {
  margin: 0 auto;
  height: 87vh;
  width: 95%;
  border: solid 1px white;
}

.border {
  width: 100%;
  border: solid 0.4px white;
}

.list {
  height: 82%;
  width: 98%;
  margin: 0 auto;
  overflow-y: scroll;
}

.list-item {
  cursor: pointer;
  margin: 10px auto;
}
</style>
