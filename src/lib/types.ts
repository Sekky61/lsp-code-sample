/**
 * TypeScript definitions for LSP code sample data structures.
 * Used for rendering syntax-highlighted code with hover information and tokens.
 */

/**
 * Main code sample data structure.
 */
export type CodeSampleObject = {
    /** Optional file name or code sample title */
    file_name?: string;

    /** Zero-based line range [start, end) - end is exclusive */
    range: [number, number];

    /** Source code content */
    code: string;

    /** Hover tooltips for code elements */
    hover: HoverInfo[];

    /** Syntax highlighting tokens */
    tokens: Token[];

    /** Data structure version */
    version: string;
};

/**
 * Hover tooltip information for a code range.
 */
export type HoverInfo = {
    /** Code range where hover applies */
    range: CodeRange;

    /** Tooltip content */
    contents: HoverContents;
};

/**
 * Code range defined by start and end positions.
 */
export type CodeRange = {
    /** Range start position */
    start: CodePosition;

    /** Range end position */
    end: CodePosition;
};

/**
 * Position in code (zero-based coordinates).
 */
export type CodePosition = {
    /** Character position within the line (0-based) */
    character: number;

    /** Line number (0-based) */
    line: number;
};

/**
 * Hover tooltip content.
 */
export type HoverContents = {
    /** Markdown-formatted tooltip text */
    value: string;

    /** Content format - currently only 'markdown' supported */
    kind: 'markdown';
};

/**
 * Syntax highlighting token.
 */
export type Token = {
    /** Client ID that created this token */
    client_id: number;

    /** Token modifiers (e.g., ['static', 'readonly']) */
    modifiers: string[];

    /** Token type (e.g., 'keyword', 'function', 'string') */
    type: string;

    /** Line number (0-based) */
    line: number;

    /** Whether token is marked as significant */
    marked: boolean;

    /** Start column (0-based, inclusive) */
    start_col: number;

    /** End column (0-based, exclusive) */
    end_col: number;
};
