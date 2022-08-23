export interface String {
    Empty: string;
    IsNullOrWhiteSpace(value: string): boolean;
    Join(delimiter: string, ...args: (string | object | Array<any>)[]): string;
    Format(format: string, ...args: any[]): string;
}
