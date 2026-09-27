/* =========================================================
   和の響 公式サイトの動き
   - 写真がないときは「写真を掲載予定」を表示
   - 写真をクリックすると拡大表示
   - スマホのメニュー開閉
   - 第2・第4日曜日が分かるカレンダー
   - お問い合わせフォーム（外部サービス未設定時の案内）
   - 日本語 / 英語の切り替え
   ========================================================= */

var currentLang = "ja";
var calendarMonths = [];

var I18N = {
  ja: {
    "meta.title": "和の響｜日本の伝統楽器が奏でる、心に響く音色",
    "meta.description": "野田市を拠点に活動する音楽グループ「和の響」。琴・大正琴・尺八・篠笛・パーカッションによる日本の伝統的な音色を、グループホームや地域イベントへお届けします。",
    "brand": "和の響",
    "logo.aria": "ページ先頭へ",
    "lang.switch": "English",
    "lang.aria": "Switch to English",
    "nav.aria": "メインメニュー",
    "nav.home": "ホーム",
    "nav.about": "和の響について",
    "nav.activities": "活動内容",
    "nav.instruments": "楽器",
    "nav.schedule": "活動場所",
    "nav.contact": "お問い合わせ",
    "nav.open": "メニューを開く",
    "nav.close": "メニューを閉じる",
    "hero.kicker": "野田市　伝統楽器の音楽グループ",
    "hero.lead": "日本の伝統楽器が奏でる、<br>心に響く音色",
    "hero.leadPlain": "日本の伝統楽器が奏でる、心に響く音色",
    "hero.sub": "琴・大正琴・尺八・篠笛・パーカッション",
    "hero.photoAlt": "和の響の演奏風景",
    "hero.jumpAria": "ページ内案内",
    "jump.schedule": "活動場所・練習日",
    "jump.instruments": "楽器紹介",
    "jump.contact": "演奏依頼",
    "about.title": "和の響について",
    "about.p1": "和の響は、琴、大正琴、尺八、篠笛、パーカッションなど、日本の伝統楽器を中心に演奏活動を行っている音楽グループです。",
    "about.p2": "地域の皆さまに、日本の伝統的な音色を身近に楽しんでいただけるよう、グループホームや地域イベントなどで演奏しています。落ち着いた和の響きが、会場にやさしい時間をお届けできれば幸いです。",
    "about.groupLabel": "グループ名",
    "about.repLabel": "代表",
    "about.repName": "吉田",
    "about.placeLabel": "活動の場",
    "about.placeValue": "グループホーム、地域イベント、公民館 ほか",
    "activities.title": "活動内容・演奏実績",
    "activities.lead": "施設や地域の場で、和の音色をお届けしています。",
    "act1.label": "演奏活動",
    "act1.title": "グループホームでの演奏",
    "act1.body": "地域のグループホームを訪問し、琴や尺八などの音色で、ご利用者の皆さまと楽しいひとときを過ごしました。",
    "act1.alt1": "グループホームでの演奏の様子",
    "act1.alt2": "グループホームでの演奏の様子（2枚目）",
    "act2.label": "地域イベント",
    "act2.title": "第21回野田市ふれあいハートまつり",
    "act2.body": "第21回野田市ふれあいハートまつりにて演奏を行い、訪れた皆さまに日本の伝統楽器の響きをお届けしました。",
    "act2.alt1": "第21回野田市ふれあいハートまつりでの演奏の様子",
    "act3.label": "演奏活動",
    "act3.title": "野田市産業祭での演奏",
    "act3.body": "野田市産業祭にて演奏を行い、訪れた皆さまに日本の伝統楽器の響きをお届けしました。",
    "act3.alt1": "野田市産業祭での演奏の様子",
    "instruments.title": "楽器紹介",
    "instruments.lead": "日本の伝統楽器を中心に、温かみのある合奏をお届けします。",
    "inst.koto": "琴",
    "inst.kotoBody": "十三弦の箏。澄んだ高音から深い低音まで、心をほどくような広がりのある響きが特長です。",
    "inst.taishogoto": "大正琴",
    "inst.taishogotoBody": "親しみやすい音色の撥弦楽器。旋律をやさしく支え、聴く人の記憶に残るメロディを奏でます。",
    "inst.shakuhachi": "尺八",
    "inst.shakuhachiBody": "竹の縦笛。息づかいがそのまま音になる、奥行きのある響きで、場の空気をそっと整えます。",
    "inst.shinobue": "篠笛",
    "inst.shinobueBody": "祭や民謡でも親しまれる横笛。明るく通りのよい音色が、合奏に彩りを添えます。",
    "inst.percussion": "パーカッション",
    "inst.percussionBody": "太鼓などの打楽器。穏やかなリズムで演奏を支え、会場に温かみと一体感をもたらします。",
    "schedule.title": "活動場所・練習日",
    "schedule.placeLabel": "活動場所",
    "schedule.placeValue": "野田市公民館",
    "schedule.timeLabel": "活動日時",
    "schedule.timeValue": "毎月第二・第四日曜日",
    "schedule.note": "毎月<strong>第2日曜日</strong>と<strong>第4日曜日</strong>に活動しています。<br>カレンダーの金色の日が、活動日の目安です。",
    "cal.weekdays": ["日", "月", "火", "水", "木", "金", "土"],
    "cal.months": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    "cal.heading": "{year}年{month}",
    "cal.practiceTitle": "活動日（第2または第4日曜日）",
    "cal.legend": "金色の日付：第2・第4日曜日",
    "contact.title": "演奏依頼・お問い合わせ",
    "contact.p1": "和の響では、地域のイベントや施設などでの演奏依頼を承っています。",
    "contact.p2": "琴、大正琴、尺八、篠笛、パーカッションなどによる、和の音色をお届けします。",
    "contact.p3": "演奏についてのお問い合わせは、お気軽にご連絡ください。",
    "tag.groupHome": "グループホーム",
    "tag.care": "介護施設",
    "tag.events": "地域イベント",
    "tag.assoc": "自治会",
    "tag.festivals": "地域のお祭り",
    "contact.phone": "電話",
    "contact.email": "メール",
    "contact.googleForm": "Googleフォームからお問い合わせ",
    "contact.formHeading": "お問い合わせフォーム",
    "contact.formNotice": "フォーム送信先がまだ設定されていません。README.md の手順に沿って、Formspree などのURLを <code>action</code> に記入してください。",
    "form.name": "お名前",
    "form.email": "メールアドレス",
    "form.org": "ご所属・団体名（任意）",
    "form.topic": "ご希望の内容",
    "form.optRequest": "演奏依頼",
    "form.optAbout": "活動について",
    "form.optOther": "その他",
    "form.message": "メッセージ",
    "form.placeholder": "ご希望の日時、会場、人数などが分かればご記入ください。",
    "form.submit": "送信する",
    "photo.placeholder": "写真を掲載予定",
    "photo.heroPlaceholder": "演奏写真を掲載予定",
    "footer.copy": "活動場所：野田市公民館　／　毎月第二・第四日曜日",
    "lightbox.close": "閉じる",
    "lightbox.prev": "前の写真",
    "lightbox.next": "次の写真",
    "lightbox.enlarged": "拡大写真"
  },
  en: {
    "meta.title": "Wa no Hibiki | Traditional Japanese Music in Noda City",
    "meta.description": "Wa no Hibiki is a traditional Japanese music group based in Noda City. We perform on koto, taishogoto, shakuhachi, shinobue, and percussion at group homes and community events.",
    "brand": "Wa no Hibiki",
    "logo.aria": "Back to top",
    "lang.switch": "日本語",
    "lang.aria": "日本語に切り替え",
    "nav.aria": "Main menu",
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.activities": "Activities",
    "nav.instruments": "Instruments",
    "nav.schedule": "Location",
    "nav.contact": "Contact",
    "nav.open": "Open menu",
    "nav.close": "Close menu",
    "hero.kicker": "Traditional Japanese Music Group in Noda City",
    "hero.lead": "Beautiful sounds played on traditional Japanese instruments,<br>music that touches the heart",
    "hero.leadPlain": "Beautiful sounds played on traditional Japanese instruments, music that touches the heart",
    "hero.sub": "Koto · Taishogoto · Shakuhachi · Shinobue · Percussion",
    "hero.photoAlt": "Wa no Hibiki in performance",
    "hero.jumpAria": "On this page",
    "jump.schedule": "Practice Location & Schedule",
    "jump.instruments": "Our Instruments",
    "jump.contact": "Performance Requests",
    "about.title": "About Us",
    "about.p1": "Wa no Hibiki is a community music group dedicated to traditional Japanese instruments—koto, taishogoto, shakuhachi, shinobue, and percussion.",
    "about.p2": "We perform at group homes and local events so neighbors can enjoy these sounds up close. Our hope is that the calm, warm character of Japanese music brings a gentle moment to every gathering.",
    "about.groupLabel": "Group name",
    "about.repLabel": "Representative",
    "about.repName": "Yoshida",
    "about.placeLabel": "Where we perform",
    "about.placeValue": "Group homes, community events, community centers, and more",
    "activities.title": "Activities & Performances",
    "activities.lead": "We bring the sound of traditional Japanese music to care settings and community gatherings.",
    "act1.label": "Performance",
    "act1.title": "Performance at a Group Home",
    "act1.body": "We visited a local group home and spent a warm afternoon with residents, sharing the sounds of koto, shakuhachi, and other instruments.",
    "act1.alt1": "Performance at a group home",
    "act1.alt2": "Performance at a group home (photo 2)",
    "act2.label": "Community Event",
    "act2.title": "21st Noda City Fureai Heart Festival",
    "act2.body": "We performed at the 21st Noda City Fureai Heart Festival, offering visitors the sound of traditional Japanese instruments.",
    "act2.alt1": "Performance at the 21st Noda City Fureai Heart Festival",
    "act3.label": "Performance",
    "act3.title": "Performance at the Noda City Industrial Festival",
    "act3.body": "We performed at the Noda City Industrial Festival and shared traditional Japanese music with people who stopped by.",
    "act3.alt1": "Performance at the Noda City Industrial Festival",
    "instruments.title": "Our Instruments",
    "instruments.lead": "Our ensemble centers on traditional Japanese instruments, with a warm and welcoming sound.",
    "inst.koto": "Koto",
    "inst.kotoBody": "A thirteen-string zither. From clear highs to deep lows, its spacious tone has a way of easing the heart.",
    "inst.taishogoto": "Taishogoto",
    "inst.taishogotoBody": "A plucked instrument with a friendly, approachable voice. It gently carries the melody and leaves a tune that stays with listeners.",
    "inst.shakuhachi": "Shakuhachi",
    "inst.shakuhachiBody": "A bamboo end-blown flute. Breath becomes sound, with a depth that quietly settles the room.",
    "inst.shinobue": "Shinobue",
    "inst.shinobueBody": "A transverse bamboo flute known from festivals and folk songs. Its bright, carrying tone adds color to the ensemble.",
    "inst.percussion": "Percussion",
    "inst.percussionBody": "Drums and other percussion. A gentle rhythm supports the music and brings warmth and togetherness to the hall.",
    "schedule.title": "Practice Location & Schedule",
    "schedule.placeLabel": "Practice Location",
    "schedule.placeValue": "Noda City Community Center",
    "schedule.timeLabel": "Practice Schedule",
    "schedule.timeValue": "The second and fourth Sunday of each month",
    "schedule.note": "We practice on the <strong>second Sunday</strong> and <strong>fourth Sunday</strong> of every month.<br>Gold dates on the calendar mark our practice days.",
    "cal.weekdays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "cal.months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "cal.heading": "{month} {year}",
    "cal.practiceTitle": "Practice day (2nd or 4th Sunday)",
    "cal.legend": "Gold dates: 2nd and 4th Sundays",
    "contact.title": "Performance Requests & Contact",
    "contact.p1": "Wa no Hibiki welcomes performance requests from local events and facilities.",
    "contact.p2": "We bring the sounds of koto, taishogoto, shakuhachi, shinobue, and percussion.",
    "contact.p3": "Please feel free to contact us about a performance.",
    "tag.groupHome": "Group Homes",
    "tag.care": "Care Facilities",
    "tag.events": "Community Events",
    "tag.assoc": "Neighborhood Associations",
    "tag.festivals": "Local Festivals",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.googleForm": "Contact Us via Google Forms",
    "contact.formHeading": "Contact Form",
    "contact.formNotice": "The form destination is not set yet. Please add a Formspree (or similar) URL to the <code>action</code> attribute. See README.md.",
    "form.name": "Name",
    "form.email": "Email address",
    "form.org": "Organization (optional)",
    "form.topic": "Subject",
    "form.optRequest": "Performance request",
    "form.optAbout": "About our activities",
    "form.optOther": "Other",
    "form.message": "Message",
    "form.placeholder": "If you know preferred dates, venue, or audience size, please include them.",
    "form.submit": "Send",
    "photo.placeholder": "Photo coming soon",
    "photo.heroPlaceholder": "Performance photo coming soon",
    "footer.copy": "Practice Location: Noda City Community Center  /  2nd and 4th Sundays",
    "lightbox.close": "Close",
    "lightbox.prev": "Previous photo",
    "lightbox.next": "Next photo",
    "lightbox.enlarged": "Enlarged photo"
  }
};

