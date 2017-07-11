/// <reference path="../definitions/jquery.d.ts" />
import * as $ from "jquery";

export const num = 12345;

export class StringBuilder {
    public Values : string[] = [];

    constructor(value: string = StringOperations.Empty) {
        this.Values = new Array(value);
    }

    public ToString() {
        return this.Values.join('');
    }
    public Append(value: string) {
        this.Values.push(value);
    }
    public AppendFormat(value: string, ...args : string[]) {
        this.Values.push(StringOperations.Format(value, ...args));
    }
    public Clear() {
        this.Values = [];
    }
}

export module String{
    export function IsNullOrWhiteSpace(value:string) : boolean{
        return StringOperations.IsNullOrWhiteSpace(value);
    }
}

export class StringOperations {
    public static Empty: string = "";

    public static IsNullOrWhiteSpace(value: string): boolean {
        try {
            if (value == null || value == 'undefined')
                return true;

            return value.toString().replace(/\s/g, '').length < 1;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    public static Join(delimiter: string, ...args: string[]): string {
        try {
            if ($.isArray(args[0]) || args[0] === typeof Array) {
                let tempString = StringOperations.Empty;
                let count = 0;

                for (let i = 0; i < args[0].length; i++) {
                    let current = args[0][i];
                    if (i < args[0].length - 1)
                        tempString += current + delimiter;
                    else
                        tempString += current;
                }

                return tempString;
            }
            else if (typeof args[0] == 'object') {
                let tempString = StringOperations.Empty;
                let count = 0;
                $(args[0]).each(function () {
                    if (count < args[0].length - 1)
                        tempString += $(this).text() + delimiter;
                    else
                        tempString += $(this).text();
                    count++;
                });

                return tempString;
            }

            return StringOperations.join(delimiter, args);
        }
        catch (e) {
            console.log(e);
            return StringOperations.Empty;
        }
    }

    public static Format(format: string, ...args: string[]): string {
        try {
            return format.replace(/{(\d+(:\w*)?)}/g, function (match, i) { //0
                let s = match.split(':');
                if (s.length > 1) {
                    i = i[0];
                    match = s[1].replace('}', ''); //U
                }

                let arg = StringOperations.parsePattern(match, args[i]);
                return typeof arg != 'undefined' && arg != null ? arg : StringOperations.Empty;
            });
        }
        catch (e) {
            console.log(e);
            return StringOperations.Empty;
        }
    }

    private static parsePattern(match: 'L' | 'U' | 'd' | 's' | 'n' | string, arg: string): string {
        if (arg == null || arg == undefined)
            return arg;

        switch (match) {
            case 'L':
                arg = arg.toLowerCase();
                break;
            case 'U':
                arg = arg.toUpperCase();
                break;
            case 'd':
                var splitted = arg.split('-');
                if (splitted.length <= 1)
                    return arg;

                var day = splitted[splitted.length - 1];
                var month = splitted[splitted.length - 2];
                var year = splitted[splitted.length - 3];
                day = day.split('T')[0];
                day = day.split(' ')[0];

                arg = day + '.' + month + '.' + year;
                break;
            case 's':
                var splitted = arg.replace(',', '').split('.');
                if (splitted.length <= 1)
                    return arg;

                let times = splitted[splitted.length - 1].split(' ');
                let time = splitted[0];
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
                break;
            case 'n': //Tausender Trennzeichen
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
                break;
            default:
                break;
        }

        return arg;
    }

    private static join(delimiter:string, args:string[]): string {
        let temp = StringOperations.Empty;
        for (let i = 0; i < args.length; i++) {
            if (StringOperations.IsNullOrWhiteSpace(args[i]) || (typeof args[i] != "number" && typeof args[i] != "string"))
                continue;

            let arg = "" + args[i];
            temp += arg;
            for (let i2 = i + 1; i2 < args.length; i2++) {
                if (StringOperations.IsNullOrWhiteSpace(args[i2]))
                    continue;

                temp += delimiter;
                i = i2 - 1;
                break;
            }
        }
        return temp;
    }
}
