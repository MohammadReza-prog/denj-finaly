
document.addEventListener('DOMContentLoaded', function() {
  // داده‌های اولیه
  let comments = [
    {
      id: 1,
      name: "محمد رضایی",
      gender: "male",
      rating: 3,
      comment: "این کافه فضای بسیار دنج و آرامی دارد. قهوه‌هایشان عالی است و پرسنل خوش‌برخورد. حتماً دوباره می‌آیم!",
      date: "۲ روز پیش"
    },
    {
      id: 2,
      name: "فاطمه محمدی",
      gender: "female",
      rating: 4,
      comment: "بهترین کافه در شهر! دسرهایشان بی‌نظیر است و فضای داخلی بسیار زیبا طراحی شده.",
      date: "۱ هفته پیش"
    },
    {
      id: 3,
      name: "علی حسینی",
      gender: "male",
      rating: 2,
      comment: "قیمت‌ها کمی بالاست اما کیفیت مواد اولیه خوب است. پیشنهاد می‌کنم حتماً پاستا را امتحان کنید.",
      date: "۲ هفته پیش"
    },
    {
      id: 4,
      name: "زهرا کریمی",
      gender: "female",
      rating: 4,
      comment: "من هر هفته به این کافه می‌آیم واقعاً عالی است.",
      date: "۳ هفته پیش"
    },
    {
      id: 5,
      name: "رضا نوروزی",
      gender: "male",
      rating: 3,
      comment: "سرویس سریع و کیفیت خوب. فقط گاهی اوقات شلوغ می‌شود و باید منتظر بمانید.",
      date: "۱ ماه پیش"
    }
  ];

  let currentPosition = 0; // موقعیت فعلی در آرایه

  // نمایش نظر فعلی
  function displayCurrentComment() {
    if (comments.length === 0) {
      document.querySelector('.comments-card').innerHTML = '<p>هنوز نظری ثبت نشده است.</p>';
      return;
    }

    const comment = comments[currentPosition];
    const commentCard = document.querySelector('.comments-card');
    
    // انیمیشن
    commentCard.classList.remove('animate-comment');
    void commentCard.offsetWidth;
    commentCard.classList.add('animate-comment');
    
    // نمایش امتیاز
    const cupsHtml = Array(5).fill().map((_, i) => 
      i < comment.rating 
        ? '<i class="fas fa-coffee"></i>' 
        : '<i class="far fa-coffee"></i>'
    ).join('');
    
    document.querySelector('.rating-display .stars').innerHTML = cupsHtml;
    document.querySelector('.rating-display small').textContent = `(امتیاز ${comment.rating} از 5)`;
    
    // نمایش متن نظر
    document.querySelector('.comment-text').textContent = comment.comment;
    
    // نمایش اطلاعات کاربر
    const userAvatar = comment.gender === 'male' 
      ? '<i class="fas fa-male fa-3x" style="color: var(--primary-color);"></i>'
      : '<i class="fas fa-female fa-3x" style="color: var(--primary-color);"></i>';
    
    document.querySelector('.user-info .avatar').innerHTML = userAvatar;
    document.querySelector('.user-info h6').textContent = comment.name;
    document.querySelector('.user-info small').textContent = comment.date;
    
    // به‌روزرسانی وضعیت دکمه‌ها
    document.querySelector('.prev-comment').disabled = currentPosition === 0;
    document.querySelector('.next-comment').disabled = currentPosition === comments.length - 1;
    
    // به‌روزرسانی شماره نظر
    document.querySelector('.page-indicator').textContent = 
      `نظر ${currentPosition + 1} از ${comments.length}`;
  }

  // تنظیم رویدادهای دکمه‌ها
  function setupPagination() {
    document.querySelector('.prev-comment').addEventListener('click', () => {
      if (currentPosition > 0) {
        currentPosition--;
        displayCurrentComment();
      }
    });
    
    document.querySelector('.next-comment').addEventListener('click', () => {
      if (currentPosition < comments.length - 1) {
        currentPosition++;
        displayCurrentComment();
      }
    });
  }

  // ارسال نظر جدید
  document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value || 0;
    
    // اعتبارسنجی
    if (!name || !comment || !rating) {
      showAlert('لطفاً تمام فیلدها را پر کنید و امتیاز دهید', 'danger');
      return;
    }
    
    if (name.length < 3) {
      document.getElementById('name').classList.add('is-invalid');
      return;
    }
    
    if (comment.length < 10) {
      document.getElementById('comment').classList.add('is-invalid');
      return;
    }
    
    const newComment = {
      id: comments.length + 1,
      name,
      gender,
      rating: parseInt(rating),
      comment,
      date: 'همین الان'
    };
    
    // اضافه کردن نظر جدید به ابتدای آرایه
    comments.unshift(newComment);
    currentPosition = 0; // رفتن به نظر جدید
    
    displayCurrentComment();
    this.reset();
    
    showAlert('نظر شما با موفقیت ثبت شد', 'success');
    
    // اسکرول به بخش نظرات
    document.getElementById('comments').scrollIntoView({ behavior: 'smooth' });
  });

  // نمایش پیام
  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} mt-3 text-center`;
    alertDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle me-2"></i> ${message}`;
    
    const formBody = document.querySelector('.comment-form-card .card-body');
    const oldAlert = formBody.querySelector('.alert');
    if (oldAlert) oldAlert.remove();
    
    formBody.appendChild(alertDiv);
    
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }

  // اعتبارسنجی لحظه‌ای
  document.getElementById('name').addEventListener('input', function() {
    if (this.value.length < 3 && this.value.length > 0) {
      this.classList.add('is-invalid');
    } else {
      this.classList.remove('is-invalid');
    }
  });

  document.getElementById('comment').addEventListener('input', function() {
    if (this.value.length < 10 && this.value.length > 0) {
      this.classList.add('is-invalid');
    } else {
      this.classList.remove('is-invalid');
    }
  });

  // مقداردهی اولیه
  displayCurrentComment();
  setupPagination();
});
  const menuItemsData = [
  // پیش غذاها
  { name: "پنیر سوخاری", category: "appetizer", desc: "پنیر موزارلا با پوشش طلایی و ترد" },
  { name: "سیب زمینی تنوری", category: "appetizer", desc: "با سس مخصوص کافه دنج" },
  
  // اسپاگتی
  { name: "اسپاگتی بولونزه", category: "spaghetti", desc: "با سس گوشت رازدار" },
  { name: "اسپاگتی آلفردو", category: "spaghetti", desc: "با سس سفید و قارچ" },
  
  // دسرها
  { name: "چیزکیک توت فرنگی", category: "dessert", desc: "با توت فرنگی تازه" },
  { name: "پاناکوتا", category: "dessert", desc: "با سس تمشک" },
  
  // سالادها
  { name: "سالاد سزار", category: "salad", desc: "با سس مخصوص و نان سوخاری" },
  { name: "سالاد یونانی", category: "salad", desc: "با پنیر فتا و زیتون" },
  
  // پاستا
  { name: "پاستا پستو", category: "pasta", desc: "با سس ریحان و پنیر پارمزان" },
  
  // برگرها
  { name: "برگر ویژه", category: "burger", desc: "با سیب زمینی سرخ کرده" },
  { name: "برگر مرغ", category: "burger", desc: "با سس باربیکیو" },
  
  // پیتزا
  { name: "پیتزا مخلوط", category: "pizza", desc: "با پپرونی، قارچ و زیتون" },
  
  // استیک
  { name: "استیک فیله", category: "steak", desc: "با سس قارچ و سبزیجات" },
  
  // بشقاب
  { name: "مرغ سوخاری", category: "plate", desc: "با آرد سوخاری مخصوص" },
  
  // ایرانی
  { name: "چلوکباب", category: "iranian", desc: "با زعفران و سماق" },
  
  // آیس
  { name: "آیس شیک وانیلی", category: "ice", desc: "با خامه تازه" },
  
  // شیک
  { name: "آیس شیک وانیلی", category: "shake", desc: "با خامه تازه" },
  
  // اسموتی
  { name: "اسموتی میوه‌ای", category: "smoothie", desc: "ترکیب توت فرنگی و موز" },
  
  // ماکتل
  { name: "ماکتل تابستانی", category: "mocktail", desc: "ترکیب میوه‌های استوایی" }
];

