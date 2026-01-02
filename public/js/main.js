const form = document.getElementById("contactForm");
const status = document.getElementById("status");
// Mobile Menu Toggle
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if(res.ok){
            status.textContent = result.msg;
            form.reset();
        } else {
            status.textContent = result.msg;
        }
    } catch (err) {
        status.textContent = "Server error. Try again later.";
    }
});
