'use client';

import classes from './CodeSample.module.css';

/**
 * The default copy button.
 */
export const CopyButton = ({code}: {code: string}) => {
    // TODO: Test if CodeSample is a server component
    const copyCodeClipboard = () => {
        navigator.clipboard.writeText(code);
    };
    console.log('button');

    return (
        <button className={classes.copybutton} type="button" onClick={copyCodeClipboard}>
            Copy
        </button>
    );
};
