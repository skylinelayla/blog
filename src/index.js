/**
 * @file index.js
 * @author shikun
 */
import {markdown} from 'markdown';

(function () {
    let article = document.getElementsByClassName('article')[0];
    article.innerHTML = markdown.toHTML('### hello world');
})();
