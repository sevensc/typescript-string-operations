import { EOL } from 'os';
import { $String } from './$string';

export class String extends $String {
    public static Empty = '';

    public static IsNullOrWhiteSpace(value: string | null | undefined): boolean {
        return $String.isNullOrWhiteSpace(value);
    }

    public static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string {
        return $String.join(delimiter, ...args);
    }

    public static Format(format: string, ...args: any[]): string {
        return $String.format(format, ...args);
    }
}

export class StringBuilder {
    public Values: string[];

    constructor(value = '') {
        this.Values = [];

        if (!$String.isNullOrWhiteSpace(value)) {
            this.Values = new Array(value);
        }
    }

    public ToString() {
        return this.Values.join($String.empty);
    }

    public Append(value: string) {
        this.Values.push(value);
    }

    public AppendLine(value: string) {
        this.Values.push(EOL + value);
    }

    public AppendFormat(format: string, ...args: any[]) {
        this.Values.push($String.format(format, ...args));
    }

    public AppendLineFormat(format: string, ...args: any[]) {
        this.Values.push(EOL + $String.format(format, ...args));
    }

    public Clear() {
        this.Values = [];
    }
}