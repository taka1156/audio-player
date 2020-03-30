let audio = new Audio()

const state = {
  index: 0, // プレイリストの添字
  isPlay: false, // 再生状態の確認
  isLoop: false, // ループの状態
  playList: [], // 登録したファイル一覧
  seekTime: 0, // 現在のシークバーの現在位置(再生位置)
  seekEndTime: 0, // シークバーの最大値
  preVolume: 1
}

const getters = {
  isLoaded () {
    return state.playList.length !== 0
  },
  playList (state) {
    return state.playList
  },
  // オーディオの状態
  isPlay (state) {
    return state.isPlay
  },
  isLoop (state) {
    return state.isLoop
  },
  preVolume (state) {
    return state.preVolume
  },
  // 曲に関する情報
  title (state) {
    return state.playList[state.index].name
  },
  seekTime (state) {
    return Math.floor(state.seekTime)
  },
  seekEndTime (state) {
    return Math.floor(state.seekEndTime)
  },
  // トラック情報
  index (state) {
    return state.index
  },
  playlistLength () {
    return state.playList.length
  }
}

const mutations = {
  // 曲の追加
  setPlayList (state, music) {
    state.playList.push(music)
  },
  // 再生、停止
  stateChangePlay (state) {
    state.isPlay = !state.isPlay
  },
  // 現在のシーク位置
  setSeekTime (state, seekTime) {
    state.seekTime = seekTime
  },
  // 終わりのシーク位置
  setSeekEndTime (state, seekEndTime) {
    state.seekEndTime = seekEndTime
  },
  // 添字を進める
  nextIndex (state) {
    const INDEX = state.index + 1
    if (INDEX === state.playList.length) {
      state.index = 0
    } else {
      state.index = INDEX
    }
  },
  // 添字を戻す
  prevIndex (state) {
    const INDEX = state.index - 1
    if (INDEX === -1) {
      state.index = state.playList.length - 1
    } else {
      state.index = INDEX
    }
  },
  // ループ制御
  stateChangeLoop (state) {
    state.isLoop = !state.isLoop
  },
  // ボリューム
  setPreVolume (state, vol) {
    state.preVolume = vol
  }
}

const actions = {
  loadFile (context, file) {
    let reader = new FileReader()
    reader.onload = () => {
      context.commit('setPlayList', {name: file.name, path: reader.result})
    }
    reader.readAsDataURL(file)
  },
  init (context) {
    // シークバーの初期化
    context.commit('setSeekTime', 0)
    // 曲のあるパスをセット(再定義をさけるためAudioは、事前に定義)
    audio.src = context.getters.playList[context.getters.index].path
    // 読み込み
    audio.load()
    // 曲の終わり時間の代入
    audio.addEventListener('loadedmetadata', () => {
      context.commit('setSeekEndTime', audio.duration)
    })
  },
  next (context) {
    context.commit('nextIndex')
  },
  prev (context) {
    context.commit('prevIndex')
  },
  start (context) {
    context.commit('stateChangePlay')
    audio.play()
    // 再生時間の取得
    audio.addEventListener('timeupdate', () => {
      context.commit('setSeekTime', audio.currentTime)
    })
    // 曲の終了
    audio.addEventListener('ended', () => {
      audio.currentTime = 0
      context.dispatch('stop')
    })
  },
  stop (context) {
    audio.pause()
    context.commit('stateChangePlay')
  },
  loop (context) {
    context.commit('stateChangeLoop')
    audio.loop = !audio.loop
  },
  controlVolme (context, vol) {
    context.commit('setPreVolume', vol)
    audio.volume = vol
  },
  controlSeek (context, seekTime) {
    context.commit('setSeekTime', seekTime)
    audio.currentTime = seekTime
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
