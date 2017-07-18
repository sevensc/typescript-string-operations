export class StringBuilder {
    public Values: string[] = [];

    constructor(value: string = String.Empty) {
        this.Values = new Array(value);
    }
    public ToString() {
        return this.Values.join('');
    }
    public Append(value: string) {
        this.Values.push(value);
    }
    public AppendFormat(value: string, ...args: string[]) {
        this.Values.push(String.Format(value, ...args));
    }
    public Clear() {
        this.Values = [];
    }
}


export class String {
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

    public static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string {
        try {
            let firstArg = args[0];
            if (Array.isArray(firstArg) || firstArg instanceof Array) {
                let tempString = String.Empty;
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
                let tempString = String.Empty;
                let objectArg = firstArg;
                let keys = Object.keys(firstArg); //get all Properties of the Object as Array
                keys.forEach(element => { tempString += (<any>objectArg)[element] + delimiter; });
                tempString = tempString.slice(0, tempString.length - delimiter.length); //remove last delimiter
                return tempString;
            }
            let stringArray = <string[]>args;

            return String.join(delimiter, ...stringArray);
        }
        catch (e) {
            console.log(e);
            return String.Empty;
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

                let arg = String.parsePattern(match, args[i]);
                return typeof arg != 'undefined' && arg != null ? arg : String.Empty;
            });
        }
        catch (e) {
            console.log(e);
            return String.Empty;
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
                    return String.getDisplayDateFromString(arg);
                }
                else if (arg instanceof Date) {
                    return String.Format('{0:00}.{1:00}.{2:0000}', arg.getDate(), arg.getMonth(), arg.getFullYear());
                }
                break;
            case 's':
                if (typeof (arg) === 'string') {
                    return String.getSortableDateFromString(arg);
                }
                else if (arg instanceof Date) {
                    return String.Format('{0:0000}-{1:00}-{2:00}', arg.getFullYear(), arg.getMonth(), arg.getDate());
                }
                break;
            case 'n': //Tausender Trennzeichen
                let replacedString = arg.replace(/,/g,'.');
                if (isNaN(parseFloat(replacedString)) || replacedString.length <= 3)
                    break;

                let numberparts = replacedString.split(/[^0-9]+/g);
                let parts = numberparts;

                if(numberparts.length > 1){
                    parts = [String.join('',...(numberparts.splice(0, numberparts.length -1 ))), numberparts[numberparts.length-1]];
                }

                let integer = parts[0];

                var mod = integer.length % 3;
                var output = (mod > 0 ? (integer.substring(0, mod)) : String.Empty);
                var firstGroup = output;
                var remainingGroups = integer.substring(mod).match(/.{3}/g);
                output =  output + '.' + String.Join('.',remainingGroups);
                arg = output + (parts.length > 1 ? ','+ parts[1] : '');
                return arg;
            default:
                break;
        }

        if (typeof (arg) === 'number')
            return String.formatNumber(arg, match);

        return arg;
    }

    private static getDisplayDateFromString(input: string): string {
        let splitted: string[];
        splitted = input.split('-');

        if (splitted.length <= 1)
            return input;

        let day = splitted[splitted.length - 1];
        let month = splitted[splitted.length - 2];
        let year = splitted[splitted.length - 3];
        day = day.split('T')[0];
        day = day.split(' ')[0];

        return day + '.' + month + '.' + year;
    }

    private static getSortableDateFromString(input: string): string {
        let splitted = input.replace(',', '').split('.');
        if (splitted.length <= 1)
            return input;

        let times = splitted[splitted.length - 1].split(' ');
        let time = splitted[0];
        if (times.length > 1)
            time = times[times.length - 1];

        let year = splitted[splitted.length - 1].split(' ')[0];
        let month = splitted[splitted.length - 2];
        let day = splitted[splitted.length - 3];

        let result = year + "-" + month + "-" + day;
        if (time.length > 1)
            result += "T" + time;
        else
            result += "T" + "00:00:00";
        return result;
    }

    private static formatNumber(input: number, formatTemplate: string): string {
        let count = formatTemplate.length;
        let stringValue = input.toString();
        if (count <= stringValue.length)
            return stringValue;

        let remainingCount = count - stringValue.length;
        remainingCount += 1; //Das Array muss einen Eintrag mehr als die benötigten Nullen besitzen
        return new Array(remainingCount).join('0') + stringValue;
    }

    private static join(delimiter: string, ...args: string[]): string {
        let temp = String.Empty;
        for (let i = 0; i < args.length; i++) {
            if ((typeof args[i] == 'string' && String.IsNullOrWhiteSpace(args[i])) || (typeof args[i] != "number" && typeof args[i] != "string"))
                continue;

            let arg = "" + args[i];
            temp += arg;
            for (let i2 = i + 1; i2 < args.length; i2++) {
                if (String.IsNullOrWhiteSpace(args[i2]))
                    continue;

                temp += delimiter;
                i = i2 - 1;
                break;
            }
        }
        return temp;
    }
}