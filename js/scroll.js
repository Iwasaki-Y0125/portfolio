function initScroll() {
  // 上へ戻るボタン
  document.querySelectorAll(".backToTop").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); //　HTML側のリンクの本来の機能をキャンセル
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // 各セクションへスクロール
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); //　HTML側のリンクの本来の機能をキャンセル
      const href = link.getAttribute("href"); // HTMLタグの属性の文字列を取得する → "#profile"取得
      const target = document.querySelector(href); //　href="#profile"（文字列）なので、要素（DOM）に直す
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 20,   //　見やすさのためセクションよりやや上にスクロール
          behavior: "smooth",
        });
      }
    });
  });
}