// جستجو
document.getElementById('searchInput').addEventListener('input', function() {
  const searchTerm = this.value.trim().toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  
  if (searchTerm.length < 2) {
    resultsContainer.style.display = 'none';
    return;
  }
  
  const filteredItems = menuItemsData.filter(item => 
    item.name.toLowerCase().includes(searchTerm) || 
    item.desc.toLowerCase().includes(searchTerm)
  );
  
  if (filteredItems.length > 0) {
    resultsContainer.innerHTML = filteredItems.map(item => `
      <div class="search-result-item" 
           data-category="${item.category}"
           onclick="filterToItem('${item.category}','${item.name}')">
        <strong>${item.name}</strong>
        <span class="category">${getCategoryName(item.category)}</span>
      </div>
    `).join('');
    resultsContainer.style.display = 'block';
  } else {
    resultsContainer.innerHTML = '<div class="search-result-item">موردی یافت نشد</div>';
    resultsContainer.style.display = 'block';
  }
});

// نام فارسی دسته‌بندی
function getCategoryName(category) {
  const categories = {
    appetizer: "پیش غذا",
    spaghetti: "اسپاگتی",
    dessert: "دسر",
    salad: "سالاد",
    pasta: "پاستا",
    burger: "برگر",
    pizza: "پیتزا",
    steak: "استیک",
    plate: "بشقاب",
    iranian: "ایرانی",
    ice: "آیس",
    shake: "شیک",
    smoothie: "اسموتی",
    mocktail: "ماکتل"
  };
  return categories[category] || category;
}