function t(key) {
  var table = I18N[currentLang] || I18N.ja;
  if (table[key] != null) return table[key];
  if (I18N.ja[key] != null) return I18N.ja[key];
  return key;
}

(function () {
  setupPhotoFallbacks();
  setupLightbox();
  setupNav();
  setupCalendars();
  setupContactForm();
  setupLanguageToggle();
})();

/**
 * 写真があるときはそのまま表示し、読み込みに失敗したときだけ
 * 「写真を掲載予定」を出します。
 *
 * 読み込み中は判定しません（naturalWidth が一時的に 0 になるため）。
 * すでに読み終わっている画像だけ complete を見ます。
 * 成功したら load で表示、失敗したら error でプレースホルダーです。
 */
function setupPhotoFallbacks() {
  const photos = document.querySelectorAll("[data-fallback='photo']");

  photos.forEach(function (img) {
    function markEmpty() {
      const galleryItem = img.closest(".gallery-item");
      if (galleryItem) {
        galleryItem.classList.add("is-empty");
        refreshActivityGalleries();
        return;
      }

      const wrap = img.closest(".hero-photo, .card-photo");
      if (wrap) wrap.classList.add("is-empty");
    }

    function markLoaded() {
      const galleryItem = img.closest(".gallery-item");
      if (galleryItem) {
        galleryItem.classList.remove("is-empty");
        refreshActivityGalleries();
        return;
      }

      const wrap = img.closest(".hero-photo, .card-photo");
      if (wrap) wrap.classList.remove("is-empty");
    }

    img.addEventListener("load", markLoaded);
    img.addEventListener("error", markEmpty);

    if (img.complete) {
      if (img.naturalWidth > 0) {
        markLoaded();
      } else {
        markEmpty();
      }
    }
  });

  refreshActivityGalleries();
}

