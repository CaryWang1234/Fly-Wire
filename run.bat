@echo off
echo ========================================
echo   飞线(FlyWire)社交平台启动脚本
echo ========================================
echo.

echo 正在检查Python环境...
python --version >nul 2>&1
if errorlevel 1 (
    echo 错误: 未找到Python，请先安装Python 3.7+
    pause
    exit /b 1
)

echo 正在检查依赖包...
pip install -r requirements.txt

if errorlevel 1 (
    echo 错误: 依赖安装失败
    pause
    exit /b 1
)

echo.
echo 启动飞线社交平台...
echo 服务器将在 http://localhost:5000 启动
echo 按 Ctrl+C 停止服务器
echo.

python run.py

pause