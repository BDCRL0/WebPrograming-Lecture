document.addEventListener("DOMContentLoaded", function () {
    loadFromLocalStorage();
});

function saveToLocalStorage() {
    const input = document.getElementById("storageInput").value;
    localStorage.setItem("savedText", input);
    document.getElementById("storageOutput").textContent = `Saved: ${input}`;
}

function loadFromLocalStorage() {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
        document.getElementById("storageOutput").textContent = `Saved: ${savedText}`;
    }
}
