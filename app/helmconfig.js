/*
 * Based on the template in Web Starter Kit : https://github.com/google/web-starter-kit/blob/master/app/index.html
 * To add to the config, add an object:
 * {
 *  type: 'link' | 'meta',
 *  sizes: 'widthxheight',
 *  rel: 'rel value'
 *  filename: <Name of your file'
 * }
 */

// Import all your needed files first (webpack will grab the url)
import chromecon from 'file!images/android-chrome-192x192.png';
import applecon from 'file!images/apple-touch-icon.png';
import mscon from 'file!images/mstile-150x150.png';
import favicon from 'file!images/favicon.ico';
import ogicon from 'file!images/stackduino_boards.jpg';

const defaultMetaDesc = 'An Arduino compatible focus stacking controller for macro photography';

const config = {
  titleTemplate: 'Stackduino: Arduino Focus Stacking | %s',
  link: [
    // Add to homescreen for Chrome on Android
    { 'rel': 'icon', 'href': favicon },
    { 'rel': 'icon', 'sizes': '192x192', 'href': chromecon },
    // Add to homescreen for Safari on IOS
    { 'rel': 'apple-touch-icon', 'sizes': '152x152', 'href': applecon },
    { 'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Economica:700', 'type': 'text/css' },
    { 'rel': 'stylesheet', 'href': 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', 'type': 'text/css' },
    { 'rel': 'stylesheet', 'href': '/assets/styles/main.css' }
  ],
  meta: [
    { 'charset': 'utf-8' },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { 'name': 'description', 'content': defaultMetaDesc },
    // Mobile Safari introduced this tag to let web developers control the viewport's size and scale
    // The width property controls the size of the viewport, the initial-scale property controls
    // the zoom level when the page is first loaded
    { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' },
    // Add to homescreen for Chrome on Android
    { 'name': 'mobile-web-app-capable', 'content': 'yes' },
    // Add to homescreen for Safari on IOS
    { 'name': 'apple-mobile-web-app-capable', 'content': 'yes' },
    { 'name': 'apple-mobile-web-app-status-bar-style', 'content': 'black' },
    { 'name': 'apple-mobile-web-app-title', 'content': 'Stackduino' },
    // Tile icon for Win8 (144x144 + tile color)
    { 'name': 'msapplication-TileImage', 'content': mscon },
    { 'name': 'msapplication-TileColor', 'content': '#3372DF' },
    // og tags
    { 'name': 'og:site_name', 'content': 'Stackduino' },
    { 'name': 'og:description', 'content': defaultMetaDesc },
    { 'name': 'og:image:secure_url', 'content': ogicon }
  ]
};

export default config;
