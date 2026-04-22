// 更新页脚年份，避免手动改文案。
document.querySelectorAll('#year').forEach(yearEl => {
  yearEl.textContent = new Date().getFullYear();
});

// 主导航高亮：优先按 data-page，其次按首页 hash。
const pageType = document.body.getAttribute('data-page');
if (pageType) {
  const currentNav = document.querySelector(`[data-nav="${pageType}"]`);
  if (currentNav) {
    currentNav.classList.add('is-active');
  }
}

// 顶部导航与锚点链接：在当前页面内平滑滚动到目标模块。
const samePageAnchorLinks = document.querySelectorAll('a[href*="#"]');
samePageAnchorLinks.forEach(link => {
  link.addEventListener('click', event => {
    const url = new URL(link.href, window.location.href);
    const targetId = url.hash.replace('#', '');
    if (!targetId) return;

    const isSamePath = url.pathname === window.location.pathname;
    const targetEl = document.getElementById(targetId);

    if (isSamePath && targetEl) {
      event.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${targetId}`);
    }
  });
});

// 模块进入视口时轻量淡入上移。
const revealTargets = document.querySelectorAll('.section, .card, .video-shell, .video-placeholder');
const initiallyVisible = document.querySelectorAll('.hero, .site-header');

if ('IntersectionObserver' in window) {
  revealTargets.forEach(el => el.classList.add('reveal'));
  initiallyVisible.forEach(el => el.classList.add('is-visible'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}