function refreshActivityGalleries() {
  document.querySelectorAll(".activity-gallery").forEach(function (gallery) {
    const visible = gallery.querySelectorAll(".gallery-item:not(.is-empty)");
    gallery.classList.toggle("is-empty", visible.length === 0);
    gallery.classList.toggle("has-many", visible.length >= 2);

    const card = gallery.closest(".activity-card");
    if (card) card.classList.toggle("is-empty", visible.length === 0);
  });
}

/**
 * 写真をクリックしたときの拡大表示。
 * 同じ活動カード内に複数枚ある場合は、左右ボタンで切り替えます。
 */
function setupLightbox() {
  const overlay = document.querySelector("#lightbox");
  if (!overlay) return;

  const image = overlay.querySelector(".lightbox-image");
  const prevBtn = overlay.querySelector("[data-lightbox-prev]");
  const nextBtn = overlay.querySelector("[data-lightbox-next]");
  let items = [];
  let index = 0;

  function visibleItems(fromEl) {
    const gallery = fromEl.closest(".activity-gallery");
    const scope = gallery || fromEl.closest(".hero-photo, .card-photo") || document;
    return Array.prototype.slice.call(scope.querySelectorAll("[data-lightbox]")).filter(function (link) {
      return !link.classList.contains("is-empty");
    });
  }

  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    const link = items[index];
    const thumb = link.querySelector("img");
    image.src = link.getAttribute("href");
    image.alt = thumb ? thumb.getAttribute("alt") || t("lightbox.enlarged") : t("lightbox.enlarged");

    const many = items.length > 1;
    if (prevBtn) prevBtn.hidden = !many;
    if (nextBtn) nextBtn.hidden = !many;
  }

  function open(link) {
    items = visibleItems(link);
    const start = items.indexOf(link);
    overlay.hidden = false;
    document.body.classList.add("is-lightbox-open");
    show(start < 0 ? 0 : start);
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove("is-lightbox-open");
    image.removeAttribute("src");
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest("[data-lightbox]");
    if (!link) return;
    event.preventDefault();
    if (link.classList.contains("is-empty") || link.closest(".hero-photo.is-empty, .card-photo.is-empty")) {
      return;
    }
    open(link);
  });

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay || event.target.closest("[data-lightbox-close]")) {
      close();
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      show(index - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      show(index + 1);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (overlay.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
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
    toggle.setAttribute("aria-label", t("nav.open"));
    document.body.classList.remove("is-nav-open");
  }

  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? t("nav.close") : t("nav.open"));
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
  calendarMonths = [
    { year: now.getFullYear(), month: now.getMonth() },
    { year: now.getFullYear(), month: now.getMonth() + 1 }
  ];
  renderCalendars();
}

