// 部分HTMLを読み込む関数
async function loadPartial(id, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

// ページ読み込み時に部分HTMLを差し込む
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadPartial("header", "partials/header.html"),
    loadPartial("profile", "partials/profile.html"),
    loadPartial("portfolio", "partials/portfolio.html"),
    loadPartial("mini_game", "partials/mini_game.html"),
    loadPartial("footer", "partials/footer.html"),
  ]);

  // パーシャルが読み込まれてから各スクリプトを初期化
  initScroll();
  initDarkMode();
  initMiniGame();
});
