# GHFRC 官网

[English](README.md) | **简体中文** | [繁體中文（香港）](README.zh-Hant.md)

**GHFRC 公开的网站代码库与可复用的队伍网站模板——每个长期分支都已在线部署。**

[**稳定版站点**](https://frc-leomotive.github.io/gh-sites/) ·
[预览版站点](https://frc-leomotive.github.io/gh-sites/preview/) ·
[模板演示](https://frc-leomotive.github.io/gh-sites/template/) ·
[正式官网](https://ghfrc.pages.dev)

GHFRC 官网是公开的网站代码库，也是可复用的网站模板。框架开发、皮肤、分支、Pull Request、Issue 和工程历史均在本仓库中公开维护。

本仓库只包含可替换的示例内容。GHFRC 官网的真实内容单独保存在私有仓库中，不属于本项目的一部分。

## 项目结构

- `framework/`：页面结构、组件、导航行为和内容接口。
- `skins/`：可替换的视觉主题和设计令牌。
- `content/`：可由其他队伍直接替换的公开示例内容。
- `engineering-logs/`：项目所有模块当天的目标与实际完成工作。
- `docs/`：实施规格和跨模块文档。

## 分支与部署

每个长期分支的示例内容会在分支更新时自动发布到 GitHub Pages：

| 分支 | 部署地址 |
| --- | --- |
| `stable` | <https://frc-leomotive.github.io/gh-sites/> |
| `preview` | <https://frc-leomotive.github.io/gh-sites/preview/> |
| `template` | <https://frc-leomotive.github.io/gh-sites/template/> |

`stable` 站点直接部署在 Pages 根路径（`/gh-sites/stable/` 作为别名保留），并镜像正式官网：工作流使用 `release/pages-production` 框架与私有内容仓库中 GHFRC 的真实内容构建。`preview` 和 `template` 部署展示各自分支的可替换示例内容。单一工作流 `.github/workflows/deploy-github-pages.yml`（三个分支保持同一份文件）在每次推送时重新构建全部三个站点并统一发布。框架内部链接、媒体和 favicon 路径都会经过配置的 Astro base 路径解析，因此同一份源码在域名根路径和子路径下都能正确渲染。

正式官网 `https://ghfrc.pages.dev`（自定义域名 `ghfrc.org`）单独构建：私有内容仓库中的受信任 GitHub Actions 工作流会将最新公开 `stable` 框架与最新私有 `stable` 内容组合构建，然后仅将生成的静态产物上传至 Cloudflare Pages。公开 `stable` 更新时会安全触发该私有工作流，私有 `stable` 更新时则会直接启动该工作流。

经过净化的旧框架与皮肤完整历史已经连接到 `preview` 分支，公开历史不包含 GHFRC 真实内容。将 `preview` 合并到 `stable` 时应使用普通 Merge commit；如需保留旧历史拓扑，不要使用 Squash and merge 或 Rebase and merge。

对 `stable` 的改动必须通过 Pull Request 引入。`Stable pull request checks` 工作流会校验 Astro 内容与代码、运行自动化测试、构建公开示例官网，并拒绝内部参考媒体；检查通过后才能合并 Pull Request。

## 作为模板使用

1. 下载或 Fork 本仓库。
2. 保持文档约定的结构，用自己的文字和媒体替换 `content/` 中的文件。
3. 安装依赖并启动本地开发服务器。

```bash
npm install
npm run dev
```

本地网站默认使用 `http://localhost:4321`，项目要求使用 Node.js 24。

## 内容来源优先级

构建时按照以下顺序选择一套完整内容来源：

1. 明确设置的 `GH_FRC_CONTENT_DIR`。
2. 本仓库中的公开示例 `content/` 文件夹。

这样，即使 GHFRC 私有内容仓库位于本项目旁边，公开构建和预览构建默认仍会使用可替换的示例内容。只有受信任的构建需要使用私有内容时，才明确设置 `GH_FRC_CONTENT_DIR`。所选来源必须同时包含 `config/site.yaml` 和所需媒体文件，构建过程不会混用不同来源中的文件。

## 验证

```bash
npm test
npm run check
npm run build
```

## 许可证

公开网站代码和示例内容使用 [MIT License](LICENSE)。GHFRC 私有内容仓库及品牌资产不包含在内。
