export const num = 12345;

export class StringBuilder {
    public Values: string[] = [];

    constructor(value: string = StringOperations.Empty) {
        this.Values = new Array(value);
    }
    public ToString() {
        return this.Values.join('');
    }
    public Append(value: string) {
        this.Values.push(value);
    }
    public AppendFormat(value: string, ...args: string[]) {
        this.Values.push(StringOperations.Format(value, ...args));
    }
    public Clear() {
        this.Values = [];
    }
}


class StringOperations {
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

    public static Join(delimiter: string, ...args: (string|object|Array<any>)[]): string {
        try {
            let firstArg = args[0];
            if (Array.isArray(firstArg) || firstArg instanceof Array) {
                let tempString = StringOperations.Empty;
                let count = 0;

                for (let i = 0; i < firstArg.length; i++) {
                    let current = firstArg[i];
                    if (i < firstArg.length - 1)
                        tempString += current + delimiter;
                    else
                        tempString += current;
                }

                return tempString;
            }
            else if (typeof firstArg === 'object') {
                let tempString = StringOperations.Empty;
                let objectArg = firstArg;
                let keys = Object.keys(firstArg); //get all Properties of the Object as Array
                keys.forEach( element  => { tempString += (<any>objectArg)[element] + delimiter; });
                tempString = tempString.slice(0, tempString.length - delimiter.length); //remove last delimiter
                return tempString;
            }
            let stringArray = <string[]>args;

            return StringOperations.join(delimiter, ...stringArray);
        }
        catch (e) {
            console.log(e);
            return StringOperations.Empty;
        }
    }

    public static Format(format: string, ...args: (string | Date | number | any)[]): string {
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

    private static parsePattern(match: 'L' | 'U' | 'd' | 's' | 'n' | string, arg: string | Date | number | any): string {
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
                    let splitted: string[];
                    splitted = arg.split('-');

                    if (splitted.length <= 1)
                        return arg;

                    let day = splitted[splitted.length - 1];
                    let month = splitted[splitted.length - 2];
                    let year = splitted[splitted.length - 3];
                    day = day.split('T')[0];
                    day = day.split(' ')[0];

                    arg = day + '.' + month + '.' + year;
                    return arg;
                }
                else if(arg instanceof Date){
                    return StringOperations.Format('{0:00}.{1:00}.{2:0000}', arg.getDate(), arg.getMonth(), arg.getFullYear());
                }
                break;
            case 's':
                if (typeof (arg) === 'string') {
                    let splitted = arg.replace(',', '').split('.');
                    if (splitted.length <= 1)
                        return arg;

                    let times = splitted[splitted.length - 1].split(' ');
                    let time = splitted[0];
                    if (times.length > 1)
                        time = time[time.length - 1];

                    let year = splitted[splitted.length - 1].split(' ')[0];
                    let month = splitted[splitted.length - 2];
                    let day = splitted[splitted.length - 3];

                    arg = year + "-" + month + "-" + day;
                    if (time.length > 1)
                        arg += "T" + time;
                    else
                        arg += "T" + "00:00:00";
                    return arg;
                }
                else if(arg instanceof Date){
                    return StringOperations.Format('{0:0000}-{1:00}-{2:00}', arg.getFullYear(), arg.getMonth(), arg.getDate());
                }
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
                return arg;
            default:
                break;
        }

        if(typeof(arg) === 'number')
            return StringOperations.formatNumber(arg, match);

        return arg;
    }
    private static formatNumber(input: number, formatTemplate : string) : string
    {
        let count = formatTemplate.length;
        let stringValue = input.toString();
        if( count <= stringValue.length)
            return stringValue;

        let remainingCount = count - stringValue.length;
        remainingCount += 1; //Das Array muss einen Eintrag mehr als die benötigten Nullen besitzen
        return new Array(remainingCount).join('0') + stringValue;
    }

    private static join(delimiter: string, ...args: string[]): string {
        let temp = StringOperations.Empty;
        for (let i = 0; i < args.length; i++) {
            if (( typeof args[i] == 'string' && StringOperations.IsNullOrWhiteSpace(args[i])) || (typeof args[i] != "number" && typeof args[i] != "string"))
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

export module String {
    export const Empty = StringOperations.Empty;
    export function IsNullOrWhiteSpace(value: string): boolean {
        return StringOperations.IsNullOrWhiteSpace(value);
    }
    export function Join(delimiter: string, ...args: (string|object|Array<any>)[]): string {
        return StringOperations.Join(delimiter, ...args);
    }
    export function Format(format: string, ...args: (string | Date | number | any)[]): string {
        return StringOperations.Format(format, ...args);
    }
}