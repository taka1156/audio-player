<template>
  <div class="Setting">
    <div class="center">
      <h4>設定</h4>
      <div class="border" />
      <!--設定の操作UI-->
      <toggle-swich :flag="isFronted" @state-change="isFronted = !isFronted">
        ウィンドウを最前面に固定
      </toggle-swich>
      <toggle-swich :flag="isDisable" @state-change="isDisable = !isDisable">
        コントローラーのみ表示
      </toggle-swich>
      <toggle-swich :flag="isVisalizer" @state-change="isVisalizer = !isVisalizer">
        ビジュアライザーの表示
      </toggle-swich>
      <toggle-swich :flag="isFile" @state-change="isFile = !isFile">
        ファイルの保存
      </toggle-swich>
      <div class="content">
        <label class="toggle-label">UIカラー</label>
        <select v-model="uiColor" class="input-selecter">
          <option disabled value="">選択して下さい</option>
          <option v-for="(color, index) in colorList" :key="index">{{ color }}</option>
        </select>
      </div>
      <!--設定の反映、初期化-->
      <div class="setting__controller">
        <button @click="saveSetting('保存しました。')">保存</button>
        <button @click="resetSetting">リセット</button>
      </div>
      <!--保存状態の表示-->
      <transition name="msg-fade">
        <p v-if="msg !== ''" class="msg">{{ msg }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import ToogleSwich from './parts/ToogleSwich'

export default {
  name: 'Setting',
  components: {
    'toggle-swich': ToogleSwich
  },
  data () {
    return {
      isFronted: false,
      isDisable: false,
      isVisalizer: false,
      isFile: false,
      colorList: ['red', 'blue', 'gold'],
      uiColor: '',
      msg: ''
    }
  },
  created () {
    const LOCAL_DATA = localStorage.getItem('AudioSetting')
    if (LOCAL_DATA) {
      const SETTING = JSON.parse(LOCAL_DATA)
      // 初期値を代入
      this.isFronted = SETTING.isFronted
      this.isDisable = SETTING.isDisable
      this.isVisalizer = SETTING.isVisalizer
      this.isFile = SETTING.isFile
      this.uiColor = SETTING.uiColor
    }
  },
  methods: {
    saveSetting (msg) {
      const SETTING = {
        isFronted: this.isFronted,
        isDisable: this.isDisable,
        isVisalizer: this.isVisalizer,
        isFile: this.isFile,
        uiColor: this.uiColor
      }
      localStorage.setItem('AudioSetting', JSON.stringify(SETTING))
      this.setMsg(msg)
    },
    resetSetting () {
      this.isFronted = this.isDisable = this.isVisalizer = this.isFile = false
      this.uiColor = ''
      this.saveSetting('初期化しました。')
    },
    setMsg (msg) {
      this.msg = msg
      const init = setTimeout(() => {
        this.msg = ''
        clearTimeout(init)
      }, 1000)
    }
  }
}
</script>

<style scoped>
.center {
  margin: 0 auto;
  height: 87vh;
  width: 100%;
  border: solid 1px white;
}

.border {
  width: 100%;
  border: solid 0.4px white;
}

p {
  line-height: 8px;
}

.content {
  display: flex;
  margin: 5px;
  justify-content: space-around;
}

.toggle-label {
  line-height: 20px;
  margin: 3px;
  width: 70%;
  font-size: 12.2px;
}

.input-selecter {
  margin: 3px auto;
  margin-left: 10%;
}

.setting__controller {
  margin: 0 auto;
  width: 60%;
  display: flex;
  justify-content: space-around;
}

.msg {
  text-align: center;
}

/* msgのアニメーション */
.msg-fade-enter,
.msg-fade-leave-to {
  opacity: 0;
}

.msg-fade-enter-to,
.msg-fade-leave {
  opacity: 1;
}

.msg-fade-enter-active,
.msg-fade-leave-active {
  transition: opacity 0.6s ease;
}
</style>
