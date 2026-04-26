# I Hate The Algorithm (IHTA) 2.0 🛡️

**IHTA** is a powerful, research-backed Chrome Extension designed to purify your Facebook news feed. It intelligently detects and removes sponsored posts, suggested content, and promotional "noise" to give you back a clean, friend-focused social experience.

---

## 🌟 Features
- **Smart Filtering**: Uses DOM forensic analysis to identify obfuscated ads and suggestions.
- **Bypass Obfuscation**: Detects scrambled "Sponsored" text and canvas-drawn labels.
- **Anti-Suggestion Engine**: Automatically hides posts from people or groups you don't follow.
- **Premium UI**: Sleek, glassmorphism design with real-time blocking statistics.
- **Research Mode**: Built-in tool for capturing new ad patterns to keep the filter updated.

---

## 🚀 How to Install (for Friends)
Since this is a specialized tool, your friends can install it via **Developer Mode**:

1. **Download** this repository as a ZIP file and extract it.
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle at the top right).
4. Click **Load unpacked**.
5. Select the folder where you extracted the files.
6. **Done!** Open Facebook and enjoy a clean feed.

---

## 🛠️ Technical Details
The extension targets specific signatures identified through multi-sample research:
- **CSS Selectors**: Specifically targets `x1n2onr6` and `role="article"` containers.
- **Heuristics**: Checks for `data-ad-rendering-role` and presence of "Follow/Join" buttons.
- **Performance**: Built with `MutationObserver` for real-time cleaning without lag.

---

## 📜 License
This project is licensed under the MIT License - feel free to use and modify it!

---

## 🇪🇬 صنع بكل حب لمواجهة الخوارزميات المزعجة
إضافة عربية متطورة لتنقية خلاصة فيسبوك من الإعلانات والمحتوى المقترح المزعج.
