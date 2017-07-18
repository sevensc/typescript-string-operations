"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringBuilder = (function () {
    function StringBuilder(value) {
        if (value === void 0) { value = String.Empty; }
        this.Values = [];
        this.Values = new Array(value);
    }
    StringBuilder.prototype.ToString = function () {
        return this.Values.join('');
    };
    StringBuilder.prototype.Append = function (value) {
        this.Values.push(value);
    };
    StringBuilder.prototype.AppendFormat = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.Values.push(String.Format.apply(String, [value].concat(args)));
    };
    StringBuilder.prototype.Clear = function () {
        this.Values = [];
    };
    return StringBuilder;
}());
exports.StringBuilder = StringBuilder;
var String = (function () {
    function String() {
    }
    String.IsNullOrWhiteSpace = function (value) {
        try {
            if (value == null || value == 'undefined')
                return true;
            return value.toString().replace(/\s/g, '').length < 1;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    String.Join = function (delimiter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        try {
            var firstArg = args[0];
            if (Array.isArray(firstArg) || firstArg instanceof Array) {
                var tempString = String.Empty;
                var count = 0;
                for (var i = 0; i < firstArg.length; i++) {
                    var current = firstArg[i];
                    if (i < firstArg.length - 1)
                        tempString += current + delimiter;
                    else
                        tempString += current;
                }
                return tempString;
            }
            else if (typeof firstArg === 'object') {
                var tempString_1 = String.Empty;
                var objectArg_1 = firstArg;
                var keys = Object.keys(firstArg);
                keys.forEach(function (element) { tempString_1 += objectArg_1[element] + delimiter; });
                tempString_1 = tempString_1.slice(0, tempString_1.length - delimiter.length);
                return tempString_1;
            }
            var stringArray = args;
            return String.join.apply(String, [delimiter].concat(stringArray));
        }
        catch (e) {
            console.log(e);
            return String.Empty;
        }
    };
    String.Format = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
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
        }
        catch (e) {
            console.log(e);
            return String.Empty;
        }
    };
    String.parsePattern = function (match, arg) {
        if (arg == null || arg == undefined)
            return arg;
        switch (match) {
            case 'L':
                arg = arg.toLowerCase();
                return arg;
            case 'U':
                arg = arg.toUpperCase();
                return arg;
            case 'd':
                if (typeof (arg) === 'string') {
                    var splitted = void 0;
                    splitted = arg.split('-');
                    if (splitted.length <= 1)
                        return arg;
                    var day = splitted[splitted.length - 1];
                    var month = splitted[splitted.length - 2];
                    var year = splitted[splitted.length - 3];
                    day = day.split('T')[0];
                    day = day.split(' ')[0];
                    arg = day + '.' + month + '.' + year;
                    return arg;
                }
                else if (arg instanceof Date) {
                    return String.Format('{0:00}.{1:00}.{2:0000}', arg.getDate(), arg.getMonth(), arg.getFullYear());
                }
                break;
            case 's':
                if (typeof (arg) === 'string') {
                    var splitted = arg.replace(',', '').split('.');
                    if (splitted.length <= 1)
                        return arg;
                    var times = splitted[splitted.length - 1].split(' ');
                    var time = splitted[0];
                    if (times.length > 1)
                        time = times[times.length - 1];
                    var year = splitted[splitted.length - 1].split(' ')[0];
                    var month = splitted[splitted.length - 2];
                    var day = splitted[splitted.length - 3];
                    arg = year + "-" + month + "-" + day;
                    if (time.length > 1)
                        arg += "T" + time;
                    else
                        arg += "T" + "00:00:00";
                    return arg;
                }
                else if (arg instanceof Date) {
                    return String.Format('{0:0000}-{1:00}-{2:00}', arg.getFullYear(), arg.getMonth(), arg.getDate());
                }
                break;
            case 'n':
                if (isNaN(parseInt(arg)) || arg.length <= 3)
                    break;
                arg = arg.toString();
                var mod = arg.length % 3;
                var output = (mod > 0 ? (arg.substring(0, mod)) : String.Empty);
                for (var i = 0; i < Math.floor(arg.length / 3); i++) {
                    if ((mod == 0) && (i == 0))
                        output += arg.substring(mod + 3 * i, mod + 3 * i + 3);
                    else
                        output += '.' + arg.substring(mod + 3 * i, mod + 3 * i + 3);
                }
                arg = output;
                return arg;
            default:
                break;
        }
        if (typeof (arg) === 'number')
            return String.formatNumber(arg, match);
        return arg;
    };
    String.formatNumber = function (input, formatTemplate) {
        var count = formatTemplate.length;
        var stringValue = input.toString();
        if (count <= stringValue.length)
            return stringValue;
        var remainingCount = count - stringValue.length;
        remainingCount += 1;
        return new Array(remainingCount).join('0') + stringValue;
    };
    String.join = function (delimiter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var temp = String.Empty;
        for (var i = 0; i < args.length; i++) {
            if ((typeof args[i] == 'string' && String.IsNullOrWhiteSpace(args[i])) || (typeof args[i] != "number" && typeof args[i] != "string"))
                continue;
            var arg = "" + args[i];
            temp += arg;
            for (var i2 = i + 1; i2 < args.length; i2++) {
                if (String.IsNullOrWhiteSpace(args[i2]))
                    continue;
                temp += delimiter;
                i = i2 - 1;
                break;
            }
        }
        return temp;
    };
    String.Empty = "";
    return String;
}());
exports.String = String;
