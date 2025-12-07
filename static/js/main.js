// 飞线(FlyWire) - 主JavaScript文件

// 全局工具函数
const FlyWireUtils = {
    // 格式化时间
    formatTime: (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    },

    // 生成随机颜色
    generateColor: (seed) => {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', 
                       '#1abc9c', '#d35400', '#c0392b', '#16a085', '#8e44ad'];
        const index = Math.abs(seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length;
        return colors[index];
    },

    // 防抖函数
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 复制到剪贴板
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // 备用方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                return true;
            } catch (err) {
                return false;
            } finally {
                document.body.removeChild(textArea);
            }
        }
    },

    // 显示通知
    showNotification: (message, type = 'info') => {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);

        // 添加动画样式
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有需要初始化的组件
    initGlobalEvents();
    initSmoothScrolling();
    initResponsiveMenu();
});

// 初始化全局事件
function initGlobalEvents() {
    // 为所有按钮添加点击效果
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn, .btn *')) {
            const btn = e.target.closest('.btn');
            if (btn) {
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            }
        }
    });

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 聚焦搜索（如果有搜索功能）
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"], input[placeholder*="搜索"]');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // ESC 键关闭模态框（如果有）
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });
}

// 平滑滚动
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 响应式菜单
function initResponsiveMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // 在小屏幕上创建汉堡菜单
    if (window.innerWidth <= 768) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger-menu';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.style.cssText = `
            background: none;
            border: none;
            color: #b0b0b0;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
        `;

        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(hamburger);

            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('show');
            });

            // 点击外部关闭菜单
            document.addEventListener('click', function(e) {
                if (!navContainer.contains(e.target)) {
                    navLinks.classList.remove('show');
                }
            });

            // 添加响应式样式
            if (!document.querySelector('#responsive-menu-styles')) {
                const style = document.createElement('style');
                style.id = 'responsive-menu-styles';
                style.textContent = `
                    @media (max-width: 768px) {
                        .nav-links {
                            position: absolute;
                            top: 100%;
                            left: 0;
                            right: 0;
                            background: rgba(30, 30, 30, 0.95);
                            backdrop-filter: blur(10px);
                            flex-direction: column;
                            padding: 20px;
                            border-top: 1px solid #404040;
                            display: none;
                        }
                        .nav-links.show {
                            display: flex;
                        }
                        .nav-link {
                            justify-content: center;
                            margin: 5px 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
}

// 页面性能监控（开发模式）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
        
        // 监控内存使用（如果浏览器支持）
        if (performance.memory) {
            const usedMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
            const totalMB = Math.round(performance.memory.totalJSHeapSize / 1048576);
            console.log(`内存使用: ${usedMB}MB / ${totalMB}MB`);
        }
    });
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript错误:', e.error);
    
    // 在生产环境中可以发送错误报告
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // 这里可以添加错误报告代码
        console.log('错误已记录');
    }
});

// 导出工具函数到全局作用域
window.FlyWireUtils = FlyWireUtils;

console.log('飞线(FlyWire) JavaScript 加载完成');