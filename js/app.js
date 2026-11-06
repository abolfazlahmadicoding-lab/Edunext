// حالت شب و روز
const button = document.querySelector("[data-theme-toggle]");

const savedButton = localStorage.getItem("theme");
if(savedButton === "dark"){
    document.body.classList.add(savedButton);
    button.textContent ="☀"
}

button.addEventListener("click", function(){
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        button.textContent = "☀";
        localStorage.setItem("theme" , "dark")
    } else{
        button.textContent = "☾";
        localStorage.setItem("theme" , "light")
    }
});

// اسکرول صفحه
document.body.classList.add("reveal-ready");
const scrollItems = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("is-visible")
        }
    });
});

scrollItems.forEach(item => {
    observer.observe(item)
});
