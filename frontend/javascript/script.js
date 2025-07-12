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