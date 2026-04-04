function initMiniGame() {
  //* ===== 変数定義 ===== *//
  let isPlaying = false; // ゲームがプレイ中かどうかのフラグ
  let renda = 0; // 連打数の初期値

  //* ===== 汎用カウントダウン関数 ===== *//
  /**
   * seconds - カウントダウン秒数
   * targetId - 毎秒表示する要素のID
   * onComplete - カウントダウン終了時に実行する関数
   */

  function countdown(seconds, targetId, onComplete) {
    let timeLeft = seconds;

    if (targetId) document.getElementById(targetId).textContent = timeLeft;

    const intervalId = setInterval(() => {
      timeLeft--;

      if (timeLeft > 0) {
        if (targetId) document.getElementById(targetId).textContent = timeLeft;
      } else {
        clearInterval(intervalId);
        onComplete();
      }
    }, 1000);

    return intervalId;
  }

  //* ===== 画面切り替え ===== *//
  function showScreen(showId) {
    const screens = document.querySelectorAll(".mini_game section");
    screens.forEach((sec) => sec.classList.add("hidden"));
    document.getElementById(showId).classList.remove("hidden");
  }
  //* ===== 1. スタート画面 ===== *//
  document.getElementById("startBtn").addEventListener("click", () => {
    isPlaying = true;
    showScreen("rendaReady");
    readyTime();
  });

  //* ===== 2. 3秒待機画面 ===== *//
  //* 3秒間カウントダウン表示：「連打開始まで3, 2, 1」の表示
  function readyTime() {
    countdown(3, "readyTime", startGame);
  }

  //* ===== 3. 連打中画面 ===== *//

  //* 6秒間のカウントダウン表示
  function startGame() {
    showScreen("rendaPlay");
    countdown(6, "playTime", rendaEnd);

  //* 連打中画面がクリックされたときの処理
    const rendaBtn = document.getElementById("rendaBtn");
    rendaBtn.onclick = () => {
      if (!isPlaying) return;
      renda++;
      document.getElementById("playScore").innerText = `${renda}連打`;
    };
  }

  //* ===== 4. 終了画面 ===== *//
  function rendaEnd() {
    showScreen("rendaEnd");
    countdown(1, null, showResult);
  }

  //* ===== 5. 結果画面 ===== *//
  function showResult() {
    isPlaying = false;
    showScreen("rendaResult");

  //* 結果スコア表示
  document.getElementById("resultScore").innerText = `${renda}連打`;

const ranks = [
  { max: 0,        img: "image/E.GIF", title: "寝起きのナマケモノ 級", message: "起きただけでエラい" },
  { max: 15,       img: "image/D.GIF", title: "ペンギンのおさんぽ 級", message: "てちてちてちてち" },
  { max: 30,       img: "image/C.GIF", title: "アザラシのおなかぺちぺち 級", message: "ぺちぺちは実は威嚇なのです" },
  { max: 50,       img: "image/B.GIF", title: "さんぽ前の柴犬のしっぽ 級", message: "テンションMAX" },
  { max: Infinity, img: "image/A.GIF", title: "クビナガカイツブリの水上走り 級", message: "はやすぎる…！" },
];


  function showRank(renda) {
    const rank = ranks.find(r => renda <= r.max);
    document.getElementById("rankImg").src = rank.img;
    document.getElementById("rank").innerText = rank.title;
    document.getElementById("rankMessage").innerText = rank.message;
  }

  showRank(renda);


  //* Xに投稿するボタン：Xに連打数を投稿
  document.getElementById("postToX").addEventListener("click", function () {
    const rankText = document.getElementById("rank").innerText;
    const siteURL = "https://iwasaki-y0125.github.io/Portfolio/";
    const postText = `6秒連打で ${renda}連打しました！${rankText} #6秒連打 ${siteURL}`;
    const postUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      postText
    )}`;
    window.open(postUrl, "_blank", "noopener,noreferrer"); // 新しいタブでXに投稿
  });

  //* リトライボタン：3秒待機画面に戻る
  document.getElementById("retryBtn").addEventListener("click", function () {
    renda = 0;
    document.getElementById("readyTime").innerText = "3";
    document.getElementById("playTime").innerText = "あと 6 秒";
    document.getElementById("playScore").innerText = `${renda}連打`;
    isPlaying = true;
    showScreen("rendaReady");
    readyTime();
  });
  }
}
