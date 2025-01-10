import type {CodeSampleObject} from '../CodeSample/CodeSample';

/**
 * Convert simple string to props compatible with CodeSample
 */
export function plain(code: string, startLine = 1): CodeSampleObject {
    const lineCount = code.split('\n').length;
    return {
        code,
        range: [startLine, startLine + lineCount],
        hover: [],
        tokens: [],
        version: '1',
    };
}
