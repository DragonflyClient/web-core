// Autostart Download
window.addEventListener("load", () => {
    const downloadLink = $("a[data-download]")[0];
    setTimeout(() => {
        window.location = downloadLink.getAttribute("href");
    }, 1000);
});