# 🚀 快速部署指南

## 部署到 Vercel（5分钟完成）

### 步骤 1: 安装 Vercel CLI
```bash
npm install -g vercel
```

### 步骤 2: 登录 Vercel
```bash
vercel login
```
选择你的登录方式（GitHub/GitLab/Bitbucket/Email）

### 步骤 3: 部署项目
```bash
cd /home/YanYan/clawd/health-tracker-mockups
vercel
```

按提示操作：
```
? Set up and deploy "~/clawd/health-tracker-mockups"? [Y/n] Y
? Which scope do you want to deploy to? [选择你的账户]
? Link to existing project? [Y/n] n
? What's your project's name? health-tracker-mockups
? In which directory is your code located? ./
```

### 步骤 4: 获取 URL
部署完成后，Vercel 会提供：
- **Preview URL**: `https://health-tracker-mockups-xxx.vercel.app`
- **Production URL**: `https://health-tracker-mockups.vercel.app`

---

## 访问演示页面

部署后，你可以访问：

1. **主页** (选择设计方向):
   ```
   https://health-tracker-mockups.vercel.app/
   ```

2. **极简优雅风**:
   ```
   https://health-tracker-mockups.vercel.app/minimal/
   ```

3. **数据丰富风**:
   ```
   https://health-tracker-mockups.vercel.app/data-rich/
   ```

4. **游戏化趣味风**:
   ```
   https://health-tracker-mockups.vercel.app/gamified/
   ```

---

## 本地预览（无需部署）

如果只是想快速查看效果：

```bash
cd /home/YanYan/clawd/health-tracker-mockups
python3 -m http.server 8000
```

然后访问:
- http://localhost:8000/ (主页)
- http://localhost:8000/minimal/
- http://localhost:8000/data-rich/
- http://localhost:8000/gamified/

---

## 备用方案: 手动部署

1. 访问 https://vercel.com/new
2. 拖拽 `health-tracker-mockups` 文件夹
3. 点击 "Deploy"
4. 等待部署完成（约1分钟）

---

## 💡 提示

- 部署后，任何文件修改都可以通过 `vercel --prod` 重新部署
- Vercel 提供免费 SSL 证书（HTTPS）
- 支持自定义域名（需在 Vercel 后台设置）
- 每次 git push 可自动部署（如果连接 GitHub）

---

## 📱 分享给朋友

部署后，直接把 URL 发给朋友即可！
所有页面都是响应式的，手机上也能完美查看。
