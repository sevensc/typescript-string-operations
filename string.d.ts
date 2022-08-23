
export declare class $String {
    static empty: string;
    static isNullOrWhiteSpace(value: string | null | undefined): boolean;
    static join(delimiter: string, ...args: (string | object | Array<any>)[]): string;
    static format(format: string, ...args: any[]): string;
}

/**
 * @deprecated String is overriding the native `String` object, this class will be removed in the future! Use `$String` instead.
*/
export declare class String extends $String {
    /**
     * @deprecated The property should not be used, and will be removed in future versions! Use `String.empty` instead.
    */
    static Empty: string;
    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `String.isNullOrWhiteSpace()` instead.
    */
    static IsNullOrWhiteSpace(value: string | null | undefined): boolean;
    /**
     * @deprecated The method should not be used, and will be removed in future versions! Use `String.join()` instead.
    */
    static Join(delimiter: string, ...args: (string | object | Array<any>)[]): string;
    /**
     * @deprecated The method should not be used, and will be removed in future version!s Use `String.format()` instead.
    */
    static Format(format: string, ...args: any[]): string;
}

