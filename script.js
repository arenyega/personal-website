// 导航栏响应式菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 汉堡菜单点击事件
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 导航链接点击事件（移动端）
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 技能进度条动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // 页面元素淡入效果
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // 为需要动画的元素添加观察者
    const animateElements = document.querySelectorAll(
        '.section-title, .about-content, .skill-category, .timeline-item, .contact-item'
    );
    
    animateElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // 表单提交处理
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // 验证表单
            if (!name || !email || !subject || !message) {
                showMessage('请填写所有必填字段', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('请输入有效的邮箱地址', 'error');
                return;
            }

            // 模拟发送邮件
            showMessage('消息发送成功！我会尽快回复您。', 'success');
            this.reset();
        });
    }

    // 邮箱验证函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 显示消息函数
    function showMessage(text, type) {
        // 移除已存在的消息
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 创建新消息
        const message = document.createElement('div');
        message.className = `message message-${type}`;
        message.textContent = text;
        
        // 设置消息样式
        Object.assign(message.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#4caf50' : '#f44336'
        });

        document.body.appendChild(message);

        // 显示动画
        setTimeout(() => {
            message.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            message.style.transform = 'translateX(100%)';
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 3000);
    }

    // 打字机效果（可选）
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // 如果需要打字机效果，取消下面的注释
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 100);
    // }

    // 主题切换功能（可选）
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.className = 'theme-toggle';
        
        Object.assign(themeToggle.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--primary-color)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-medium)',
            zIndex: '1000',
            transition: 'all 0.3s ease'
        });

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });

        document.body.appendChild(themeToggle);
    }

    // 启用主题切换（可选）
    // createThemeToggle();

    // 懒加载图片
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // 为所有懒加载图片添加观察者
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // 返回顶部按钮
    function createBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        
        Object.assign(backToTop.style, {
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--primary-color)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-medium)',
            zIndex: '1000',
            opacity: '0',
            visibility: 'hidden',
            transition: 'all 0.3s ease'
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });

        document.body.appendChild(backToTop);
    }

    // 启用返回顶部按钮
    createBackToTop();

    // 性能优化：防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 防抖优化滚动事件
    const debouncedScroll = debounce(function() {
        // 可以在这里添加需要防抖的滚动事件处理
    }, 100);

    window.addEventListener('scroll', debouncedScroll);

    // 页面加载完成后的初始化
    window.addEventListener('load', function() {
        // 添加页面加载完成的类
        document.body.classList.add('page-loaded');
        
        // 预加载关键图片
        const criticalImages = document.querySelectorAll('img[data-preload]');
        criticalImages.forEach(img => {
            const imageLoader = new Image();
            imageLoader.src = img.src;
        });
    });

    // 错误处理
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.error);
        // 可以在这里添加错误上报逻辑
    });

    // 统计代码（可选）
    function trackPageView() {
        // 这里可以添加 Google Analytics 或其他统计代码
        console.log('页面访问统计');
    }

    trackPageView();

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC 键关闭移动端菜单
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 触摸设备优化
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    console.log('🎉 个人简介网站初始化完成！');
});