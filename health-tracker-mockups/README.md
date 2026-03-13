# 健康追踪日历 - 设计方向演示

三个完整的、可交互的视觉设计方向，展示不同的设计理念和用户体验。

## 🎨 三个设计方向

### 1. 极简优雅风 🌸
**路径**: `/minimal/index.html`

**特点**:
- 米白+暖金配色，温暖舒适
- 大量留白，视觉轻松
- 柔和阴影，简洁图表
- 思源黑体，线性图标

**适合人群**: 追求简洁、专注内容、不喜欢花哨设计的用户

### 2. 数据丰富风 📊
**路径**: `/data-rich/index.html`

**特点**:
- 仪表盘布局，信息密集
- 渐变蓝配色，专业科技感
- 多图表展示（Chart.js）
- 热力图日历 + 成就系统

**适合人群**: 数据控、喜欢分析趋势、追求效率的用户

### 3. 游戏化趣味风 🎮
**路径**: `/gamified/index.html`

**特点**:
- 等级系统 + 经验值
- 岛屿日历，视觉化成长
- 五彩纸屑动画
- 成就徽章 + 好友排名

**适合人群**: 需要激励、喜欢互动、享受游戏化体验的用户

---

## 🚀 本地预览

### 方法 1: 直接打开 HTML
```bash
# 在项目根目录
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### 方法 2: 使用本地服务器（推荐）
```bash
# Python 3
python3 -m http.server 8000

# 或使用 Node.js
npx http-server -p 8000
```

然后访问: `http://localhost:8000`

---

## 🌐 部署到 Vercel

### 自动部署（推荐）
1. 安装 Vercel CLI:
```bash
npm i -g vercel
```

2. 登录并部署:
```bash
cd health-tracker-mockups
vercel
```

3. 按提示操作：
   - Set up and deploy? **Y**
   - Which scope? 选择你的账户
   - Link to existing project? **N**
   - Project name? **health-tracker-mockups** (或自定义)
   - Directory? **./** (回车)

4. 部署完成后会得到 URL，例如:
   - `https://health-tracker-mockups.vercel.app`
   - `https://health-tracker-mockups.vercel.app/minimal`
   - `https://health-tracker-mockups.vercel.app/data-rich`
   - `https://health-tracker-mockups.vercel.app/gamified`

### 手动部署
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择 "Import Git Repository" 或直接拖拽 `health-tracker-mockups` 文件夹
4. 部署设置保持默认
5. 点击 "Deploy"

---

## 📱 响应式设计

所有三个方向都支持：
- ✅ 桌面端 (1024px+)
- ✅ 平板端 (768px - 1024px)
- ✅ 移动端 (< 768px)

---

## 🎯 交互功能

### 极简风
- ✅ 点击日历日期查看详情
- ✅ 输入框实时输入
- ✅ 心情选择器
- ✅ 保存按钮 + Toast 提示
- ✅ Chart.js 体重趋势图

### 数据风
- ✅ Tab 切换（今日/本周/本月）
- ✅ 三种图表（折线、环形、柱状）
- ✅ 热力图日历
- ✅ 成就徽章展示
- ✅ 快速记录表单

### 游戏风
- ✅ XP 进度条动画
- ✅ 任务完成点击交互
- ✅ 五彩纸屑动画
- ✅ 成就解锁效果
- ✅ 岛屿日历打卡
- ✅ 好友排行榜

---

## 📊 使用的技术

- **HTML5**: 语义化标签
- **CSS3**: Flexbox, Grid, 动画, 渐变
- **JavaScript**: 原生 JS (无框架)
- **Chart.js**: 数据可视化 (仅数据风和极简风)
- **Google Fonts**: Noto Sans SC + Inter

---

## 🎨 设计资源

### 配色方案
所有颜色都在各自的 `style.css` 中定义为 CSS 变量，方便调整。

### 图标
- 极简风: 表情符号
- 数据风: 表情符号
- 游戏风: 表情符号 + 自定义徽章

---

## 📝 文件结构

```
health-tracker-mockups/
├── index.html              # 主选择页
├── minimal/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── data-rich/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── gamified/
│   ├── index.html
│   ├── style.css
│   ├── animations.css
│   └── script.js
├── assets/                 # 预留资源文件夹
├── package.json
├── vercel.json             # Vercel 配置
└── README.md
```

---

## ✅ 验收清单

- ✅ 3 个完整的 HTML 演示页面
- ✅ 真实的配色方案（非占位符）
- ✅ 真实的字体和字号
- ✅ 真实的间距和阴影
- ✅ 真实的图表数据
- ✅ 模拟数据合理（2026年3月，体重下降趋势）
- ✅ 月历视图（含完成标记）
- ✅ 每日记录卡片（输入+进度条）
- ✅ 数据可视化（图表）
- ✅ 交互反馈（hover, click, toast）
- ✅ 响应式设计（手机/电脑）
- ✅ 性能优化（CDN 引入，轻量化）

---

## 🚧 下一步建议

根据你选择的设计方向，可以：

1. **功能扩展**
   - 添加数据持久化（LocalStorage）
   - 连接后端 API
   - 用户登录系统
   - 数据导出功能

2. **设计优化**
   - 添加更多动画效果
   - 暗黑模式
   - 自定义主题颜色
   - 多语言支持

3. **性能优化**
   - 图片懒加载
   - 代码分割
   - Service Worker（离线支持）

---

## 📧 反馈

体验后请告诉我：
- 最喜欢哪个方向？
- 哪些功能需要改进？
- 有什么新想法？

---

**🎉 享受你的健康追踪之旅！**
