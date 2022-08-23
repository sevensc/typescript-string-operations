const EOL = '\r\n';

export const empty = '';

export function isNullOrWhiteSpace(value: string | null): boolean {
    return String.isNullOrWhiteSpace(value);
}

export function join(delimiter: string, ...args: (string | object | Array<any>)[]): string {
    return String.join(delimiter, ...args);
}

export function format(format: string, ...args: any[]): string {
    return String.format(format, ...args);
}

export class String {
    private static readonly regexNumber = /{(\d+(:\w*)?)}/g;
    private static readonly regexObject = /{(\w+(:\w*)?)}/g;
    public static empty = '';
    /**
     * @deprecated The property should not be used, and will be removed in future versions! Use `String.empty` instead.
    */
    public static Empty = '';

    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `String.isNullOrWhiteSpace()` instead.
    */
    public static IsNullOrWhiteSpace(value: string | null | undefined): boolean {
        return String.isNullOrWhiteSpace(value);
    }

    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `String.join()` instead.
    */
    public static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string {
        return String.join(delimiter, ...args);
    }

    /**
     * @deprecated The method should not be used, and will be removed in future version!s Use `String.format()` instead.
    */
    public static Format(format: string, ...args: any[]): string {
        return String.format(format, ...args);
    }

    public static isNullOrWhiteSpace(value: string | null): boolean {
        try {
            if (value == null || value == 'undefined') {
                return true;
            }

            return value.toString().replace(/\s/g, '').length < 1;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    public static join(delimiter: string, ...args: (string | object | Array<any>)[]): string {
        try {
            const firstArg = args[0];
            if (Array.isArray(firstArg) || firstArg instanceof Array) {
                let tempString = String.empty;

                for (let i = 0; i < firstArg.length; i++) {
                    const current = firstArg[i];
                    if (i < firstArg.length - 1) {
                        tempString += current + delimiter;
                    }
                    else {
                        tempString += current;
                    }
                }

                return tempString;
            }
            else if (typeof firstArg === 'object') {
                let tempString = String.empty;
                const objectArg = firstArg;
                const keys = Object.keys(firstArg); //get all Properties of the Object as Array
                keys.forEach(element => { tempString += (<any>objectArg)[element] + delimiter; });
                tempString = tempString.slice(0, tempString.length - delimiter.length); //remove last delimiter
                return tempString;
            }

            const stringArray = <string[]>args;

            return String.joinString(delimiter, ...stringArray);
        }
        catch (e) {
            console.log(e);
            return String.empty;
        }
    }

    public static format(format: string, ...args: any[]): string {
        try {
            if (format.match(String.regexNumber)) {
                return String.formatString(String.regexNumber, format, args);
            }

            if (format.match(String.regexObject)) {
                return String.formatString(String.regexObject, format, args, true);
            }

            return format;
        }
        catch (e) {
            console.log(e);
            return String.empty;
        }
    }

    private static formatString(regex: any, format: string, args: any, parseByObject = false): string {
        return format.replace(regex, function (match, x) { //0
            const s = match.split(':');
            if (s.length > 1) {
                x = s[0].replace('{', '');
                match = s[1].replace('}', ''); //U
            }

            let arg;
            if (parseByObject) {
                arg = args[0][x];
            }
            else {
                arg = args[x];
            }

            if (arg == null || arg == undefined || match.match(/{\d+}/)) {
                return arg;
            }

            arg = String.parsePattern(match, arg);
            return typeof arg != 'undefined' && arg != null ? arg : String.empty;
        });
    }

    private static parsePattern(match: 'L' | 'U' | 'd' | 's' | 'n' | 'x' | 'X' | string, arg: string | Date | number | any): string {
        switch (match) {
            case 'L': {
                arg = arg.toLocaleLowerCase();
                return arg;
            }
            case 'U': {
                arg = arg.toLocaleUpperCase();
                return arg;
            }
            case 'd': {
                if (typeof (arg) === 'string') {
                    return String.getDisplayDateFromString(arg);
                }
                else if (arg instanceof Date) {
                    return String.format('{0:00}.{1:00}.{2:0000}', arg.getDate(), arg.getMonth(), arg.getFullYear());
                }
                break;
            }
            case 's': {
                if (typeof (arg) === 'string') {
                    return String.getSortableDateFromString(arg);
                }
                else if (arg instanceof Date) {
                    return String.format('{0:0000}-{1:00}-{2:00}', arg.getFullYear(), arg.getMonth(), arg.getDate());
                }
                break;
            }
            case 'n': {//Tausender Trennzeichen
                if (typeof (arg) !== 'string')
                    arg = arg.toString();
                const replacedString = arg.replace(/,/g, '.');
                if (isNaN(parseFloat(replacedString)) || replacedString.length <= 3) {
                    break;
                }

                const numberparts = replacedString.split(/\D+/g);
                let parts = numberparts;

                if (numberparts.length > 1) {
                    parts = [String.joinString('', ...(numberparts.splice(0, numberparts.length - 1))), numberparts[numberparts.length - 1]];
                }

                const integer = parts[0];

                const mod = integer.length % 3;
                let output = (mod > 0 ? (integer.substring(0, mod)) : String.empty);

                const remainingGroups = integer.substring(mod).match(/.{3}/g);
                output = output + '.' + String.join('.', remainingGroups);
                arg = output + (parts.length > 1 ? ',' + parts[1] : '');
                return arg;
            }
            case 'x': {
                return this.decimalToHexString(arg);
            }
            case 'X': {
                return this.decimalToHexString(arg, true);
            }
            default: {
                break;
            }
        }

        if ((typeof (arg) === 'number' || !isNaN(arg)) && !isNaN(+match) && !String.isNullOrWhiteSpace(arg)) {
            return String.formatNumber(arg, match);
        }

        return arg;
    }

    private static decimalToHexString(value: string, upperCase = false) {
        const parsed = parseFloat(value);
        const hexNumber = parsed.toString(16);
        return upperCase ? hexNumber.toLocaleUpperCase() : hexNumber;
    }

    private static getDisplayDateFromString(input: string): string {
        const splitted: string[] = input.split('-');

        if (splitted.length <= 1) {
            return input;
        }

        let day = splitted[splitted.length - 1];
        const month = splitted[splitted.length - 2];
        const year = splitted[splitted.length - 3];
        day = day.split('T')[0];
        day = day.split(' ')[0];

        return `${day}.${month}.${year}`;
    }

    private static getSortableDateFromString(input: string): string {
        const splitted = input.replace(',', '').split('.');
        if (splitted.length <= 1) {
            return input;
        }

        const times = splitted[splitted.length - 1].split(' ');
        let time = String.empty;
        if (times.length > 1) {
            time = times[times.length - 1];
        }

        const year = splitted[splitted.length - 1].split(' ')[0];
        const month = splitted[splitted.length - 2];
        const day = splitted[splitted.length - 3];
        let result = `${year}-${month}-${day}`;

        if (!String.isNullOrWhiteSpace(time) && time.length > 1) {
            result += `T${time}`;
        }
        else {
            result += 'T00:00:00';
        }

        return result;
    }

    private static formatNumber(input: number, formatTemplate: string): string {
        const count = formatTemplate.length;
        const stringValue = input.toString();
        if (count <= stringValue.length) {
            return stringValue;
        }

        let remainingCount = count - stringValue.length;
        remainingCount += 1; //Array must have an extra entry

        return new Array(remainingCount).join('0') + stringValue;
    }

    private static joinString(delimiter: string, ...args: string[]): string {
        let temp = String.empty;
        for (let i = 0; i < args.length; i++) {
            if ((typeof args[i] == 'string' && String.isNullOrWhiteSpace(args[i]))
                || (typeof args[i] != 'number' && typeof args[i] != 'string')) {
                continue;
            }

            const arg = '' + args[i];
            temp += arg;
            for (let i2 = i + 1; i2 < args.length; i2++) {
                if (String.isNullOrWhiteSpace(args[i2])) {
                    continue;
                }

                temp += delimiter;
                i = i2 - 1;
                break;
            }
        }

        return temp;
    }
}


export class StringBuilder {
    public Values: string[];

    constructor(value = '') {
        this.Values = [];

        if (!String.isNullOrWhiteSpace(value)) {
            this.Values = new Array(value);
        }
    }

    public toString() {
        return this.Values.join(String.empty);
    }

    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `toString()` instead.
    */
    public ToString() {
        return this.toString();
    }

    public append(value: string) {
        this.Values.push(value);
    }

    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `append()` instead.
    */
    public Append(value: string) {
        this.append(value);
    }

    public appendLine(value: string) {
        this.Values.push(EOL + value);
    }

    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `appendLine()` instead.
    */
    public AppendLine(value: string) {
        this.appendLine(value);
    }

    public appendFormat(format: string, ...args: any[]) {
        this.Values.push(String.format(format, ...args));
    }

    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `appendFormat()` instead.
    */
    public AppendFormat(format: string, ...args: any[]) {
        this.appendFormat(format, ...args);
    }

    public appendLineFormat(format: string, ...args: any[]) {
        this.Values.push(EOL + String.format(format, ...args));
    }

    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `appendLineFormat()` instead.
    */
    public AppendLineFormat(format: string, ...args: any[]) {
        return this.appendLineFormat(format, ...args);
    }

    public clear() {
        this.Values = [];
    }

    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `clear()` instead.
    */
    public Clear() {
        this.clear();
    }

}