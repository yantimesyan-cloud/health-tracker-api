#!/bin/bash

# 健康追踪日历 - 快速预览脚本

echo "🎨 健康追踪日历 - 设计演示"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ 错误: 请在 health-tracker-mockups 目录中运行此脚本"
    echo "   cd /home/YanYan/clawd/health-tracker-mockups"
    exit 1
fi

echo "✅ 文件检查..."
echo ""

# Check files
files=(
    "index.html"
    "minimal/index.html"
    "minimal/style.css"
    "minimal/script.js"
    "data-rich/index.html"
    "data-rich/style.css"
    "data-rich/script.js"
    "gamified/index.html"
    "gamified/style.css"
    "gamified/animations.css"
    "gamified/script.js"
)

missing=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file (缺失)"
        missing=$((missing + 1))
    fi
done

echo ""

if [ $missing -gt 0 ]; then
    echo "❌ 有 $missing 个文件缺失，请检查！"
    exit 1
fi

echo "✅ 所有文件就绪！"
echo ""
echo "🚀 启动本地服务器..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "   服务器地址: http://localhost:8000"
    echo "   主页:       http://localhost:8000/"
    echo "   极简风:     http://localhost:8000/minimal/"
    echo "   数据风:     http://localhost:8000/data-rich/"
    echo "   游戏风:     http://localhost:8000/gamified/"
    echo ""
    echo "   按 Ctrl+C 停止服务器"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "   服务器地址: http://localhost:8000"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ 未找到 Python，请手动打开 index.html 文件"
    echo "   或使用其他 HTTP 服务器（如 npx http-server）"
    exit 1
fi
