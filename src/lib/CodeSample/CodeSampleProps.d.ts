/**
 * represents the main structure of the json.
 */
type CodeSample = {
    /**
     * the range of lines covered in the document.
     * contains start and end line numbers.
     */
    range: [number, number];

    /**
     * the code snippet associated with the range.
     */
    code: string;

    /**
     * hover information for various code elements.
     */
    hover: HoverInfo[];

    /**
     * tokens representing syntax elements in the document.
     */
    tokens: Token[];

    /**
     * version of the data or document.
     */
    version: string;
};

/**
 * represents hover information for a specific range of code.
 */
type HoverInfo = {
    /**
     * the range in the code where the hover is relevant.
     */
    range: CodeRange;

    /**
     * the contents to be displayed in the hover tooltip.
     */
    contents: HoverContents;
};

/**
 * defines a range in the code by start and end positions.
 */
type CodeRange = {
    /**
     * starting position of the range.
     */
    start: CodePosition;

    /**
     * ending position of the range.
     */
    end: CodePosition;
};

/**
 * represents a specific position in the code.
 */
type CodePosition = {
    /**
     * the character position in the line.
     */
    character: number;

    /**
     * the line number.
     */
    line: number;
};

/**
 * defines the contents of a hover tooltip.
 */
type HoverContents = {
    /**
     * the text content of the hover tooltip.
     * typically formatted in markdown.
     */
    value: string;

    /**
     * the format of the contents, e.g., markdown.
     */
    kind: 'markdown';
};

/**
 * represents a syntax token in the document.
 */
type Token = {
    /**
     * id of the client that marked the token.
     */
    client_id: number;

    /**
     * additional modifiers applied to the token.
     */
    modifiers: string[];

    /**
     * the type of the token, e.g., keyword, function, string.
     */
    type: string;

    /**
     * the line where the token appears.
     */
    line: number;

    /**
     * whether the token is marked as significant.
     */
    marked: boolean;

    /**
     * the column where the token starts.
     */
    start_col: number;

    /**
     * the column where the token ends.
     */
    end_col: number;
};
