import mime from 'mime-types';
window.mime = mime;

// This import is managed via webpack.
import Configuration from 'config';

// ca-app-pub-4637983949499079~2000555188
// admob.setOptions({
//     publisherId:           "ca-app-pub-3940256099942544/6300978111",  // Required
//     autoShowBanner:        true,                                      // Optional
//     autoShowRInterstitial: false,                                     // Optional
//     autoShowRewarded:      false,                                     // Optional
// });
//
// admob.createBannerView();
window.Configuration = new Configuration();
window.Configuration.initialize().then(() => {
    dispatchEvent(new CustomEvent('klickbait-ready'));
}).catch(e => {
    console.error('Cordova core could not be defined.', e);
});
