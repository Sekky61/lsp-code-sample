'use client';

/**
 * The default copy button.
 */
export const CopyButton = ({code}: {code: string}) => {
    // TODO: Test if CodeSample is a server component
    const copyCodeClipboard = () => {
        navigator.clipboard.writeText(code);
    };

    return (
        <button className="code-sample-copy-button" type="button" onClick={copyCodeClipboard}>
            Copy
        </button>
    );
};
