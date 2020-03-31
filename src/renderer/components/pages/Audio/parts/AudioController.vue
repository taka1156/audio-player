<template>
  <div class="AudioController">
    <div class="controller">
      <!--ループやシャッフルの制御-->
      <button @click="loop" class="controller__btn">
        <img v-show="!isLoop" src="@/assets/ui-icon/loop.svg" class="controller__icon--sm" />
        <img v-show="isLoop" src="@/assets/ui-icon/loop-true.svg" class="controller__icon--sm" />
      </button>
      <button class="controller__btn">
        <img src="@/assets/ui-icon/shuffle.svg" class="controller__icon--sm" />
      </button>
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
        <img src="@/assets/ui-icon/prev.svg" class="controller__icon--lg" />
      </button>
      <!--再生-->
      <button class="controller__btn" v-show="!isPlay" @click="start">
        <img src="@/assets/ui-icon/play.svg" class="controller__icon--lg" />
      </button>
      <!--停止-->
      <button class="controller__btn" v-show="isPlay" @click="stop">
        <img src="@/assets/ui-icon/stop.svg" class="controller__icon--lg" />
      </button>
      <!--トラックを進める-->
      <button class="controller__btn" @click="next">
        <img src="@/assets/ui-icon/next.svg" class="controller__icon--lg" />
      </button>
      <!--音量調節-->
      <div class="controller__seek">
        <img src="@/assets/ui-icon/volume.svg" class="controller__seek--icon" />
        <input type="range" v-model="volume" min="0" :max="1" step="0.01" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioController',
  data () {
    return {
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
      if (this.preVolume !== this.volume) {
        this.$store.dispatch('controlVolme', this.volume)
      }
    }
  },
  computed: {
    isPlay () {
      return this.$store.getters.isPlay
    },
    isLoop () {
      return this.$store.getters.isLoop
    },
    preSeekTime () {
      this.seekTime = this.$store.getters.preSeekTime
      return this.$store.getters.preSeekTime
    },
    seekEndTime () {
      return this.$store.getters.seekEndTime
    }
  },
  mounted () {
    this.volume = this.$store.getters.preVolume
  },
  methods: {
    init () {
      // 初期化(再生途中で次のトラックに進む可能性)
      if (this.isPlay) this.stop()
      this.$store.dispatch('init')
      this.$store.dispatch('musicData')
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
/* オーディオ プレイヤーのコントローラー　*/
.controller {
  text-align: center;
  margin: 10px auto;
  height: 140px;
  width: 95%;
  border: groove 1px white;
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

.controller__btn {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.controller__icon--lg {
  height: 55px;
  width: 55px;
}

.controller__icon--sm {
  height: 15px;
  width: 15px;
}
</style>
