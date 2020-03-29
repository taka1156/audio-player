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
      <div class="controller">
        <!--ループやシャッフルの制御-->
        <div>
          <button @click="loop" class="controller__btn">
            <img src="@/assets/ui-icon/loop.svg" class="controller__btn--icon" />
          </button>
          <button class="controller__btn">
            <img src="@/assets/ui-icon/shuffle.svg" class="controller__btn--icon" />
          </button>
        </div>
        <!--再生位置-->
        <div class="controller__seek">
          <div class="controller__seek--info">
            <ruby>{{ format(preSeekTime) }}</ruby>
            <ruby>{{ format(seekEndTime) }}</ruby>
          </div>
          <input type="range" v-model="seekTime" min="1" :max="seekEndTime" step="1" />
        </div>
        <!--トラックを戻す-->
        <button class="controller__btn" @click="prev">
          <img src="@/assets/ui-icon/prev.svg" class="controller__btn--track" />
        </button>
        <!--再生-->
        <button class="controller__btn controller__btn--play" v-show="!isPlay" @click="start">
          <img src="@/assets/ui-icon/play.svg" class="controller__btn--track" />
        </button>
        <!--停止-->
        <button class="controller__btn controller__btn--stop" v-show="isPlay" @click="stop">
          <img src="@/assets/ui-icon/stop.svg" class="controller__btn--track" />
        </button>
        <!--トラックを進める-->
        <button class="controller__btn" @click="next">
          <img src="@/assets/ui-icon/next.svg" class="controller__btn--track" />
        </button>
        <!--音量調節-->
        <div class="controller__seek">
          <img src="@/assets/ui-icon/volume.svg" class="controller__seek--icon" />
          <input type="range" v-model="volume" min="0" :max="1" step="0.1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AudioDisplay from './parts/AudioDisplay'

export default {
  name: 'AudioMain',
  components: {
    'audio-display': AudioDisplay
  },
  data () {
    return {
      playList: [], // 登録したファイル一覧
      seekTime: 0, // 現在のシークバーの現在位置(再生位置)
      volume: 1
    }
  },
  watch: {
    seekTime () {
      // ユーザが操作した時のみ適用(再生時間の視覚表示にも使ってるためjs側からの操作を弾く必要がある)
      if (this.preSeekTime !== this.seekTime) {
        this.$store.dispatch('controlSeek', this.seekTime)
      }
    },
    volume () {
      if (this.preVolume !== this.seekTime) {
        this.$store.dispatch('controlVolme', this.volume)
      }
    }
  },
  computed: {
    isLoaded () {
      return this.$store.getters.isLoaded
    },
    isPlay () {
      return this.$store.getters.isPlay
    },
    preSeekTime () {
      this.seekTime = this.$store.getters.seekTime
      return this.$store.getters.seekTime
    },
    seekEndTime () {
      return this.$store.getters.seekEndTime
    },
    preVolume () {
      this.volume = this.$store.getters.volume
      return this.$store.getters.volume
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
          this.init()
          clearTimeout(delay)
        }, 1000)
      }
    },
    init () {
      // 初期化(再生途中で次のトラックに進む可能性)
      if (this.isPlay) this.stop()
      this.$store.dispatch('init')
    },
    next () {
      this.$store.dispatch('next')
      this.init()
    },
    prev () {
      this.$store.dispatch('prev')
      this.init()
    },
    start () {
      this.$store.dispatch('start')
    },
    stop () {
      this.$store.dispatch('stop')
    },
    loop () {
      this.$store.dispatch('loop')
    },
    format (seconds) {
      const minute = seconds !== 0 ? Math.floor(seconds / 60) : 0
      const second = seconds !== 0 ? seconds - minute * 60 : 0
      const formatMinute = minute < 10 ? `0${minute}` : `${minute}`
      const formatSecond = second < 10 ? `0${second}` : `${second}`
      return `${formatMinute}:${formatSecond}`
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
  bottom: 50%;
  margin: 8px auto;
  width: 90%;
  border: dotted 0.5px black;
}

/* ファイルの取り込み */
.fileinput {
  display: block;
  margin: 8px auto;
  width: 90%;
  background-color: gray;
  font-size: 10px;
}

.fileinput__none {
  display: none;
}

/* 待機時のスピナー表示　*/
.spinner {
  width: 100px;
  height: 100px;
  margin: 55vh auto;
  border-radius: 100%;
  background-color: cornflowerblue;
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

/* オーディオ プレイヤーのコントローラー　*/
.controller {
  text-align: center;
  margin: 10px auto;
  height: 130px;
  width: 95%;
  border: solid 1px gray;
}

.controller__seek {
  text-align: center;
}

.controller__seek--info {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.controller__seek--info ruby {
  line-height: 0px;
  font-size: 13px;
}

.controller__seek--icon {
  width: 15px;
  height: 15px;
}

input[type='range'] {
  width: 70%;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: cornflowerblue;
}

.controller__btn {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.controller__btn--track {
  height: 55px;
  width: 55px;
}

.controller__btn--icon {
  height: 15px;
  width: 15px;
}
</style>
