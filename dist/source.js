'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var String = exports.String = function () {
    function String() {
        _classCallCheck(this, String);
    }

    _createClass(String, null, [{
        key: 'IsNullOrWhiteSpace',
        value: function IsNullOrWhiteSpace(value) {
            try {
                if (value == null || value == 'undefined') return true;
                return value.toString().replace(/\s/g, '').length < 1;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }, {
        key: 'Join',
        value: function Join(delimiter) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            try {
                if ($.isArray(args[0]) || args[0] === (typeof Array === 'undefined' ? 'undefined' : _typeof(Array))) {
                    var tempString = String.Empty;
                    var count = 0;
                    for (var i = 0; i < args[0].length; i++) {
                        var current = args[0][i];
                        if (i < args[0].length - 1) tempString += current + delimiter;else tempString += current;
                    }
                    return tempString;
                } else if (_typeof(args[0]) == 'object') {
                    var tempString = String.Empty;
                    var count = 0;
                    $(args[0]).each(function () {
                        if (count < args[0].length - 1) tempString += $(this).text() + delimiter;else tempString += $(this).text();
                        count++;
                    });
                    return tempString;
                }
                return String.join(delimiter, args);
            } catch (e) {
                console.log(e);
                return String.Empty;
            }
        }
    }, {
        key: 'Format',
        value: function Format(format) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            try {
                return format.replace(/{(\d+(:\w*)?)}/g, function (match, i) {
                    var s = match.split(':');
                    if (s.length > 1) {
                        i = i[0];
                        match = s[1].replace('}', '');
                    }
                    var arg = String.parsePattern(match, args[i]);
                    return typeof arg != 'undefined' && arg != null ? arg : String.Empty;
                });
            } catch (e) {
                console.log(e);
                return String.Empty;
            }
        }
    }, {
        key: 'parsePattern',
        value: function parsePattern(match, arg) {
            if (arg == null || arg == undefined) return arg;
            switch (match) {
                case 'L':
                    arg = arg.toLowerCase();
                    break;
                case 'U':
                    arg = arg.toUpperCase();
                    break;
                case 'd':
                    var splitted = arg.split('-');
                    if (splitted.length <= 1) return arg;
                    var day = splitted[splitted.length - 1];
                    var month = splitted[splitted.length - 2];
                    var year = splitted[splitted.length - 3];
                    day = day.split('T')[0];
                    day = day.split(' ')[0];
                    arg = day + '.' + month + '.' + year;
                    break;
                case 's':
                    var splitted = arg.replace(',', '').split('.');
                    if (splitted.length <= 1) return arg;
                    var times = splitted[splitted.length - 1].split(' ');
                    var time = splitted[0];
                    if (times.length > 1) time = time[time.length - 1];
                    var year = splitted[splitted.length - 1].split(' ')[0];
                    var month = splitted[splitted.length - 2];
                    var day = splitted[splitted.length - 3];
                    arg = year + "-" + month + "-" + day;
                    if (time.length > 1) arg += "T" + time;else arg += "T" + "00:00:00";
                    break;
                case 'n':
                    if (isNaN(parseInt(arg)) || arg.length <= 3) break;
                    arg = arg.toString();
                    var mod = arg.length % 3;
                    var output = mod > 0 ? arg.substring(0, mod) : String.Empty;
                    for (var i = 0; i < Math.floor(arg.length / 3); i++) {
                        if (mod == 0 && i == 0) output += arg.substring(mod + 3 * i, mod + 3 * i + 3);else output += '.' + arg.substring(mod + 3 * i, mod + 3 * i + 3);
                    }
                    arg = output;
                    break;
                default:
                    break;
            }
            return arg;
        }
    }, {
        key: 'join',
        value: function join(delimiter, args) {
            var temp = String.Empty;
            for (var i = 0; i < args.length; i++) {
                if (String.IsNullOrWhiteSpace(args[i]) || typeof args[i] != "number" && typeof args[i] != "string") continue;
                var arg = "" + args[i];
                temp += arg;
                for (var i2 = i + 1; i2 < args.length; i2++) {
                    if (String.IsNullOrWhiteSpace(args[i2])) continue;
                    temp += delimiter;
                    i = i2 - 1;
                    break;
                }
            }
            return temp;
        }
    }]);

    return String;
}();

String.Empty = "";

var StringBuilder = exports.StringBuilder = function () {
    function StringBuilder() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : String.Empty;

        _classCallCheck(this, StringBuilder);

        this.Values = [];
        this.Values = new Array(value);
    }

    _createClass(StringBuilder, [{
        key: 'ToString',
        value: function ToString() {
            return this.Values.join('');
        }
    }, {
        key: 'Append',
        value: function Append(value) {
            this.Values.push(value);
        }
    }, {
        key: 'AppendFormat',
        value: function AppendFormat(value) {
            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
            }

            this.Values.push(String.Format.apply(String, [value].concat(args)));
        }
    }, {
        key: 'Clear',
        value: function Clear() {
            this.Values = [];
        }
    }]);

    return StringBuilder;
}();