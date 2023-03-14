const menu_btn = document.querySelector('.hamburger');
const mobile_btn = document.querySelector('.mobile-nav');

menu_btn.addEventListener('click', function() {
  if('click' === 'click'){
  menu_btn.classList.toggle('is-active');
  mobile_btn.classList.toggle('is-active');
  }
})