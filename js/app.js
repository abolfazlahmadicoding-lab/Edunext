// حالت شب و روز
const button = document.querySelector("[data-theme-toggle]");

const savedButton = localStorage.getItem("theme");
if (savedButton === "dark") {
    document.body.classList.add(savedButton);
    button.textContent = "☀"
}

button.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        button.textContent = "☀";
        localStorage.setItem("theme", "dark")
    } else {
        button.textContent = "☾";
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
    if(items.length === 0){
        list.innerHTML = `<p class="empty-message">دوره‌ای پیدا نشد</p>`;
        return;
    }
        list.innerHTML = "";
        items.forEach(item => {
            list.innerHTML += `<a class="course" href="courses.html">
        <div class="cover ${item.category}"><strong>${item.badge}</strong><span>▶</span></div>
        <div class="info"><b>${item.title}</b><small>${item.hours} ساعت ◷ <span>${item.rating.toFixed(1)} <i>★</i></span></small></div>
        </a>`
        })
    }
};

renderCourses(courses);


// جست و جوی دوره ها
let activeCategory = "all";
function applyFilters(){
    const text = searchInput.value.trim().toLowerCase();
    const result = courses.filter(course => {
    const matchesCategory = activeCategory === "all" || activeCategory === course.category;
    const matchesText = course.title.toLowerCase().includes(text);
    return matchesCategory && matchesText;
})
    renderCourses(result);
};

const searchInput = document.querySelector("[data-course-search]");
if(searchInput){
searchInput.addEventListener("input" , function(){
    applyFilters()
})
};

//  فیلتر دسته بندی ها
const filterButtons = document.querySelectorAll("[data-filter]");
filterButtons.forEach(filterButton => {
    filterButton.addEventListener("click" , function(){
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
if(newsletterForm){
newsletterForm.addEventListener("submit" , function(event){
    event.preventDefault();
    const emailInput = document.querySelector("[data-newsletter-email]");
    const email = emailInput.value.trim();
    const message = document.querySelector("[data-newsletter-message]");
    if(email === "" || !email.includes("@") || !email.includes(".")){
        message.textContent = "ایمیل معتبر نیست";
        message.classList.add("error");
        message.classList.remove("success");
    } else{
        message.classList.remove("error");
        message.classList.add("success");
        message.textContent = "عضویت شما با موفقیت ثبت شد";
        emailInput.value = "";
    }
})
};