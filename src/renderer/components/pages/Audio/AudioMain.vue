<template>
  <div class="AudioMain">
    <!--情報の表示-->
    <div class="audio-info">
        track{{ audioIndex + 1 }}/{{ playList.length }}
        <div class="music-info">
            <p>{{ musicTitle }}</p>
            <p>{{ formatTime }}/{{ formatEndTime }}</p>
        </div>
    </div>
　　<!--トラック、再生位置、再生、停止の制御-->
    <div class="audio-controller">
      <div class="seek-bar">
        <input
          type="range"
          v-model="musicTime"
          class="custom-range"
          min="0"
          :max="musicEndTime"
          step="1"
        />
      </div>
      <div class="track-controller">
        <button class="audio-btn" @click="prev">&lt;</button>
        <button class="audio-btn" v-if="!status" @click="startMusic">
          ▷
        </button>
        <button class="audio-btn " v-else @click="stopMusic">
          ||
        </button>
        <button class="audio-btn" @click="next">&gt;</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AudioMain',
  data () {
    return {
      time: null,
      audioIndex: 0,
      status: false,
      // ダミー
      playList: [
        {title: 'Hello Electron', endTime: 180},
        {title: 'Hello Vue', endTime: 200},
        {title: 'Hello End', endTime: 320}
      ],
      musicTime: 0, // 現在の進行度
      formatEndTime: '',
      formatTime: ''
    }
  },
  created () {
    this.init()
  },
  watch: {
    // 停止中でもシークバーの値を反映させる
    musicTime () {
      this.formatTime = this.format(this.musicTime)
    }
  },
  computed: {
    musicEndTime () {
      return this.playList[this.audioIndex].endTime
    },
    musicTitle () {
      return this.playList[this.audioIndex].title
    }
  },
  methods: {
    init () {
      // 初期化
      this.stopMusic()
      this.musicTime = 0
      this.formatTime = this.format(this.musicTime)
      // 曲の終わり時間の代入
      this.formatEndTime = this.format(this.musicEndTime)
    },
    next () {
      this.audioIndex++
      if (this.audioIndex === this.playList.length) {
        this.audioIndex = 0
      }
      this.init()
    },
    prev () {
      this.audioIndex--
      if (this.audioIndex === -1) {
        this.audioIndex = this.playList.length - 1
      }
      this.init()
    },
    startMusic () {
      this.status = true
      // 現在の曲の進行
      this.time = setInterval(() => {
        this.musicTime++
        this.formatTime = this.format(this.musicTime)
        if (this.musicTime === this.musicEndTime) this.stopMusic()
      }, 1000)
    },
    stopMusic () {
      this.status = false
      clearInterval(this.time)
    },
    // 時間をフォーマット
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
.music-info {
  line-height: 3px;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: cornflowerblue;
}

.audio-controller,
.audio-info {
  text-align: center;
}

.seek-bar,
.track-controller {
  display: block;
}

.audio-btn {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: gray;
  font-size: 20px;
}
</style>
