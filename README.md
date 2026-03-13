# 健康追踪应用 - 完整功能版 🏃‍♀️

## ✨ 已实现功能

### 核心功能
- ✅ **数据持久化** - 使用 localStorage 保存所有健康数据
- ✅ **AI 识别食物** - 上传照片自动识别热量和营养成分
- ✅ **数据可编辑** - 点击任意数据即可修改
- ✅ **图表实时更新** - 数据改变后自动刷新图表
- ✅ **照片拼图** - 自动生成精美的食物照片拼图
- ✅ **健康评分** - 综合计算每日健康得分

### 可编辑数据
- 📊 **步数** - 点击数字输入今日步数
- ⚖️ **体重** - 点击体重输入当前体重
- 💤 **睡眠** - 点击时长输入睡眠小时数
- 💪 **运动** - 点击添加运动记录
- 🍎 **食物** - 上传照片 AI 自动识别热量

---

## 🚀 快速开始

### 1. 安装依赖

#### 后端
```bash
cd health-tracker-backend
npm install
```

#### 前端
```bash
cd health-tracker-mockups/data-rich
# 前端是纯静态页面，无需安装依赖
```

### 2. 配置环境变量

在 `health-tracker-backend/` 目录创建 `.env` 文件：

```env
OPENAI_API_KEY=sk-your-api-key-here
PORT=3000
NODE_ENV=development
```

**获取 OpenAI API Key:**
- 访问 https://platform.openai.com/api-keys
- 登录后创建新的 API Key
- 复制粘贴到 `.env` 文件

### 3. 启动服务

#### 启动后端
```bash
cd health-tracker-backend
npm start
```

后端将运行在 `http://localhost:3000`

#### 启动前端
使用任意静态服务器，例如：

**方法一：使用 Python**
```bash
cd health-tracker-mockups
python -m http.server 5173
```

**方法二：使用 Node.js http-server**
```bash
npm install -g http-server
cd health-tracker-mockups
http-server -p 5173
```

**方法三：使用 VS Code Live Server**
- 安装 Live Server 插件
- 右键 `index.html` → Open with Live Server

前端将运行在 `http://localhost:5173`

### 4. 开始使用

1. 浏览器访问 `http://localhost:5173/data-rich/`
2. 点击任意数字即可编辑数据
3. 上传食物照片，AI 会自动识别热量
4. 所有数据自动保存到浏览器，刷新不丢失

---

## 📁 项目结构

```
health-tracker-api/
├── health-tracker-backend/        # 后端服务
│   ├── server.js                  # Express 服务器 + AI 识别
│   ├── package.json
│   └── .env                       # 环境变量（需创建）
│
└── health-tracker-mockups/
    └── data-rich/                 # 前端应用
        ├── index.html             # 主页面
        ├── style.css              # 基础样式
        ├── enhanced-features.css  # 增强功能样式
        └── app.js                 # 完整功能脚本
```

---

## 🚢 部署到 Vercel

### 前端部署

前端是纯静态页面，Vercel 会自动识别并部署。

### 后端部署

后端需要部署到支持 Node.js 的平台（如 Railway、Render 等）。

---

## 📄 许可证

MIT License
