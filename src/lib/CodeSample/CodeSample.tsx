import type {FC} from 'react';

import type {CodeSampleObject, Token} from '@/lib/CodeSample/CodeSampleProps';

import classes from './CodeSample.module.css';

export type Props = {
    codeSample?: CodeSampleObject;
    copyButton?: React.ReactNode;
};

export const CodeSample: FC<Props> = ({codeSample, copyButton}) => {
    const code = codeSample?.code ?? '';
    const lines = code.split('\n') ?? [];
    const firstLine = codeSample?.range[0] ?? 1;
    const tokens = Object.groupBy(codeSample?.tokens ?? [], ({line}) => line);
    Object.values(tokens).forEach(arr => arr?.sort((a, b) => a.start_col - b.start_col));

    const copyCodeClipboard = () => {
        navigator.clipboard.writeText(code);
    };

    const copy = copyButton ?? (
        <button className={classes.copybutton} type="button" onClick={copyCodeClipboard}>
            Copy
        </button>
    );

    return (
        <div className={classes.codesample}>
            <pre>
                {lines.map((line, i) => {
                    const lineNum = firstLine + i;
                    return (
                        <Line key={lineNum} lineNum={lineNum} tokens={tokens[lineNum] ?? []}>
                            {line}
                        </Line>
                    );
                })}
            </pre>
            {copy}
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
