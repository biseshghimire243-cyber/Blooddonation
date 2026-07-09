const username = localStorage.getItem("username");

if (!username) {
    window.location.href = "login.html";
}

document.getElementById("username").innerText = username;

document.getElementById("logout").addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});