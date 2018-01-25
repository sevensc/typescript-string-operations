export declare class StringBuilder {
    Values: string[];
    constructor(value?: string);
    ToString(): string;
    Append(value: string): void;
    AppendFormat(value: string, ...args: string[]): void;
    Clear(): void;
}
export declare class String {
    static Empty: string;
    static IsNullOrWhiteSpace(value: string): boolean;
    static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string;
    static Format(format: string, ...args: (string | Date | number | any)[]): string;
}