// هدایت به محصول
function filterToItem(category, name) {
  // کلیک روی دکمه دسته‌بندی مربوطه
  document.querySelector(`.category-tabs-vertical button[data-filter="${category}"]`).click();
  
  setTimeout(() => {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
      const itemName = item.querySelector('a').textContent.trim();
      if (itemName === name) {
        // اسکرول به آیتم و هایلایت
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        item.classList.add('highlight-item');
        setTimeout(() => item.classList.remove('highlight-item'), 2000);
        
        // بستن dropdown جستجو
        document.getElementById('searchResults').style.display = 'none';
        document.getElementById('searchInput').value = name; // پر کردن input با نام انتخاب شده
      }
    });
  }, 300);
}

// بستن دراپ‌داون
document.addEventListener('click', function(e) {
  if (!e.target.closest('.search-container')) {
    document.getElementById('searchResults').style.display = 'none';
  }
});
 
    // فعال کردن کلاس active در نوبارها
    document.addEventListener('DOMContentLoaded', function() {
      // فعال کردن تب‌های عمودی
      const verticalNavLinks = document.querySelectorAll('#vertical-navbar .vertical-nav-link');
      const navLinks = document.querySelectorAll('.nav-link-goldoon');
      
      // تابع برای تنظیم active بر اساس اسکرول
      function setActiveOnScroll() {
        const fromTop = window.scrollY + 100;
        
        // بررسی هر بخش
        document.querySelectorAll('section[id]').forEach(section => {
          if (section.offsetTop <= fromTop && 
              section.offsetTop + section.offsetHeight > fromTop) {
            const id = section.getAttribute('id');
            
            // به‌روزرسانی نوبار افقی
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
            
            // به‌روزرسانی نوبار عمودی
            verticalNavLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      }
      
      
       // داده‌های نمونه برای نظرات

      // رویداد کلیک برای نوبار عمودی
      verticalNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const target = this.getAttribute('href');
          
          // حذف active از همه
          verticalNavLinks.forEach(l => l.classList.remove('active'));
          navLinks.forEach(l => l.classList.remove('active'));
          
          // اضافه کردن active به لینک کلیک شده
          this.classList.add('active');
          
          // پیدا کردن لینک متناظر در نوبار افقی
          navLinks.forEach(l => {
            if (l.getAttribute('href') === target) {
              l.classList.add('active');
            }
          });
          
          // اسکرول به بخش مورد نظر
          document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });
      
      // رویداد کلیک برای نوبار افقی
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            // حذف active از همه
            navLinks.forEach(l => l.classList.remove('active'));
            verticalNavLinks.forEach(l => l.classList.remove('active'));
            
            // اضافه کردن active به لینک کلیک شده
            this.classList.add('active');
            
            // پیدا کردن لینک متناظر در نوبار عمودی
            verticalNavLinks.forEach(l => {
              if (l.getAttribute('href') === target) {
                l.classList.add('active');
              }
            });
            
            // اسکرول به بخش مورد نظر
            document.querySelector(target).scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
      
      // فعال کردن نوبار عمودی بعد از اسکرول
      window.addEventListener('scroll', function() {
        const verticalNav = document.getElementById('vertical-navbar');
        if (window.scrollY > 300) {
          verticalNav.classList.add('active');
        } else {
          verticalNav.classList.remove('active');
        }
        
        // تنظیم active بر اساس اسکرول
        setActiveOnScroll();
      });
      
      // فیلتر دسته‌بندی
      const filterButtons = document.querySelectorAll('.category-tabs-vertical button');
      const menuItems = document.querySelectorAll('.menu-item');
      
      filterButtons.forEach(button => {
    button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.dataset.filter;
    
    menuItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
        item.classList.remove('single-item'); // حذف کلاس single-item
      } else {
        item.style.display = 'none';
      }
    });
  });
});
// داده‌های نمونه برای نظرات

      
      // جستجو در منو
      const searchInput = document.getElementById('searchInput');
      
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.category-tabs-vertical button.active').dataset.filter;
        let visibleItems = 0;
        
        menuItems.forEach(item => {
          const title = item.querySelector('a').textContent.toLowerCase();
          const description = item.querySelector('.description')?.textContent.toLowerCase() || '';
          const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
          const matchesFilter = activeFilter === 'all' || item.classList.contains(activeFilter);
          
          if (matchesSearch && matchesFilter) {
            item.style.display = 'block';
            visibleItems++;
          } else {
            item.style.display = 'none';
          }
          
          
          // بررسی تعداد آیتم‌های نمایش داده شده
          if (visibleItems === 1) {
            item.classList.add('single-item');
          } else {
            item.classList.remove('single-item');
          }
        });
      });
      
      // فیلتر قیمت
      const priceRange = document.getElementById('priceRange');
      const priceValue = document.getElementById('priceValue');
      const applyPriceFilter = document.getElementById('applyPriceFilter');
      
      priceRange.addEventListener('input', function() {
        priceValue.textContent = new Intl.NumberFormat('fa-IR').format(this.value) + ' تومان';
      });
      
      applyPriceFilter.addEventListener('click', function() {
        const maxPrice = parseInt(priceRange.value);
        const activeFilter = document.querySelector('.category-tabs-vertical button.active').dataset.filter;
        let visibleItems = 0;
        
        menuItems.forEach(item => {
          const priceText = item.querySelector('.price-row span').textContent;
          const price = parseInt(priceText.replace(/,/g, ''));
          const matchesFilter = activeFilter === 'all' || item.classList.contains(activeFilter);
          
          if (price <= maxPrice && matchesFilter) {
            item.style.display = 'block';
            visibleItems++;
          } else {
            item.style.display = 'none';
          }
          
          // بررسی تعداد آیتم‌های نمایش داده شده
          if (visibleItems === 1) {
            item.classList.add('single-item');
          } else {
            item.classList.remove('single-item');
          }
        });
      });

      
      // پیام خوش‌آمدگویی
      const welcomeMessage = document.getElementById('welcome-message');
      
      // نمایش پیام با fadeIn
      setTimeout(function() {
        welcomeMessage.classList.add('active', 'animate__fadeInUp');
        
        // بعد از 3 ثانیه، با fadeOut محو شود
        setTimeout(function() {
          welcomeMessage.classList.remove('animate__fadeInUp');
          welcomeMessage.classList.add('animate__fadeOut');
          
          // بعد از پایان انیمیشن، مخفی‌اش کن
          welcomeMessage.addEventListener('animationend', function hide() {
            welcomeMessage.classList.remove('active', 'animate__fadeOut');
            welcomeMessage.removeEventListener('animationend', hide);
          });
        }, 3000);
      }, 1000);
      
      // بستن دستی
      document.getElementById('close-welcome').addEventListener('click', function() {
        welcomeMessage.classList.add('animate__fadeOut');
        welcomeMessage.addEventListener('animationend', function hide() {
          welcomeMessage.classList.remove('active', 'animate__fadeOut');
          welcomeMessage.removeEventListener('animationend', hide);
        });
      });
      
      // نمایش نوبار عمودی بعد از لود کامل
      setTimeout(() => {
        document.getElementById('vertical-navbar').classList.add('active');
      }, 1000);
    });
    document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // ایجاد نمونه از Collapse Bootstrap
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      
      // بستن منو
      bsCollapse.hide();
    });
  });
});
// بستن خودکار منو هنگام کلیک روی آیتم‌ها
document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar-collapse');
    if (window.innerWidth < 992) { // فقط در حالت موبایل
      const bsCollapse = new bootstrap.Collapse(navbar);
      bsCollapse.hide();
    }
  });
});
 window.addEventListener("load", function () {
    document.querySelector(".coffee-loader").style.display = "none";
  });

