# 飞线 (FlyWire) - 社交平台

## 项目简介
飞线是一个创新的社交平台，灵感来源于"一根线上挂纸条"的概念。用户可以通过移动线在各个固定位置间传递信息，实现独特的社交体验。

## 功能特性
- 🎨 现代化深色UI设计（灰黑主题）
- 🌐 支持UTF-8+编码，完美支持中文
- 🔗 链接码系统，通过链接码加入飞线（群聊）
- 📱 响应式设计，支持多设备访问
- 🎯 直观的用户界面，易于使用

## 技术栈
- **后端**: Python + Flask
- **前端**: HTML5 + CSS3 + JavaScript
- **数据库**: SQLite（轻量级，易于部署）
- **图标**: Font Awesome + 自定义图标

## 快速开始

### 方法一：使用 run.bat（Windows）
1. 双击 `run.bat` 文件
2. 等待依赖安装和服务器启动
3. 在浏览器中访问 `http://localhost:5000`

### 方法二：使用 run.py
1. 运行命令：`python run.py`
2. 等待服务器启动
3. 在浏览器中访问 `http://localhost:5000`

## 项目结构
```
FlyWire/
├── app.py                 # 主应用文件
├── run.py                 # 启动脚本
├── run.bat               # Windows启动脚本
├── requirements.txt       # Python依赖
├── README.md             # 项目说明
├── resources/            # 资源文件夹
│   ├── icons/           # 图标文件
│   ├── backgrounds/     # 背景图片
│   └── fonts/           # 字体文件
├── static/              # 静态文件
│   ├── css/            # 样式文件
│   ├── js/             # JavaScript文件
│   └── images/         # 图片资源
└── templates/           # HTML模板
    ├── base.html       # 基础模板
    ├── index.html      # 首页
    └── wire.html       # 飞线页面
```

## 使用说明

### 创建飞线
1. 访问首页
2. 点击"创建飞线"按钮
3. 系统将生成唯一的链接码
4. 分享链接码给其他用户

### 加入飞线
1. 访问首页
2. 输入飞线链接码
3. 点击"加入飞线"
4. 开始与其他用户交流

### 在飞线上交流
- 点击线上的任意位置添加纸条（消息）
- 拖动纸条在线上移动
- 查看其他用户的纸条
- 实时更新所有用户的动作

## 开发说明

### 环境要求
- Python 3.7+
- pip 包管理器

### 安装依赖
```bash
pip install -r requirements.txt
```

### 运行开发服务器
```bash
python run.py
```

## 许可证
本项目采用 MIT 许可证。

## 贡献
欢迎提交 Issue 和 Pull Request 来改进项目！