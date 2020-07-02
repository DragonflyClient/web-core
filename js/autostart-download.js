// Autostart Download
window.addEventListener("load", () => {
    const downloadLink = $("a[data-download]")[0];
    setTimeout(() => {
        window.location = downloadLink.getAttribute("href");
        console.log("Hello");
    }, 2000);
});