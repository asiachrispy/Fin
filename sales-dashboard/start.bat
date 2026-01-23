@echo off
chcp 65001 >nul
echo ==================================
echo   销售数据看板 - 一键启动脚本
echo ==================================
echo.

:: 检查 Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js 版本: %NODE_VERSION%
echo.

:: 检查 npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到 npm
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm 版本: %NPM_VERSION%
echo.

:: 检查依赖
echo 📦 检查依赖...

if not exist "backend\node_modules" (
    echo 安装后端依赖...
    cd backend
    call npm install
    cd ..
) else (
    echo ✅ 后端依赖已安装
)

if not exist "frontend\node_modules" (
    echo 安装前端依赖...
    cd frontend
    call npm install
    cd ..
) else (
    echo ✅ 前端依赖已安装
)

echo.
echo ==================================
echo   启动服务
echo ==================================
echo.

:: 启动后端服务
echo 🚀 启动后端服务 (端口 5000)...
cd backend
start "销售看板 - 后端" cmd /k "npm start"
cd ..

:: 等待后端服务启动
echo ⏳ 等待后端服务启动...
timeout /t 3 /nobreak >nul

:: 启动前端服务
echo 🚀 启动前端服务 (端口 3000)...
cd frontend
start "销售看板 - 前端" cmd /k "npm run dev"
cd ..

echo.
echo ==================================
echo   服务已启动
echo ==================================
echo.
echo 📱 前端地址: http://localhost:3000
echo 🔧 后端地址: http://localhost:5000
echo ❤️ 健康检查: http://localhost:5000/health
echo.
echo 关闭命令窗口即可停止服务
echo.
pause
