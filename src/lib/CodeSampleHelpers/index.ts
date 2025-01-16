import type {CodeSampleObject} from '../CodeSample/CodeSample';

type PlainOptions = {
    file_name: string;
    start_line: number;
};

/**
 * Convert simple code sample to props compatible with CodeSample component.
 */
export function plain(code: string, options?: Partial<PlainOptions>): CodeSampleObject {
    const lineCount = code.split('\n').length;
    const start_line = options?.start_line ?? 0;
    return {
        code,
        file_name: options?.file_name,
        range: [start_line, start_line + lineCount],
        hover: [],
        tokens: [],
        version: '1',
    };
}
