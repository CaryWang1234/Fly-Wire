#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
飞线(FlyWire)社交平台启动脚本
"""

import os
import sys
import subprocess

def check_dependencies():
    """检查并安装依赖"""
    print("正在检查依赖包...")
    
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✓ 依赖安装完成")
        return True
    except subprocess.CalledProcessError:
        print("✗ 依赖安装失败，请手动运行: pip install -r requirements.txt")
        return False

def main():
    print("=" * 50)
    print("   飞线(FlyWire)社交平台")
    print("=" * 50)
    print()
    
    # 检查Python版本
    if sys.version_info < (3, 7):
        print("错误: 需要Python 3.7或更高版本")
        sys.exit(1)
    
    print(f"✓ Python版本: {sys.version}")
    
    # 安装依赖
    if not check_dependencies():
        sys.exit(1)
    
    print()
    print("启动飞线社交平台...")
    print("服务器将在 http://localhost:5000 启动")
    print("按 Ctrl+C 停止服务器")
    print()
    
    # 启动应用
    try:
        from app import app, socketio
        socketio.run(app, host='0.0.0.0', port=5000, debug=True)
    except KeyboardInterrupt:
        print("\n服务器已停止")
    except Exception as e:
        print(f"启动失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()