# GHFRC 官網

[English](README.md) | [简体中文](README.zh-CN.md) | **繁體中文（香港）**

**GHFRC 公開的網站程式碼庫與可重用的隊伍網站範本——每個長期分支都已線上部署。**

[**穩定版網站**](https://frc-leomotive.github.io/gh-sites/) ·
[預覽版網站](https://frc-leomotive.github.io/gh-sites/preview/) ·
[範本示範](https://frc-leomotive.github.io/gh-sites/template/) ·
[正式官網](https://ghfrc.pages.dev)

GHFRC 官網是公開的網站程式碼庫，也是可重用的網站範本。框架開發、皮膚、分支、Pull Request、Issue 和工程歷史均在本倉庫中公開維護。

本倉庫只包含可替換的示例內容。GHFRC 官網的真實內容另行保存於私有倉庫，不屬於本專案的一部分。

## 專案結構

- `framework/`：頁面結構、組件、導覽行為和內容介面。
- `skins/`：可替換的視覺主題和設計代幣（design tokens）。
- `content/`：可由其他隊伍直接替換的公開示例內容。
- `engineering-logs/`：專案所有模組當天的目標與實際完成工作。
- `docs/`：實施規格和跨模組文件。

## 分支與部署

每個長期分支的示例內容會在分支更新時自動發佈到 GitHub Pages：

| 分支 | 部署地址 |
| --- | --- |
| `stable` | <https://frc-leomotive.github.io/gh-sites/> |
| `preview` | <https://frc-leomotive.github.io/gh-sites/preview/> |
| `template` | <https://frc-leomotive.github.io/gh-sites/template/> |

`stable` 網站直接部署在 Pages 根路徑（`/gh-sites/stable/` 作為別名保留），並鏡像正式官網：工作流使用 `release/pages-production` 框架與私有內容倉庫中 GHFRC 的真實內容構建。`preview` 和 `template` 部署展示各自分支的可替換示例內容。單一工作流 `.github/workflows/deploy-github-pages.yml`（三個分支保持同一份檔案）會在每次推送時重新構建全部三個網站並統一發佈。框架內部連結、媒體和 favicon 路徑都會經過配置的 Astro base 路徑解析，因此同一份原始碼在域名根路徑和子路徑下都能正確呈現。

正式官網 `https://ghfrc.pages.dev`（自訂域名 `ghfrc.org`）另行構建：私有內容倉庫中的受信任 GitHub Actions 工作流會將最新公開 `stable` 框架與最新私有 `stable` 內容組合構建，然後僅將產生的靜態產物上載至 Cloudflare Pages。公開 `stable` 更新時會安全觸發該私有工作流，私有 `stable` 更新時則會直接啟動該工作流。

經淨化的舊框架與皮膚完整歷史已連接到 `preview` 分支，公開歷史不包含 GHFRC 真實內容。將 `preview` 合併到 `stable` 時應使用普通 Merge commit；如需保留舊歷史拓撲，不要使用 Squash and merge 或 Rebase and merge。

對 `stable` 的修改必須透過 Pull Request 引入。`Stable pull request checks` 工作流會校驗 Astro 內容與程式碼、執行自動化測試、構建公開示例官網，並拒絕內部參考媒體；檢查通過後才能合併 Pull Request。

## 作為範本使用

1. 下載或 Fork 本倉庫。
2. 保持文件約定的結構，用自己的文字和媒體替換 `content/` 內的檔案。
3. 安裝依賴並啟動本地開發伺服器。

```bash
npm install
npm run dev
```

本地網站預設使用 `http://localhost:4321`，專案要求使用 Node.js 24。

## 內容來源優先順序

構建時按照以下順序選擇一套完整內容來源：

1. 明確設定的 `GH_FRC_CONTENT_DIR`。
2. 本倉庫中的公開示例 `content/` 資料夾。

如此一來，即使 GHFRC 私有內容倉庫位於本專案旁邊，公開構建和預覽構建預設仍會使用可替換的示例內容。只有受信任的構建需要使用私有內容時，才明確設定 `GH_FRC_CONTENT_DIR`。所選來源必須同時包含 `config/site.yaml` 和所需媒體檔案，構建過程不會混用不同來源中的檔案。

## 驗證

```bash
npm test
npm run check
npm run build
```

## 授權條款

公開網站程式碼和示例內容採用 [MIT License](LICENSE)。GHFRC 私有內容倉庫及品牌資產不包含在內。
