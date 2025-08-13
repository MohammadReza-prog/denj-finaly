document.addEventListener('DOMContentLoaded', function() {
  // جلوگیری از رفتار پیشفرض مرورگر
  history.scrollRestoration = 'manual';
  
  // اگر URL حاوی هش باشد
  if (window.location.hash) {
    // حذف هش بدون ریفرش صفحه
    history.replaceState(null, null, ' ');
    
    // بازگشت به بالای صفحه
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 10);
  }
  
  // اطمینان از موقعیت شروع در بالای صفحه
  window.addEventListener('load', function() {
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 0);
  });
});
// این کد را جایگزین بخش مربوطه کنید:
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // بررسی تم ذخیره شده یا پیشفرض سیستم
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcon(savedTheme);
  
  function updateIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // 1. مدیریت کامنت‌ها
  function displayComments(page) {
    const commentsContainer = document.getElementById('comments-container');
    if (commentsContainer) {
      // کدهای نمایش کامنت‌ها
    }
  }

  // 2. بررسی وجود المنت‌ها قبل از دسترسی
  const navLinks = document.querySelectorAll('a[href^="#"]');
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // 3. مدیریت جستجو
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchResults = document.getElementById('searchResults');
      if (searchResults) {
        searchResults.style.display = this.value.length > 0 ? 'block' : 'none';
      }
    });
  }

  // 4. مقداردهی اولیه
  displayComments(1);
});

// منتظر بمانید تا DOM کاملاً بارگذاری شود
document.addEventListener('DOMContentLoaded', function() {
  // 1. تعریف تابع displayComments
  function displayComments(page) {
    const commentsContainer = document.getElementById('comments-container');
    if (commentsContainer) {
      // کدهای نمایش کامنت‌ها
      console.log(`نمایش کامنت‌های صفحه ${page}`);
    } else {
      console.error('محفظه کامنت‌ها یافت نشد!');
    }
  }

  // 2. مدیریت event listeners
  const clickableElement = document.getElementById('myButton');
  if (clickableElement) {
    clickableElement.addEventListener('click', function() {
      console.log('دکمه کلیک شد!');
    });
  }

  // 3. مدیریت استایل عناصر
  const styledElement = document.querySelector('.element-to-style');
  if (styledElement) {
    styledElement.style.display = 'block';
  }

  // مقداردهی اولیه
  displayComments(1);
});




    
document.addEventListener('DOMContentLoaded', function() {
  // داده‌های اولیه نظرات
  let comments = [
    {
      id: 1,
      name: "محمد رضایی",
      gender: "male",
      rating: 4,
      comment: "فضای کافه بسیار عالی و دنج است. پیشنهاد می‌کنم.",
      date: "۲ روز پیش"
    },
    {
      id: 2,
      name: "فاطمه محمدی",
      gender: "female",
      rating: 5,
      comment: "بهترین قهوه شهر رو اینجا خوردم!",
      date: "۱ هفته پیش"
    }
  ];

  let currentPosition = 0;

  function displayCurrentComment() {
    const commentContainer = document.querySelector('.comments-card .card-body');
    if (!commentContainer) return;

    if (comments.length === 0) {
      commentContainer.innerHTML = '<p class="text-center py-3">هنوز نظری ثبت نشده است.</p>';
      return;
    }

    const comment = comments[currentPosition];
    commentContainer.innerHTML = `
      <div class="rating-display mb-3">
        <div class="stars">
          ${'<i class="fas fa-coffee"></i>'.repeat(comment.rating)}
          ${'<i class="far fa-coffee"></i>'.repeat(5 - comment.rating)}
        </div>
        <small class="ms-2">(امتیاز ${comment.rating} از 5)</small>
      </div>
      <p class="comment-text mb-3">${comment.comment}</p>
      <div class="user-info d-flex align-items-center">
        <div class="avatar me-3">
          <i class="fas fa-${comment.gender === 'male' ? 'male' : 'female'} fa-2x"></i>
        </div>
        <div>
          <h6 class="mb-0">${comment.name}</h6>
          <small class="text-muted">${comment.date}</small>
        </div>
      </div>
    `;
    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    const prevBtn = document.querySelector('.prev-comment');
    const nextBtn = document.querySelector('.next-comment');
    const indicator = document.querySelector('.page-indicator');
    
    if (prevBtn && nextBtn && indicator) {
      prevBtn.disabled = currentPosition === 0;
      nextBtn.disabled = currentPosition === comments.length - 1;
      indicator.textContent = `نظر ${currentPosition + 1} از ${comments.length}`;
    }
  }

  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value.trim();
      const commentText = document.getElementById('comment')?.value.trim();
      const rating = document.querySelector('input[name="rating"]:checked')?.value;
      const gender = document.querySelector('input[name="gender"]:checked')?.value;
      
      if (!name || !commentText || !rating || !gender) {
        alert('لطفاً تمام فیلدها را پر کنید!');
        return;
      }
      
      comments.unshift({
        id: comments.length + 1,
        name,
        gender,
        rating: parseInt(rating),
        comment: commentText,
        date: 'همین الان'
      });
      
      currentPosition = 0;
      displayCurrentComment();
      this.reset();
    });
  }

  const prevBtn = document.querySelector('.prev-comment');
  const nextBtn = document.querySelector('.next-comment');
  
  if (prevBtn) prevBtn.addEventListener('click', () => {
    if (currentPosition > 0) {
      currentPosition--;
      displayCurrentComment();
    }
  });
  
  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (currentPosition < comments.length - 1) {
      currentPosition++;
      displayCurrentComment();
    }
  });

  displayCurrentComment();
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
      

      // قبل از اضافه کردن event listener، وجود المنت را بررسی کنید
const element = document.getElementById('elementId');
if (element) {
  element.addEventListener('click', function() {
    // کدهای شما
  });
}

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



  
  // sampleComments.unshift(newComment); // اضافه به ابتدای آرایه
  // currentPage = 1; // بازگشت به صفحه اول
  // displayComments(currentPage);
  // setupPagination();
  // form.reset();
  
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
