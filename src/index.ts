export class $String {
    private static readonly regexNumber = /{(\d+(:\w*)?)}/g;
    private static readonly regexObject = /{(\w+(:\w*)?)}/g;

    public static Empty: string = '';

    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    static IsNullOrWhiteSpace(value: string): boolean {
        return $String.isNullOrWhiteSpace(value);
    }

    static isNullOrWhiteSpace(value: string): boolean {
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

    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string {
        return $String.join(delimiter, ...args);
    }

    static join(delimiter: string, ...args: (string | object | Array<any>)[]): string {
        try {
            let firstArg = args[0];
            if (Array.isArray(firstArg) || firstArg instanceof Array) {
                let tempString = $String.Empty;
                let count = 0;

                for (let i = 0; i < firstArg.length; i++) {
                    let current = firstArg[i];
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
                let tempString = $String.Empty;
                let objectArg = firstArg;
                let keys = Object.keys(firstArg); //get all Properties of the Object as Array
                keys.forEach(element => { tempString += (<any>objectArg)[element] + delimiter; });
                tempString = tempString.slice(0, tempString.length - delimiter.length); //remove last delimiter
                return tempString;
            }

            let stringArray = <string[]>args;

            return $String.joinInternal(delimiter, ...stringArray);
        }
        catch (e) {
            console.log(e);
            return $String.Empty;
        }
    }

    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    static Format(format: string, ...args: any[]): string {
        return $String.format(format, ...args);
    }

    static format(format: string, ...args: any[]): string {
        try {
            if (format.match($String.regexNumber)) {
                return $String.formatInternal($String.regexNumber, format, args);
            }

            if (format.match($String.regexObject)) {
                return $String.formatInternal($String.regexObject, format, args, true);
            }

            return format;
        }
        catch (e) {
            console.log(e);
            return $String.Empty;
        }
    }

    private static formatInternal(regex: any, format: string, args: any, parseByObject: boolean = false): string {
        return format.replace(regex, function (match, x) { //0
            let s = match.split(':');
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

            arg = $String.parsePattern(match, arg);
            return typeof arg != 'undefined' && arg != null ? arg : $String.Empty;
        });
    }

    private static parsePattern(match: 'L' | 'U' | 'd' | 's' | 'n' | string, arg: string | Date | number | any): string {
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
                    return $String.getDisplayDateFromString(arg);
                }
                else if (arg instanceof Date) {
                    return $String.format('{0:00}.{1:00}.{2:0000}', arg.getDate(), arg.getMonth(), arg.getFullYear());
                }
                break;
            }
            case 's': {
                if (typeof (arg) === 'string') {
                    return $String.getSortableDateFromString(arg);
                }
                else if (arg instanceof Date) {
                    return $String.format('{0:0000}-{1:00}-{2:00}', arg.getFullYear(), arg.getMonth(), arg.getDate());
                }
                break;
            }
            case 'n': {//Tausender Trennzeichen
                if (typeof (arg) !== "string")
                    arg = arg.toString();
                let replacedString = arg.replace(/,/g, '.');
                if (isNaN(parseFloat(replacedString)) || replacedString.length <= 3) {
                    break;
                }

                let numberparts = replacedString.split(/[^0-9]+/g);
                let parts = numberparts;

                if (numberparts.length > 1) {
                    parts = [$String.joinInternal('', ...(numberparts.splice(0, numberparts.length - 1))), numberparts[numberparts.length - 1]];
                }

                let integer = parts[0];

                var mod = integer.length % 3;
                var output = (mod > 0 ? (integer.substring(0, mod)) : $String.Empty);
                var firstGroup = output;
                var remainingGroups = integer.substring(mod).match(/.{3}/g);
                output = output + '.' + $String.join('.', remainingGroups);
                arg = output + (parts.length > 1 ? ',' + parts[1] : '');
                return arg;
            }
            default: {
                break;
            }
        }

        if ((typeof (arg) === 'number' || !isNaN(arg)) && !isNaN(+match) && !$String.isNullOrWhiteSpace(arg)) {
            return $String.formatNumber(arg, match);
        }

        return arg;
    }

    private static getDisplayDateFromString(input: string): string {
        let splitted: string[];
        splitted = input.split('-');

        if (splitted.length <= 1) {
            return input;
        }

        let day = splitted[splitted.length - 1];
        let month = splitted[splitted.length - 2];
        let year = splitted[splitted.length - 3];
        day = day.split('T')[0];
        day = day.split(' ')[0];

        return `${day}.${month}.${year}`;
    }

    private static getSortableDateFromString(input: string): string {
        let splitted = input.replace(',', '').split('.');
        if (splitted.length <= 1) {
            return input;
        }

        let times = splitted[splitted.length - 1].split(' ');
        let time = $String.Empty;
        if (times.length > 1) {
            time = times[times.length - 1];
        }

        let year = splitted[splitted.length - 1].split(' ')[0];
        let month = splitted[splitted.length - 2];
        let day = splitted[splitted.length - 3];
        let result = `${year}-${month}-${day}`

        if (!$String.IsNullOrWhiteSpace(time) && time.length > 1) {
            result += `T${time}`;
        }
        else {
            result += "T00:00:00";
        }

        return result;
    }

    private static formatNumber(input: number, formatTemplate: string): string {
        let count = formatTemplate.length;
        let stringValue = input.toString();
        if (count <= stringValue.length) {
            return stringValue;
        }

        let remainingCount = count - stringValue.length;
        remainingCount += 1; //Array must have an extra entry

        return new Array(remainingCount).join('0') + stringValue;
    }

    private static joinInternal(delimiter: string, ...args: string[]): string {
        let temp = $String.Empty;
        for (let i = 0; i < args.length; i++) {
            if ((typeof args[i] == 'string' && $String.isNullOrWhiteSpace(args[i]))
                || (typeof args[i] != "number" && typeof args[i] != "string")) {
                continue;
            }

            let arg = "" + args[i];
            temp += arg;
            for (let i2 = i + 1; i2 < args.length; i2++) {
                if ($String.isNullOrWhiteSpace(args[i2])) {
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
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    public Values: string[] = [];

    get values(): string[] {
        return this.Values;
    }

    set values(values: string[]) {
        this.Values = values;
    }

    constructor(value: string = $String.Empty) {
        if (!$String.isNullOrWhiteSpace(value)) {
            this.values = new Array(value);
        }
    }

    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    ToString() {
        return this.toString();
    }

    toString() {
        return this.Values.join('');
    }

    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    Append(value: string) {
        this.append(value);
    }

    append(value: string) {
        this.Values.push(value);
    }

    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    AppendFormat(format: string, ...args: any[]) {
        this.appendFormat(format, ...args);
    }

    appendFormat(format: string, ...args: any[]) {
        this.Values.push($String.format(format, ...args));
    }

    appendLine(value: string) {
        this.Values.push('\r\n' + value);
    }

    appendLineFormat(format: string, ...args: any[]) {
        this.Values.push("\r\n" + $String.format(format, ...args));
    }

    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    Clear() {
        return this.clear();
    }

    clear() {
        this.Values = [];
    }
}