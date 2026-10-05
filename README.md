# Toyota Burnaston exterior tour

A quick kiosk prototype with real live Google Street View panoramas. Open `dist/index.html` in a modern browser with internet access. There is no build step, API key or installation needed.

## What visitors can do

- Touch and drag the panorama to look around; use Google's native arrows to explore adjacent coverage.
- Select a named stop, or use Previous / Next stop.
- Tap Start over to reload the initial panorama and orientation.
- View instructions and use the full screen button.

This is an exterior tour around Toyota Motor Manufacturing UK's Burnaston vehicle plant, Derby DE1 9TA. It does not show factory interiors. The selected panoramas displayed an October 2021 capture date when verified on 2 October 2026. Google can update or remove imagery, and native Street View movement may leave the curated stops. The selected stop indicator tracks this app's chosen starting view, not movement inside Google's cross-origin iframe.

## Run on a Windows kiosk

For a quick attended demonstration, open `dist/index.html` in Microsoft Edge and select Full screen. For a deployed experience-centre terminal, serve the `dist` directory over HTTPS and configure Windows Assigned Access with Edge in public-browsing or digital-signage kiosk mode, as appropriate to the venue. Configure session reset, browser restrictions, device recovery and the permitted network domains at the kiosk/browser level. This prototype itself does not lock down the operating system or track touches inside Google's frame.

Keep a reliable internet connection. Allow Google's Maps/Street View resources through the venue firewall. Test on the actual touch display. The included HTML files need no sign-in or API key, but still need internet for Google imagery. If hosting the app, serve the contents of `dist/` as the website root.

## Imagery and implementation

- `dist/index.html` — kiosk shell and help dialog.
- `dist/styles.css` — desktop, tablet and narrow-screen layout.
- `dist/app.js` — stops, Google-supplied embed URLs, navigation and reset.

The URLs were obtained from Google Maps' **Share → Embed a map** UI. No Google Street View images or tiles were downloaded, cached or rehosted. Google's controls and attribution stay visible. Do not crop them away. This prototype sends normal embed requests to Google and inherits Google's availability, privacy notices and terms.

For an offline factory-interior installation, capture Toyota-approved 360-degree panoramas, obtain the required rights, and replace the Google iframe with a local panorama viewer and a curated scene graph.

## Sources

- Plant identity and address: https://www.toyotauk.com/other-information/contact-us
- Google Maps Street View embeds: use the source URLs in `dist/app.js`.
- Google Maps/Street View use guidance: https://about.google/brand-resource-center/products-and-services/geo-guidelines/
- Street View policies: https://developers.google.com/maps/documentation/streetview/policies

This is an independently prepared prototype for the requested Toyota experience-centre concept. It is not an official Toyota tour.
