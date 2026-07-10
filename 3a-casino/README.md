# 3A娛樂城 首頁（自有原始碼版）

用**自己的原始碼**重建 `3acasinoonline.com.tw`（原 Wix 拼裝）首頁的可程式化版本，
方便日後直接用 AI 做細部修改，不再受 Wix 元件排版限制。

真站經 Wix API 查證為 **內容型部落格**（`businessConfig: BLOG`，繁中／TWD／Asia-Taipei），
主題是「3A娛樂城 知識庫」。本頁即以此定位重建為內容中心（精選文章＋分類導覽）。

## 檔案結構（重點：內容與版型分離）

| 檔案 | 角色 | 你會常改的 |
|------|------|-----------|
| `data.js` | **所有內容**（品牌／分類／文章／連結／LINE） | ✅ 改這個 |
| `app.js` | 渲染器：讀 `data.js` → 產生 DOM | 少動 |
| `styles.css` | 樣式；主題色集中在檔首 `:root` | 換色改 `:root` |
| `index.html` | 外殼；載入字型、`data.js`、`app.js` | 少動 |
| `serve.mjs` | 本機預覽伺服器 | — |

> 想改任何文字／圖片／分類／連結 → 只改 `data.js` 的對應陣列，版面自動套用。
> 想換品牌色 → 只改 `styles.css` 開頭 `:root` 的 `--gold`／`--ink` 等變數。

## 本機預覽

```bash
cd 3a-casino
node serve.mjs        # → http://localhost:3000  （或 node serve.mjs 8080）
```

## 內容來源（真實資料）

透過 Wix REST API（Blog / Site-Properties / Media）擷取自 3A娛樂城 站台：
14 個真實分類、最新文章標題／封面／閱讀時間、官方 LINE（`_aaa1788`）。
文章封面圖直接引用 Wix CDN（`static.wixstatic.com`）網址。

## 設計

黑金奢華（luxe black-gold），對應 3A娛樂城 品牌識別。
中文標題 Noto Sans TC 900、數字／標籤 Oswald；動畫僅用 `transform`/`opacity`，
並支援 `prefers-reduced-motion`。RWD 斷點：1024 / 900 / 640。

## 已知限制與後續

- Wix **傳統編輯器的視覺版面無法透過 API 匯出**（無對應 REST 端點），
  故本頁的**區塊排列**是依內容型首頁慣例重建，非真站像素級複製。
- 要做到與真站「一模一樣」的版面，請提供一張首頁完整截圖，即可逐區塊對齊（phase 2）。
