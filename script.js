/* =========================================================
   和の響 公式サイトの動き
   - 写真がないときは「写真を掲載予定」を表示
   - スマホのメニュー開閉
   - 第2・第4日曜日が分かるカレンダー
   - お問い合わせフォーム（外部サービス未設定時の案内）
   ========================================================= */

(function () {
  setupPhotoFallbacks();
  setupNav();
  setupCalendars();
  setupContactForm();
})();

/**
 * images フォルダに写真がない（読み込み失敗）場合、
 * プレースホルダー「写真を掲載予定」を表示します。
 * 同じファイル名で写真を置けば、自動的に写真側が表示されます。
 */
function setupPhotoFallbacks() {
  const photos = document.querySelectorAll("[data-fallback='photo']");

  photos.forEach(function (img) {
    const wrap = img.closest(".hero-photo, .card-photo");
    if (!wrap) return;

    function showPlaceholder() {
      wrap.classList.add("is-empty");
    }

    img.addEventListener("error", showPlaceholder);

    if (img.complete && img.naturalWidth === 0) {
      showPlaceholder();
    }
  });
}

/** スマートフォン用ハンバーガーメニュー */
function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
    document.body.classList.remove("is-nav-open");
  }

  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    document.body.classList.toggle("is-nav-open", open);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });
}

/**
 * 今月と来月のカレンダーを描画し、
 * 第2・第4日曜日を金色で示します。
 */
function setupCalendars() {
  const root = document.querySelector("#calendars");
  if (!root) return;

  const now = new Date();
  root.appendChild(buildCalendar(now.getFullYear(), now.getMonth()));
  root.appendChild(buildCalendar(now.getFullYear(), now.getMonth() + 1));
}

function buildCalendar(year, monthIndex) {
  const date = new Date(year, monthIndex, 1);
  const y = date.getFullYear();
  const m = date.getMonth();
  const firstDay = date.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const sundays = [];
  for (let d = 1; d <= daysInMonth; d += 1) {
    if (new Date(y, m, d).getDay() === 0) sundays.push(d);
  }
  const practiceDays = [sundays[1], sundays[3]].filter(Boolean);

  const article = document.createElement("article");
  article.className = "calendar";
  article.innerHTML =
    "<h3>" + y + "年" + (m + 1) + "月</h3>" +
    '<div class="cal-week" aria-hidden="true">' +
    "<span>日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span>" +
    "</div>";

  const grid = document.createElement("div");
  grid.className = "cal-grid";

  for (let i = 0; i < firstDay; i += 1) {
    grid.appendChild(document.createElement("span"));
  }

  for (let d = 1; d <= daysInMonth; d += 1) {
    const cell = document.createElement("span");
    cell.textContent = String(d);
    const weekday = new Date(y, m, d).getDay();
    if (weekday === 0) cell.classList.add("sun");
    if (practiceDays.indexOf(d) !== -1) {
      cell.classList.add("practice");
      cell.title = "活動日（第2または第4日曜日）";
    }
    grid.appendChild(cell);
  }

  article.appendChild(grid);

  const legend = document.createElement("p");
  legend.className = "legend";
  legend.textContent = "金色の日付：第2・第4日曜日";
  article.appendChild(legend);

  return article;
}

/**
 * フォームの action が未設定（#）のときは送信せず案内を出します。
 * Formspree などに差し替えたあとは、通常どおり送信されます。
 */
function setupContactForm() {
  const form = document.querySelector("#contact-form");
  const notice = document.querySelector("#form-notice");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    const action = (form.getAttribute("action") || "").trim();
    if (!action || action === "#") {
      event.preventDefault();
      if (notice) {
        notice.hidden = false;
        notice.classList.add("is-visible");
      }
    }
  });
}
