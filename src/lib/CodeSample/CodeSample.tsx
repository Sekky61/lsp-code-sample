import type {FC} from 'react';
import './CodeSample.css';

import {CopyButton} from './CopyButton';
import {groupAndSortTokensByLine} from '../utils/tokenUtils';
import type {CodeSampleObject, Token} from '../types';

/** Props for the CodeSample component */
export type Props = React.HTMLAttributes<HTMLDivElement> & {
    /** The code sample in object form */
    codeSample?: CodeSampleObject;
    /** Optional custom copy button. A default one will be provided if undefined. */
    copyButton?: React.ReactNode;
};

const DEFAULT_CODE_SAMPLE = {
    code: '',
    range: [0, 1],
    tokens: [],
    file_name: undefined,
    hover: [],
    version: '',
} satisfies CodeSampleObject;

export const CodeSample: FC<Props> = ({codeSample = DEFAULT_CODE_SAMPLE, copyButton, ...divProps}) => {
    const code = codeSample.code;
    const lines = code.split('\n');
    const firstLine = codeSample.range[0];
    const tokens = groupAndSortTokensByLine(codeSample.tokens);

    return (
        <div className="code-sample" {...divProps}>
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

    return (
        <code data-line-number={lineNum + 1}>
            <LineTokens line={children} tokens={tokens} />
        </code>
    );
};

type LineTokensProps = {
    line: string;
    tokens: Token[];
};

const LineTokens: FC<LineTokensProps> = ({line, tokens}) => {
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

    return <>{elements}</>;
};
