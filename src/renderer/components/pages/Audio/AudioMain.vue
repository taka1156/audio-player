<template>
  <div class="AudioMain">
    <input type="file" @change="fileChange" multiple />
    <!--情報の表示-->
    <div v-if="isfiles">
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
            v-model="seekTime"
            class="custom-range"
            min="0"
            :max="seekEndTime"
            step="1"
          />
        </div>
        <div class="track-controller">
          <button class="audio-btn" @click="prev">&lt;</button>
          <button class="audio-btn" v-if="!isPlay" @click="startMusic">
            ▷
          </button>
          <button class="audio-btn " v-else @click="stopMusic">
            ||
          </button>
          <button class="audio-btn" @click="next">&gt;</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AudioMain',
  data () {
    return {
      audioIndex: 0, // プレイリストの添え字
      isfiles: false, // ファイルが登録されたか
      isPlay: false, // 再生状態の確認
      music: null, // Audioインスタンス
      musicTitle: '',
      playList: [], // 登録したファイル一覧
      formatTime: '', // 現在の再生時間
      formatEndTime: '', // 曲の総時間
      seekEndTime: 0, // シークバーの最大値
      seekTime: 0 // 現在のシークバーの現在位置(再生位置)
    }
  },
  watch: {
    seekTime () {
      // ユーザが操作した時のみ適用(再生時間の視覚表示にも使ってるためjs側からの操作を弾く必要がある)
      if (Math.floor(this.music.currentTime) !== this.seekTime) {
        this.music.currentTime = this.seekTime
      }
    }
  },
  methods: {
    fileChange (e) {
      this.isfiles = false
      const FILES = e.target.files || e.dataTransfer.files
      if (!FILES.length) {
        return
      }
      for (let i = 0, max = FILES.length; i < max; i++) {
        this.read(FILES[i])
      }
      this.isfiles = true
      this.init()
    },
    init () {
      // 初期化
      if (this.isPlay) this.stopMusic()
      // シークバーの初期化
      this.seekTime = 0
      // 現在の再生時間を初期化
      this.formatTime = this.format(0)
      this.musicTitle = this.playList[this.audioIndex].name
      // 曲のあるパスをセット
      this.music = new Audio(this.playList[this.audioIndex].song)
      // 曲の終わり時間の代入
      this.music.addEventListener('loadedmetadata', () => {
        this.seekEndTime = Math.floor(this.music.duration)
        this.formatEndTime = this.format(this.seekEndTime)
      })
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
      this.isPlay = true
      this.music.play()
      // 再生時間の取得
      // 再生中
      this.music.addEventListener('timeupdate', () => {
        this.seekTime = Math.floor(this.music.currentTime)
        this.formatTime = this.format(this.seekTime)
      })
      // 曲の終了
      this.music.addEventListener('ended', () => {
        this.music.currentTime = 0
        this.stopMusic()
      })
    },
    stopMusic () {
      this.isPlay = false
      this.music.pause()
    },
    async read (file) {
      let reader = new FileReader()
      reader.onload = () => {
        this.playList.push({name: file.name, song: reader.result})
      }
      await reader.readAsDataURL(file)
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
  color: ghostwhite;
  font-size: 20px;
}
</style>
