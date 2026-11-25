// حالت شب و روز
const button = document.querySelector("[data-theme-toggle]");

button.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
    } else {
        localStorage.setItem("theme", "light")
    }
});


// اسکرول صفحه
document.body.classList.add("reveal-ready");
const scrollItems = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
        }
    });
});

scrollItems.forEach(item => {
    observer.observe(item)
});


// منوی موبایل
const menuButtonMobile = document.querySelector("[data-menu-toggle]");
const navMobile = document.querySelector("[data-nav]");

menuButtonMobile.addEventListener("click", function () {
    navMobile.classList.toggle("open");
    if (navMobile.classList.contains("open")) {
        menuButtonMobile.textContent = "✕";
        menuButtonMobile.setAttribute("aria-expanded", "true");
    } else {
        menuButtonMobile.textContent = "☰";
        menuButtonMobile.setAttribute("aria-expanded", "false");
    }
});


// داده ی دوره ها
const courses = [
    { id: 1, title: "آموزش پایتون پیشرفته", category: "programming", hours: 7, rating: 4.5, level: "advanced", badge: "Py" },
    { id: 2, title: "آموزش جاوا اسکریپت سطح مقدماتی", category: "web", hours: 5, rating: 4.7, level: "beginner", badge: "JS" },
    { id: 3, title: "دوره ی پیشرفته HTML", category: "web", hours: 3, rating: 3.9, level: "advanced", badge: "HTML" },
    { id: 4, title: "آموزش CSS", category: "web", hours: 3, rating: 4.0, level: "beginner", badge: "CSS" },
    { id: 5, title: "گیت و گیت‌هاب", category: "tools", hours: 4, rating: 4.3, level: "advanced", badge: "Git" },
    { id: 6, title: "مبانی کامپیوتر", category: "fundamentals", hours: 6, rating: 3.7, level: "beginner", badge: "PC" }
];

//تبدیل کد داده ی دوره ها به تابع
function renderCourses(items) {
    const list = document.querySelector("[data-courses-list]");

    if (list) {
        if (items.length === 0) {
            list.innerHTML = `<p class="empty-message">دوره‌ای پیدا نشد</p>`;
            return;
        }
        const limit = Number(list.dataset.limit) || items.length;
        list.innerHTML = "";
        items.slice(0, limit).forEach(item => {
            list.innerHTML += `<article class="course">
    <div class="cover ${item.category}">
        <span class="level">${item.level === "beginner" ? "مقدماتی" : "پیشرفته"}</span>
        <button class="fav" type="button" data-id="${item.id}" aria-label="افزودن به علاقه‌مندی‌ها"><svg class="ico"><use href="#i-heart"/></svg></button>
        <strong>${item.badge}</strong>
        <span class="play-btn" aria-hidden="true"><svg class="ico"><use href="#i-play"/></svg></span>
    </div>
    <div class="info">
        <h3><a href="courses.html">${item.title}</a></h3>
        <div class="meta">
            <span><svg class="ico"><use href="#i-clock"/></svg> ${item.hours} ساعت</span>
            <span class="rate"><svg class="ico"><use href="#i-star"/></svg> ${item.rating.toFixed(1)}</span>
        </div>
        <span class="more">مشاهده دوره <svg class="ico"><use href="#i-arrow"/></svg></span>
    </div>
</article>`
        })
    }
};

renderCourses(courses);


// جست و جوی دوره ها
let activeCategory = "all";
function applyFilters() {
    const text = searchInput.value.trim().toLowerCase();
    const result = courses.filter(course => {
        const matchesCategory = activeCategory === "all" || activeCategory === course.category;
        const matchesText = course.title.toLowerCase().includes(text);
        return matchesCategory && matchesText;
    })
    renderCourses(result);
};

const searchInput = document.querySelector("[data-course-search]");
if (searchInput) {
    searchInput.addEventListener("input", function () {
        applyFilters()
    })
};

//  فیلتر دسته بندی ها
const filterButtons = document.querySelectorAll("[data-filter]");
filterButtons.forEach(filterButton => {
    filterButton.addEventListener("click", function () {
        filterButtons.forEach(button => {
            button.classList.remove("active");
        })
        filterButton.classList.add("active");
        activeCategory = filterButton.dataset.filter;
        applyFilters()
    })
});

//فرم خبرنامه
const newsletterForm = document.querySelector("[data-newsletter]");
if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const emailInput = document.querySelector("[data-newsletter-email]");
        const email = emailInput.value.trim();
        const message = document.querySelector("[data-newsletter-message]");
        if (email === "" || !email.includes("@") || !email.includes(".")) {
            message.textContent = "ایمیل معتبر نیست";
            message.classList.add("error");
            message.classList.remove("success");
        } else {
            message.classList.remove("error");
            message.classList.add("success");
            message.textContent = "عضویت شما با موفقیت ثبت شد";
            emailInput.value = "";
        }
    })
};