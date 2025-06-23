import type {CopyButtonProps} from '../CodeSample/CodeSample';
import {CopyButton} from './CopyButton';

export function renderCopyButton({copyFn}: CopyButtonProps) {
    return <CopyButton copyFn={copyFn} />;
}
