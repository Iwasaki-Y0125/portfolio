// 前回訪問時のダークモード引継ぎ設定
function initDarkMode() {
  const darkModeBtn = document.getElementById("dark-mode-btn");
  if (!darkModeBtn) return;

  // 画像のIDとライト／ダーク画像URL
  const images = {
    "img-top": { light: "image/top_light.GIF", dark: "image/top_dark.GIF" },
    "iconX": { light: "image/X_logo-black.png", dark: "image/X_logo-white.png" },
    "iconGithub": { light: "image/github-mark.png", dark: "image/github-mark-white.png"},
  };

  // 画像切替関数（modeは "light" または "dark"）
  function setImages(mode) {
    for (const id in images) {
      const element = document.getElementById(id);
      if (element) {
        element.src = images[id][mode];
      }
    }
  }

  // 保存されたダークモード設定を取得（true or false の文字列）
  const savedDarkMode = localStorage.getItem("darkMode") === "true";

  // 保存内容に応じて初期状態を設定
  if (savedDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeBtn.innerText = "ライトモード"; //ボタン表記　ライトモード（へ切替）
    setImages("dark");
  } else {
    document.body.classList.add("light-mode");
    darkModeBtn.innerText = "ダークモード"; //ボタン表記　ダークモード（へ切替）
    setImages("light");
  }

  // ボタンを押したときにテーマを切り替え＋保存
  darkModeBtn.addEventListener("click", () => {
    const switchToLight = document.body.classList.contains("dark-mode");

    document.body.classList.toggle("light-mode", switchToLight);
    document.body.classList.toggle("dark-mode", !switchToLight);
    // ボタンの表示名
    // ライトへ(switchToLight)「ダークモード(に切り替え)」
    // ダークへ(!switchToLight)「ライトモード(に切り替え)」
    darkModeBtn.innerText = switchToLight ? "ダークモード" : "ライトモード";

    // 画像切替
    setImages(switchToLight ? "light" : "dark");

    localStorage.setItem("darkMode", switchToLight);
  });
}

// ページ読み込み時に初期化
window.addEventListener("DOMContentLoaded", initDarkMode);
