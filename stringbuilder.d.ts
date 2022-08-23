export interface StringBuilder {
    Values: string[];
    constructor(value?: string): any;
    ToString(): string;
    Append(value: string): void;
    AppendLine(value: string): void;
    AppendFormat(value: string, ...args: string[]): void;
    AppendLineFormat(value: string, ...args: string[]): void;
    Clear(): void;
}