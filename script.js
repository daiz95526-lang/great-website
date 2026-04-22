// 更新页脚年份，避免手动改文案。
const yearEl = document.querySelector('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 根据 data-page 给主导航增加当前页面高亮。
const currentPage = document.body.getAttribute('data-page');
if (currentPage) {
  const currentNav = document.querySelector(`[data-nav="${currentPage}"]`);
  if (currentNav) {
    currentNav.classList.add('is-active');
  }
}
