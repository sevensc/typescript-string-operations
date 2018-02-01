export declare class String {
    static Empty: string;
    static IsNullOrWhiteSpace(value: string): boolean;
    static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string;
    static Format(format: string, ...args: any[]): string;
}
