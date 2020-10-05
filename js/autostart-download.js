// Autostart Download
window.addEventListener("load", () => {
    const downloadLink = $("a[data-download]")[0];
    setTimeout(() => {
        window.location = downloadLink.getAttribute("href");
    }, 1000);

    fetch("https://api.playdragonfly.net/v1/analytics/download", {
        method: "POST"
    })
});