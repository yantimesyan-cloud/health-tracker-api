# 🚨 为什么看不到 AI 识别热量

## 问题原因

AI 识别功能**已经开发完成**，但是：

1. **后端在本地运行**（localhost:3000）
2. **前端部署在云端**（Vercel）
3. **无法互相通信**（跨域 + localhost 不可访问）

## 解决方案

### 方案1：本地测试（立即可用）

**步骤**：
1. 启动后端
```bash
cd health-tracker-backend
npm start
```

2. 启动前端（本地）
```bash
cd health-tracker-mockups
python3 -m http.server 5173
```

3. 打开浏览器
```
http://localhost:5173/data-rich/
```

4. 上传照片 → AI 自动识别 ✓

---

### 方案2：部署后端（推荐）

把后端部署到云端，这样手机也能用！

#### 使用 Railway（免费 + 简单）

1. 访问 https://railway.app/
2. 用 GitHub 登录
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择你的 `health-tracker-backend` 仓库
6. 添加环境变量：
   ```
   GITHUB_TOKEN=ghu_Avsitj92m44hx9YwpM4azIsCLamxDh1SNoYw
   PORT=3000
   ```
7. 部署完成后获得 URL（例如：https://your-app.railway.app）

8. 修改前端代码：
```javascript
// 在 ai-integration.js 第一行改成：
const BACKEND_URL = 'https://your-app.railway.app';
```

9. 重新部署前端
```bash
cd health-tracker-mockups
npx vercel --prod
```

10. 完成！手机可以用了 🎉

---

## 当前状态

✅ **后端代码** - 完成（支持 GitHub Models API）
✅ **前端代码** - 完成（AI 识别 + 显示结果）
✅ **照片上传** - 可用
✅ **拼图生成** - 可用
⏳ **AI 识别** - 需要部署后端

---

## 文件位置

### 后端
- `/home/YanYan/clawd/health-tracker-backend/`
- 已配置 GitHub Token
- `npm start` 即可运行

### 前端
- `/home/YanYan/clawd/health-tracker-mockups/data-rich/`
- 已集成 AI 调用代码
- 已部署到 Vercel

### AI 集成代码
- `ai-integration.js` - AI 识别、结果显示、热量更新
- `script.js` - 照片上传时调用 AI

---

## 快速开始（本地测试）

```bash
# 终端1：启动后端
cd /home/YanYan/clawd/health-tracker-backend
npm start

# 终端2：启动前端
cd /home/YanYan/clawd/health-tracker-mockups
python3 -m http.server 5173

# 浏览器打开
open http://localhost:5173/data-rich/
```

上传照片 → AI 识别 → 显示热量 → 确认添加 ✓

---

## 需要帮助？

告诉我你想：
1. **本地测试** - 我帮你启动两个服务
2. **部署后端** - 我帮你一步步操作 Railway
3. **其他方案** - 可以用 Vercel Functions 等
