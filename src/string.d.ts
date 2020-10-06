export declare class $String {
    static empty: string;
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    static Empty: string;
    static isNullOrWhiteSpace(value: string): boolean;
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    static IsNullOrWhiteSpace(value: string): boolean;
    static join(delimiter: string, ...args: (string | object | Array<any>)[]): string;
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string;
    static format(format: string, ...args: any[]): string;
    /** 
     * @deprecated following naming-conventions this method will be gone in v3.0.0
    */
    static Format(format: string, ...args: any[]): string;
}
