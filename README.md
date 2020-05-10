# AudioPlayer

## プロジェクトの作り方

1. `vue init simulatedgreg/electron-vue プロジェクト名`

1. `yarn install`

1. index.ejsの`if (!process.browser) { `を<br>
   `if  (!htmlWebpackPlugin.options.isBrowser && !htmlWebpackPlugin.options.isDevelopment) {`に書き換え

1. `yarn dev`

## AudioPlayerの使い方

![8450768F-C078-434C-AC1C-ED15766ECF34](https://user-images.githubusercontent.com/47517002/81506168-65ddc480-932f-11ea-8c9c-76d146852c41.png)


### 未実装
- [X] 曲の再生 (△)
- [X] ファイルドラッグ もしくは、ファイル選択機能
- [ ] イコライザー
- [ ] 設定(背景画像、いろなど)
- [ ] 任意の秒数で飛ばす(+-15秒など)
- [X] データ構造を除いた簡単なUIを作る

## 現在の進捗
- 2020/3/27<br>
    ~~assetsに`mp3`データを入れて`AudioMain.vue`の`playList`にデータ定義をすれば再生できる状態にはできた。~~<br>

- 2020/3/28<br>
    ファイルドラッグによる取り込みを実装(レイアウトやウィンドウサイズも修正)

## その他
~~一応、フリー音源ですが、`src/renderer/assets`のmp3は、git管理から外しました。
下記サイトからダウンロードした音源を使用してテストしたので、ダウンロードして`assets`に入れれば今の段階でも動きます。<br>
(名前は、`AudioMain.vue`の`playList`の`require()`のパス名に合うように変更)~~

- [不老不死 - DOVA-SYNDROME](https://dova-s.jp/bgm/play4290.html)
- [morning - DOVA-SYNDROME](https://dova-s.jp/bgm/play2452.html)
- [野良猫は宇宙を目指した - DOVA-SYNDROME](https://dova-s.jp/bgm/play2873.html)

**現在は、ローカルにある曲をファイル選択から取り込んで、再生することができます。**