// فعال کردن گالری استوری پس از لود کامل صفحه
document.addEventListener('DOMContentLoaded', function() {
  // مقداردهی اولیه کاروسل
  const storyCarousel = new bootstrap.Carousel(document.getElementById('storyGallery'), {
    interval: 5000,
    wrap: true,
    keyboard: true,
    pause: 'hover'
  });

  // تغییر خودکار thumbnail ها با اسلایدها
  document.getElementById('storyGallery').addEventListener('slid.bs.carousel', function(event) {
    const activeIndex = event.to;
    const thumbs = document.querySelectorAll('.story-thumb');
    
    thumbs.forEach((thumb, index) => {
      if (index === activeIndex) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  });

  // افزودن swipe برای موبایل
  let touchStartX = 0;
  let touchEndX = 0;
  const carouselElement = document.querySelector('.story-carousel');
  
  carouselElement.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].clientX;
  }, {passive: true});
  
  carouselElement.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    const threshold = 50;
    
    if (touchEndX < touchStartX - threshold) {
      storyCarousel.next();
    } else if (touchEndX > touchStartX + threshold) {
      storyCarousel.prev();
    }
  }

  // کلیک روی thumbnail ها
  document.querySelectorAll('.story-thumb').forEach(thumb => {
    thumb.addEventListener('click', function() {
      const slideTo = this.getAttribute('data-bs-slide-to');
      storyCarousel.to(slideTo);
    });
  });

  // حل مشکل لود تصاویر
  window.addEventListener('load', function() {
    const images = document.querySelectorAll('.story-frame img, .story-thumb img');
    images.forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        img.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'image-fallback';
        fallback.innerHTML = '<i class="fas fa-image"></i>';
        img.parentNode.insertBefore(fallback, img.nextSibling);
      }
    });
  });
});



  
  sampleComments.unshift(newComment); // اضافه به ابتدای آرایه
  currentPage = 1; // بازگشت به صفحه اول
  displayComments(currentPage);
  setupPagination();
  form.reset();
  
  // اسکرول به بالا
  window.scrollTo({
    top: document.getElementById('comments').offsetTop - 50,
    behavior: 'smooth'
  });


// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', () => {
  displayComments(currentPage);
  setupPagination();
});
// این کد را به اسکریپت موجود اضافه کنید
document.addEventListener('DOMContentLoaded', function() {
  const thumbnailsContainer = document.querySelector('.story-thumbnails');
  const thumbRow = document.querySelector('.thumb-row');
  const thumbs = document.querySelectorAll('.story-thumb');

  // اگر بیش از 4 تصویر وجود داشت
  if (thumbs.length > 4) {
    // 1. اضافه کردن اسکرول افقی
    thumbnailsContainer.style.overflowX = 'auto';
    thumbnailsContainer.style.whiteSpace = 'nowrap';
    
    // 2. تنظیم عرض سطر برای اسکرول
    thumbRow.style.display = 'inline-flex';
    thumbRow.style.flexWrap = 'nowrap';
    thumbRow.style.width = 'auto';
    
    // 3. تنظیم فاصله بین تصاویر
    thumbRow.style.gap = '15px';
    
    // 4. غیرفعال کردن flex معمولی
    thumbRow.classList.remove('row');
    thumbRow.classList.remove('g-3');
    
    // 5. تنظیم استایل برای آیتم‌ها
    document.querySelectorAll('.story-thumb').forEach(thumb => {
      thumb.style.display = 'inline-block';
      thumb.style.float = 'none';
      thumb.style.marginRight = '15px';
    });
  }
});
// داده محصولات
 // داده‌های نمونه برای نظرات
