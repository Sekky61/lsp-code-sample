import type {Token} from '../types';

/**
 * Groups tokens by line number and sorts them by start column within each line.
 * @param tokens - Array of tokens to group and sort
 * @returns Record where keys are line numbers and values are sorted arrays of tokens
 */
export function groupAndSortTokensByLine(tokens: Token[]): Record<number, Token[]> {
    const grouped = Object.groupBy(tokens, ({line}) => line);

    // Sort tokens within each line by start_col
    Object.values(grouped).forEach(arr => {
        arr?.sort((a, b) => a.start_col - b.start_col);
    });

    return grouped as Record<number, Token[]>;
}
