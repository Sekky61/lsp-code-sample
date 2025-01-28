import type {FC} from 'react';
import './CodeSample.css';

import {CopyButton} from './CopyButton';

/**
 * represents the main structure of the json.
 */
export type CodeSampleObject = {
    /**
     * The name of code sample or the name of a file.
     */
    file_name?: string;

    /**
     * the zero based range of lines covered in the document.
     * contains start and end line numbers.
     * End is exclusive.
     * One is added by the component to display one-based line numbers.
     */
    range: [number, number];

    /**
     * the code snippet of the range.
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
     * version of the data structure.
     */
    version: string;
};

/**
 * represents hover information for a specific range of code.
 */
export type HoverInfo = {
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
export type CodeRange = {
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
export type CodePosition = {
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
export type HoverContents = {
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
export type Token = {
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

/** Props for the CodeSample component */
export type Props = {
    /** The code sample in object form */
    codeSample?: CodeSampleObject;
    /** Optional custom copy button. A default one will be provided if undefined. */
    copyButton?: React.ReactNode;
};

export const CodeSample: FC<Props> = ({
    codeSample = {code: '', range: [0, 1], tokens: [], file_name: undefined},
    copyButton,
}) => {
    const code = codeSample.code;
    const lines = code.split('\n');
    const firstLine = codeSample.range[0];
    const tokens = Object.groupBy(codeSample.tokens, ({line}) => line);
    Object.values(tokens).forEach(arr => arr?.sort((a, b) => a.start_col - b.start_col));

    return (
        <div className="code-sample">
            <pre className="code-wrapper">
                {lines.map((line, i) => {
                    const lineNum = firstLine + i;
                    return (
                        <Line key={lineNum} lineNum={lineNum} tokens={tokens[lineNum] ?? []}>
                            {line}
                        </Line>
                    );
                })}
            </pre>
            {copyButton ?? <CopyButton code={code} />}
            {codeSample?.file_name && <div className="code-sample-file-name">{codeSample?.file_name}</div>}
        </div>
    );
};

type LineProps = {
    lineNum: number;
    tokens: Token[];
    children: React.ReactNode;
};

const Line: FC<LineProps> = ({children, lineNum, tokens}) => {
    if (typeof children !== 'string') throw new Error('Code line must be a string');

    // substitute parts of line with tokens

    return <code data-line-number={lineNum + 1}>{renderLineWithTokens(children, tokens)}</code>;
};

const renderLineWithTokens = (line: string, tokens: Token[]) => {
    // sort tokens by start_col to ensure proper order

    const elements = [];
    let currentIndex = 0;

    tokens.forEach((token, index) => {
        // push the text before the current token
        if (currentIndex < token.start_col) {
            elements.push(line.slice(currentIndex, token.start_col));
        }

        // push the tokenized part of the line as a <span>
        elements.push(
            <span key={index} data-token={token.type}>
                {line.slice(token.start_col, token.end_col)}
            </span>
        );

        // move the currentIndex past this token
        currentIndex = token.end_col;
    });

    // push any remaining text after the last token
    if (currentIndex < line.length) {
        elements.push(line.slice(currentIndex));
    }

    return elements;
};
