"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.num = 12345;
var StringBuilder = (function () {
    function StringBuilder(value) {
        if (value === void 0) { value = StringOperations.Empty; }
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
        this.Values.push(StringOperations.Format.apply(StringOperations, [value].concat(args)));
    };
    StringBuilder.prototype.Clear = function () {
        this.Values = [];
    };
    return StringBuilder;
}());
exports.StringBuilder = StringBuilder;
var StringOperations = (function () {
    function StringOperations() {
    }
    StringOperations.IsNullOrWhiteSpace = function (value) {
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
    StringOperations.Join = function (delimiter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        try {
            var firstArg = args[0];
            if (Array.isArray(firstArg) || firstArg instanceof Array) {
                var tempString = StringOperations.Empty;
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
                var tempString_1 = StringOperations.Empty;
                var objectArg_1 = firstArg;
                var keys = Object.keys(firstArg);
                keys.forEach(function (element) { tempString_1 += objectArg_1[element] + delimiter; });
                tempString_1 = tempString_1.slice(0, tempString_1.length - delimiter.length);
                return tempString_1;
            }
            var stringArray = args;
            return StringOperations.join.apply(StringOperations, [delimiter].concat(stringArray));
        }
        catch (e) {
            console.log(e);
            return StringOperations.Empty;
        }
    };
    StringOperations.Format = function (format) {
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
                var arg = StringOperations.parsePattern(match, args[i]);
                return typeof arg != 'undefined' && arg != null ? arg : StringOperations.Empty;
            });
        }
        catch (e) {
            console.log(e);
            return StringOperations.Empty;
        }
    };
    StringOperations.parsePattern = function (match, arg) {
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
                    return StringOperations.Format('{0:00}.{1:00}.{2:0000}', arg.getDate(), arg.getMonth(), arg.getFullYear());
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
                        time = time[time.length - 1];
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
                    return StringOperations.Format('{0:0000}-{1:00}-{2:00}', arg.getFullYear(), arg.getMonth(), arg.getDate());
                }
                break;
            case 'n':
                if (isNaN(parseInt(arg)) || arg.length <= 3)
                    break;
                arg = arg.toString();
                var mod = arg.length % 3;
                var output = (mod > 0 ? (arg.substring(0, mod)) : StringOperations.Empty);
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
            return StringOperations.formatNumber(arg, match);
        return arg;
    };
    StringOperations.formatNumber = function (input, formatTemplate) {
        var count = formatTemplate.length;
        var stringValue = input.toString();
        if (count <= stringValue.length)
            return stringValue;
        var remainingCount = count - stringValue.length;
        remainingCount += 1;
        return new Array(remainingCount).join('0') + stringValue;
    };
    StringOperations.join = function (delimiter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var temp = StringOperations.Empty;
        for (var i = 0; i < args.length; i++) {
            if ((typeof args[i] == 'string' && StringOperations.IsNullOrWhiteSpace(args[i])) || (typeof args[i] != "number" && typeof args[i] != "string"))
                continue;
            var arg = "" + args[i];
            temp += arg;
            for (var i2 = i + 1; i2 < args.length; i2++) {
                if (StringOperations.IsNullOrWhiteSpace(args[i2]))
                    continue;
                temp += delimiter;
                i = i2 - 1;
                break;
            }
        }
        return temp;
    };
    StringOperations.Empty = "";
    return StringOperations;
}());
var String;
(function (String) {
    String.Empty = StringOperations.Empty;
    function IsNullOrWhiteSpace(value) {
        return StringOperations.IsNullOrWhiteSpace(value);
    }
    String.IsNullOrWhiteSpace = IsNullOrWhiteSpace;
    function Join(delimiter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return StringOperations.Join.apply(StringOperations, [delimiter].concat(args));
    }
    String.Join = Join;
    function Format(format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return StringOperations.Format.apply(StringOperations, [format].concat(args));
    }
    String.Format = Format;
})(String = exports.String || (exports.String = {}));
