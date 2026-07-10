# Lumina 首頁（自有原始碼實作）

把 Claude 設計專案「**Wix 網站重構計畫 / Lumina 首頁.dc.html**」用**自有原始碼**實作出來，
不再依賴設計畫布的 React 執行階段，方便日後直接用 AI 修改。

## 檔案

| 檔案 | 說明 |
|------|------|
| `index.html` | 頁面本體（語意化 HTML＋inline 樣式，直接對應設計） |
| `lumina.js` | 互動：Hero 輪播、下拉選單、行動選單、FAQ、捲動揭示、客服彈窗、`style-hover` |
| `serve.mjs` | 本機預覽伺服器 |

## 本機預覽

```bash
cd lumina
node serve.mjs 3001     # → http://localhost:3001
```

## 來源與轉換

- 透過 `claude_design`（DesignSync）MCP 從設計專案 `39e7291d-…` 讀取 `Lumina 首頁.dc.html` 與 `support.js`。
- 設計畫布格式（`<x-dc>`、`{{ }}` 綁定、`style-hover`、React runtime）已轉為純 HTML＋原生 JS：
  - `{{ handler }}` → `data-act` 事件委派
  - hover 下拉 → `data-dropwrap`
  - `support.js` 的元件邏輯 → `lumina.js`（無框架、無依賴）

## 與原設計的差異（刻意的強化）

- **捲動揭示改為捲動位置判斷**：原設計用 IntersectionObserver，快速捲動或直接跳到底時可能漏掉中段內容；
  這裡改成依捲動位置揭示並加安全網輪詢，確保任何捲動方式都不會有內容永久隱藏。
- 尊重 `prefers-reduced-motion`：關閉輪播自動播放與進場動畫。

## 設計摘要

品牌 Lumina（主色 `#2F4BE0` 藍＋`#0F9E93` 藍綠，Sora 字體，淺色系）。
區塊：Header（含下拉導覽）→ Hero 三張輪播 → 重點總覽 → 開始使用 → 常用資訊入口 →
常見問題入口 → FAQ → 最新更新 → 延伸主題分類 → 安全與隱私 → 合作夥伴 → Footer ＋ 浮動客服。

## 後續：接上 Wix（只換首頁、保留部落格）

- 反向代理：首頁 `/` 指向這份實作，其餘路徑代理回 Wix 部落格（原生、SEO 佳）。
- 或製作單檔 inline 版，透過 Wix 匯入工具建立頁面。
