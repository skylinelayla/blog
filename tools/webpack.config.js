/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-06-20 11:55:56
 * @LastEditTime: 2018-11-29 20:23:43
 * @LastEditors: your name
 */

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}