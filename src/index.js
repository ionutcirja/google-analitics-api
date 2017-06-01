/* eslint-disable no-param-reassign, dot-notation */
const loadGASDK = () => {
    ((i, s, o, g, r, a, m) => {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function (...args) { (i[r].q = i[r].q || []).push(args); };
        i[r].l = 1 * new Date();
        a = s.createElement(o);
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
};
/* eslint-enable */

const init = (trackingID, options) => {
    loadGASDK();
    window.ga('create', trackingID, options);
};

const track = (options) => {
    window.ga('send', options);
};

export default {
    init,
    track,
};
