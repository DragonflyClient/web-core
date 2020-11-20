// Autostart Download
window.addEventListener('load', () => {
  const downloadLink = $('a[data-download]')[0];
  if (!localStorage.getItem('visitedDownload')) {
    setTimeout(() => {
      window.location = downloadLink.getAttribute('href');
    }, 1000);

    fetch('https://api.playdragonfly.net/v1/analytics/download', {
      method: 'POST',
    });
    localStorage.setItem('visitedDownload', true);
  }
});
