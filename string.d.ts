
export declare class $String {
    static empty: string;
    static isNullOrWhiteSpace(value: string | null | undefined): boolean;
    static join(delimiter: string, ...args: (string | object | Array<any>)[]): string;
    static format(format: string, ...args: any[]): string;
}

export declare class String extends $String {
    /**
     * @deprecated The property should not be used, and will be removed with version 2.0.0 use `String.empty` instead.
    */
    static Empty: string;
    /**
     * @deprecated The method should not be used, and will be removed with version 2.0.0 use `String.isNullOrWhiteSpace()` instead.
    */
    static IsNullOrWhiteSpace(value: string | null | undefined): boolean;
    /**
     * @deprecated The method should not be used, and will be removed with version 2.0.0 use `String.join()` instead.
    */
    static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string;
    /**
     * @deprecated The method should not be used, and will be removed with version 2.0.0 use `String.format()` instead.
    */
    static Format(format: string, ...args: any[]): string;
}
