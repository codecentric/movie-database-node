/*jshint maxstatements:50 */

'use strict';

exports = module.exports = function () {

    var exports = {};

    exports.sayHello = function (req, res) {
        res.send('Hello World - now automatically deployed!');
    };

    return exports;
};
