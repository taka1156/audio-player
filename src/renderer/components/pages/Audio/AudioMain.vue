<template>
  <div class="AudioMain">
    <div id="drag" class="audio" @drop.prevent="fileChange">
      <!--ファイルの登録-->
      <label class="fileinput"
        >こちらをクリックまたは、ファイルドラッグで音楽ファイルを入れてください。
        <input type="file" class="fileinput__none" @change="fileChange" multiple />
      </label>
    </div>
    <div v-if="!isLoaded" class="spinner"></div>
    <div v-else>
      <!--再生中の曲の情報-->
      <audio-display />
      <audio-controller />
    </div>
  </div>
</template>

<script>
import AudioDisplay from './parts/AudioDisplay'
import AudioController from './parts/AudioController'

export default {
  name: 'AudioMain',
  components: {
    'audio-display': AudioDisplay,
    'audio-controller': AudioController
  },
  computed: {
    isLoaded () {
      return this.$store.getters.isLoaded
    }
  },
  mounted () {
    // デフォルトのドラッグの挙動を無効化(ファイルのプレビュー無効化)
    document.ondragover = document.ondrop = function (e) {
      e.preventDefault()
    }
  },
  methods: {
    fileChange (e) {
      const FILES = e.target.files || e.dataTransfer.files
      if (!FILES.length) {
        return
      }
      for (let i = 0, max = FILES.length; i < max; i++) {
        this.$store.dispatch('loadFile', FILES[i])
      }
      // 初回読み込みに時間がかかるため実行タイミングを少しずらす
      if (!this.isLoaded) {
        const delay = setTimeout(() => {
          this.$store.dispatch('musicData')
          this.$store.dispatch('init')
          clearTimeout(delay)
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.audio {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 70%;
  margin: 8px auto;
  width: 90%;
  height: 230px;
  border: solid 0.5px white;
}

/* ファイルの取り込み */
.fileinput {
  display: block;
  margin: 8px auto;
  height: 22px;
  width: 90%;
  background-color: gray;
  font-size: 8px;
}

.fileinput__none {
  display: none;
}

/* 待機時のスピナー表示　*/
.spinner {
  width: 100px;
  height: 100px;
  margin: 60vh auto;
  border-radius: 100%;
  background-color: white;
  animation: spinner-anime 2s infinite;
}

@keyframes spinner-anime {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
