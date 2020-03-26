# AudioPlayer

## プロジェクトの作り方

1. `vue init simulatedgreg/electron-vue プロジェクト名`

1. `yarn install`

1. index.ejsの`if (!process.browser) { `を<br>
   `if  (!htmlWebpackPlugin.options.isBrowser && !htmlWebpackPlugin.options.isDevelopment) {`に書き換え

1. `yarn dev`

## AudioPlayerの使い方

<img width="223" alt="スクリーンショット 2020-03-27 1 04 06" src="https://user-images.githubusercontent.com/47517002/77668616-f8681580-6fc6-11ea-80db-c643081045e4.png">

|ボタン|機能                |
|:---:|:-----------------:|
|`<`  |一つ前のトラックに戻る |
|`>`  |一つ後のトラックに進む |
|`▷`  |再生                |
|`||` |停止                |

### 未実装
- [ ] 曲の再生 (△)
- [ ] ファイルドラッグ もしくは、ファイル選択機能
- [ ] イコライザー
- [ ] 設定(背景画像、いろなど)
- [ ] 任意の秒数で飛ばす(+-15秒など)
- [X] データ構造を除いた簡単なUIを作る

## 現在の進捗
- 2020/3/27<br>
    assetsに`mp3`データを入れて`AudioMain.vue`の`playList`にデータ定義をすれば再生できる状態にはできた。<br>
    次回は、
    - ファイルドラッグ、もしくは、フォルダ選択画面を作る。
    - コンポーネント分割<br>
    を中心に行う。

## その他
一応、フリー音源ですが、`src/renderer/assets`のmp3は、git管理から外しました。
下記サイトからダウンロードした音源を使用してテストしたので、ダウンロードして`assets`に入れれば今の段階でも動きます。<br>
(名前は、`AudioMain.vue`の`playList`の`require()`のパス名に合うように変更)

- [不老不死 - DOVA-SYNDROME](https://dova-s.jp/bgm/play4290.html)
- [morning - DOVA-SYNDROME](https://dova-s.jp/bgm/play2452.html)
- [野良猫は宇宙を目指した - DOVA-SYNDROME](https://dova-s.jp/bgm/play2873.html)
