document.addEventListener("DOMContentLoaded", () => {
  console.log("سایت بارگذاری شد");
});

  // نمایش/پنهان کردن دکمه بازگشت به بالا
  window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

