//=============================================================================
// rmmz_core.js v1.0.0
//=============================================================================
/**
 * @static
 * @class JsonEx
 * @classdesc The static class that handles JSON with object information.
 */
declare class JsonEx {
    constructor();

    /**
     * The maximum depth of objects.
     *
     * @type number
     * @default 100
     */
    public static readonly maxDepth: number;

    /**
     * Converts an object to a JSON string with object information.
     *
     * @param {object} object - The object to be converted.
     * @returns {string} The JSON string.
     */
    public static stringify(object: any): string;

    /**
     * Parses a JSON string and reconstructs the corresponding object.
     *
     * @param {string} json - The JSON string.
     * @returns {object} The reconstructed object.
     */
    public static parse(json: string): any;

    /**
     * Makes a deep copy of the specified object.
     *
     * @param {object} object - The object to be copied.
     * @returns {object} The copied object.
     */
    public static makeDeepCopy(object: any): any;

    private static _encode(value: any, depth: number): any;
    private static _decode(value: any): any;
}