function renderCalendars() {
  const root = document.querySelector("#calendars");
  if (!root || !calendarMonths.length) return;
  root.innerHTML = "";
  calendarMonths.forEach(function (item) {
    root.appendChild(buildCalendar(item.year, item.month));
  });
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

  const monthLabel = t("cal.months")[m];
  const heading = t("cal.heading")
    .replace("{year}", String(y))
    .replace("{month}", monthLabel);

  const weekdays = t("cal.weekdays");
  const article = document.createElement("article");
  article.className = "calendar";
  article.innerHTML =
    "<h3>" + heading + "</h3>" +
    '<div class="cal-week" aria-hidden="true">' +
    weekdays.map(function (day) { return "<span>" + day + "</span>"; }).join("") +
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
      cell.title = t("cal.practiceTitle");
    }
    grid.appendChild(cell);
  }

  article.appendChild(grid);

  const legend = document.createElement("p");
  legend.className = "legend";
  legend.textContent = t("cal.legend");
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

/** 日本語 / 英語の切り替え（ページ遷移なし） */
function setupLanguageToggle() {
  var saved = "";
  try {
    saved = localStorage.getItem("wanohibiki-lang") || "";
  } catch (err) {
    saved = "";
  }

  applyLanguage(saved === "en" ? "en" : "ja");

  var button = document.querySelector("#lang-toggle");
  if (!button) return;

  button.addEventListener("click", function () {
    applyLanguage(currentLang === "ja" ? "en" : "ja");
  });
}

function applyLanguage(lang) {
  currentLang = lang === "en" ? "en" : "ja";
  document.documentElement.lang = currentLang;

  try {
    localStorage.setItem("wanohibiki-lang", currentLang);
  } catch (err) {}

  document.title = t("meta.title");
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
    var key = el.getAttribute("data-i18n-html");
    if (!key) return;
    el.innerHTML = t(key);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
    var key = el.getAttribute("data-i18n-alt");
    if (!key) return;
    el.setAttribute("alt", t(key));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    var key = el.getAttribute("data-i18n-placeholder");
    if (!key) return;
    el.setAttribute("placeholder", t(key));
  });

  document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
    if (el.classList.contains("nav-toggle")) return;
    var key = el.getAttribute("data-i18n-aria");
    if (!key) return;
    el.setAttribute("aria-label", t(key));
  });

  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-label", t(open ? "nav.close" : "nav.open"));
  }

  renderCalendars();
}
