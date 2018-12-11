/**
 * @file index.js
 * @author shikun
 */
import showdown from 'showdown';
import $ from 'jquery';
import Mustache from 'mustache';

const listTpl = [
    '{{#list}}',
    '<div class="post">',
        '<span class="date">',
            '{{date}}',
        '</span>',
        '<a href="article?id={{_id}}">',
            '{{title}}',
        '</a>',
    '</div>',
    '{{/list}}'
].join('');

const blogTpl = [
    '<h1>{{title}}</h1>',
    '<p>{{date}}</p>'
].join('');

(function () {
    if (window.location.href.indexOf('blog') > -1) {
        setList();
    }
    else {
        setContent();
    }
    function setList() {
        $.get('http://localhost:8825/all', (data, status) => {
            Mustache.parse(listTpl);
            $('#posts').html(Mustache.render(listTpl, {list: data}));
        });
    }
    function setContent() {
        $.get(`http://localhost:8825/blog/${window.location.href.split('?')[1].replace('id=', '')}`, (data, status) => {
            Mustache.parse(blogTpl);
            $('#article-meta').html(Mustache.render(blogTpl, data));
            let converter = new showdown.Converter();
            $('#article').html(converter.makeHtml(data.content));
        });
    }
})();
