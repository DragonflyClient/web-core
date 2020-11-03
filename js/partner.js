let params = new URL(document.location).searchParams;

window.addEventListener('load', () => {
	const utmSource = params.get('utm_source');
	if (utmSource.toLowerCase() === 'partner') {
		const utmCampaign = params.get('utm_campaign');
		document.cookie = `partner=${utmCampaign}`;
	}
	if (window.location.search.indexOf('utm_source') > -1)
		setTimeout(() => {
			window.history.pushState({}, document.title, '/');
		}, 50);
});
