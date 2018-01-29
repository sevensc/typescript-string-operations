export declare class StringBuilder {
    Values: string[];
    constructor(value?: string);
    ToString(): string;
    Append(value: string): void;
    AppendFormat(value: string, ...args: string[]): void;
    Clear(): void;
}