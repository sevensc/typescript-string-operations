export declare class StringBuilder {
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    Values: string[];
    get values(): string[];
    set values(values: string[]);
    constructor(value?: string);
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    ToString(): string;
    toString(): string;
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    Append(value: string): void;
    append(value: string): void;
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    AppendLine(value: string): void;
    appendLine(value: string): void;
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    AppendFormat(value: string, ...args: string[]): void;
    appendFormat(value: string, ...args: string[]): void;
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    AppendLineFormat(value: string, ...args: string[]): void;
    appendLineFormat(value: string, ...args: string[]): void;
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    Clear(): void;
    clear(): void;
}