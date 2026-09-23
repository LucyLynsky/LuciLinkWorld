# Cloudflare Pages 部署说明

LuciLinkWorld 静态站通过 GitHub Actions 发布到 Cloudflare Pages。做法对齐 `yingmotorsweb`：改完站点目录推 `main` 即上线。

线上站点：

- `https://www.lucilinkworld.com`
- GitHub 仓库：`LucyLynsky/LuciLinkWorld`
- 站点目录：`LuciLinkWorldWeb/`
- Workflow：`.github/workflows/deploy.yml`

---

## 1. 架构

```text
push main
 └─ LuciLinkWorldWeb/** 或 deploy.yml 变化
      →  Deploy to Cloudflare Pages
      →  项目 lucilinkworld
      →  www.lucilinkworld.com
```

上线只传 HTML / CSS / JS / `assets/`，排除 `scripts/` 和 `README.md`。

---

## 2. GitHub Secrets

仓库 **Settings → Secrets and variables → Actions**：

| Secret | 正确值 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token，权限含 **Account / Cloudflare Pages / Edit** 和 **Account / Account Settings / Read** |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账号 ID（Workers & Pages 概览右侧） |

可与 `yingmotorsweb` 的 R2 用同一 Cloudflare 账号；Account ID 与 R2 的 `R2_ACCOUNT_ID` 相同。Token 需另建 Pages 权限，不要把 R2 Access Key 填进 `CLOUDFLARE_API_TOKEN`。

---

## 3. Cloudflare 项目与域名

1. 第一次 Actions 跑通后，会创建 Pages 项目 **`lucilinkworld`**。
2. Cloudflare → Workers & Pages → `lucilinkworld` → Custom domains，绑定 `www.lucilinkworld.com`。
3. DNS 在 Cloudflare 管理该域名时，用 CNAME 指向 Pages 给出的 `*.pages.dev`。

---

## 4. 日常发布

改完 `LuciLinkWorldWeb/` 推到 `main`，Actions 里 **Deploy to Cloudflare Pages** 变绿即已上传。也可手动 **Run workflow**。

本地站点在 `E:\Lucodeprj\luciweb`。改完后同步进本仓库的 `LuciLinkWorldWeb/` 再推。
