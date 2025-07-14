const loginToggle = document.getElementById("toggleLoginPassword");
const loginPassword = document.getElementById("loginPassword");

if (loginToggle && loginPassword) {
    loginToggle.addEventListener("click", () => {
        const type = loginPassword.getAttribute("type") === "password" ? "text" : "password";
        loginPassword.setAttribute("type", type);
        loginToggle.classList.toggle("fa-eye");
        loginToggle.classList.toggle("fa-eye-slash");
    });
}

// Switch between login and register forms
function toggleForm(formType) {
    const loginSection = document.querySelector("section.auth:nth-of-type(1)");
    const registerSection = document.getElementById("register-form");

    if (formType === 'register') {
        loginSection.style.display = "none";
        registerSection.style.display = "flex";
    } else {
        registerSection.style.display = "none";
        loginSection.style.display = "flex";
    }
}
