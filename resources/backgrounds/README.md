# 背景资源文件夹

## 说明
此文件夹用于存放飞线社交平台所需的背景图片。

## 建议背景
- 首页背景 (hero-bg.jpg)
- 飞线页面背景 (wire-bg.jpg)
- 登录页面背景 (login-bg.jpg)
- 渐变背景 (gradient-bg.jpg)

## 背景规格
- 分辨率: 1920x1080 或更高
- 格式: JPG/PNG
- 风格: 深色主题，现代化设计
- 文件大小: 优化压缩，不超过500KB

## 使用方式
背景可以通过CSS引用，例如：
```css
.hero-section {
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
                url('/resources/backgrounds/hero-bg.jpg') center/cover;
}
```