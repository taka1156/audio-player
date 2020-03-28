<template>
  <div class="AudioMain">
    <!--ファイルの登録-->
    <input type="file" @change="fileChange" multiple />
    <!--情報の表示-->
    <div v-if="!isLoaded" class="spinner"></div>
    <div v-else>
      <div class="info">
        track[{{ index + 1 }}/{{ playList.length }}]
        <div class="info__music">
          <p class="info__music--title">{{ title }}</p>
          <p>{{ format(seekTime) }}/{{ format(seekEndTime) }}</p>
        </div>
      </div>
      <!--トラック、再生位置、再生、停止の制御-->
      <div class="controller">
        <div class="controller__seek">
          <input type="range" v-model="seekTime" min="1" :max="seekEndTime" step="1" />
        </div>
        <button class="controller__btn" @click="prev">&lt;</button>
        <button class="controller__btn controller__btn--play" v-show="!isPlay" @click="start">
          ▶︎
        </button>
        <button class="controller__btn controller__btn--stop" v-show="isPlay" @click="stop">
          ||
        </button>
        <button class="controller__btn" @click="next">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioMain',
  data () {
    return {
      index: 0, // プレイリストの添え字
      isLoaded: false, // ファイルが登録されたか
      isPlay: false, // 再生状態の確認
      audio: new Audio(), // Audioインスタンス
      title: '', // ファイル名(タイトル)
      playList: [], // 登録したファイル一覧
      seekTime: 0, // 現在のシークバーの現在位置(再生位置)
      seekEndTime: 0 // シークバーの最大値
    }
  },
  watch: {
    seekTime () {
      // ユーザが操作した時のみ適用(再生時間の視覚表示にも使ってるためjs側からの操作を弾く必要がある)
      if (Math.floor(this.audio.currentTime) !== this.seekTime) {
        this.audio.currentTime = this.seekTime
      }
    }
  },
  methods: {
    fileChange (e) {
      const FILES = e.target.files || e.dataTransfer.files
      if (!FILES.length) {
        return
      }
      for (let i = 0, max = FILES.length; i < max; i++) {
        this.read(FILES[i])
      }
      // 初回読み込みに時間がかかるため実行タイミングを少しずらす
      if (!this.isLoaded) {
        const delay = setTimeout(() => {
          this.init()
          this.isLoaded = true
          clearTimeout(delay)
        }, 1000)
      }
    },
    read (file) {
      let reader = new FileReader()
      reader.onload = () => {
        this.playList.push({name: file.name, path: reader.result})
      }
      reader.readAsDataURL(file)
    },
    init () {
      // 初期化(再生途中で次のトラックに進む可能性)
      if (this.isPlay) this.stop()
      // シークバーの初期化
      this.seekTime = 0
      this.title = this.playList[this.index].name
      // 曲のあるパスをセット(再定義をさけるためAudioは、事前に定義)
      this.audio.src = this.playList[this.index].path
      // 曲の終わり時間の代入
      this.audio.addEventListener('loadedmetadata', () => {
        this.seekEndTime = Math.floor(this.audio.duration)
      })
    },
    next () {
      this.index++
      if (this.index === this.playList.length) {
        this.index = 0
      }
      this.init()
    },
    prev () {
      this.index--
      if (this.index === -1) {
        this.index = this.playList.length - 1
      }
      this.init()
    },
    start () {
      this.isPlay = true
      this.audio.play()
      // 再生時間の取得
      // 再生中
      this.audio.addEventListener('timeupdate', () => {
        this.seekTime = Math.floor(this.audio.currentTime)
      })
      // 曲の終了
      this.audio.addEventListener('ended', () => {
        this.audio.currentTime = 0
        this.stop()
      })
    },
    stop () {
      this.isPlay = false
      this.audio.pause()
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
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: cornflowerblue;
}

.spinner {
  width: 100px;
  height: 100px;
  margin: 20vh auto;
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

.info {
  text-align: center;
}

.info__music {
  line-height: 10px;
}

.info__music--title {
  word-wrap: break-word;
}

.controller,
.controller__seek {
  text-align: center;
}

.controller__btn {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: ghostwhite;
  font-size: 20px;
}

.controller__btn--play {
  color: red;
}

.controller__btn--stop {
  color: dimgray;
}
</style>
