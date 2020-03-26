# AudioPlayer

## プロジェクトの作り方

1. `vue init simulatedgreg/electron-vue プロジェクト名`

1. `yarn install`

1. index.ejsの`if (!process.browser) { `を<br>
   `if  (!htmlWebpackPlugin.options.isBrowser && !htmlWebpackPlugin.options.isDevelopment) {`に書き換え

1. `yarn dev`

## AudioPlayerの使い方

<img width="204" alt="スクリーンショット 2020-03-26 19 27 00" src="https://user-images.githubusercontent.com/47517002/77636664-ca1f1180-6f97-11ea-9ffa-4d286682070e.png">

|ボタン|機能                |
|:---:|:-----------------:|
|`<`  |一つ前のトラックに戻る |
|`>`  |一つ後のトラックに進む |
|`▷`  |再生                |
|`||` |停止                |

### 未実装
- [ ] 曲の再生
- [ ] 設定(背景画像、いろなど)
- [ ] 任意の秒数で飛ばす(+-15秒など)
- [X] データ構造を除いた簡単なUIを作る
