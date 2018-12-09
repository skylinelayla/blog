/**
 * @file index.js
 * @author shikun
 */
import {markdown} from 'markdown';
import $ from 'jquery';
import Mustache from 'mustache';

const axios = require('axios');
let index = [
    {
        title: 'first commit',
        date: '2018-12-09'
    }
];

(function () {

    let article = document.getElementsByClassName('article')[0];
    article.innerHTML = markdown.toHTML('### hello world');

    
})();
