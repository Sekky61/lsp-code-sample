'use client';

import type {CopyButtonProps} from '../CodeSample/CodeSample';

/**
 * The default copy button.
 */
export const CopyButton = ({copyFn}: CopyButtonProps) => {
    return (
        <button className="code-sample-copy-button" type="button" onClick={copyFn}>
            Copy
        </button>
    );
};
