import {groupAndSortTokensByLine} from './tokenUtils';
import type {Token} from '../CodeSample/CodeSample';

describe('groupAndSortTokensByLine', () => {
    it('should return empty object for empty token array', () => {
        const result = groupAndSortTokensByLine([]);
        expect(result).toEqual({});
    });

    it('should group single token correctly', () => {
        const tokens: Token[] = [
            {
                client_id: 1,
                modifiers: [],
                type: 'keyword',
                line: 5,
                marked: false,
                start_col: 10,
                end_col: 15,
            },
        ];

        const result = groupAndSortTokensByLine(tokens);
        expect(result).toEqual({
            5: [tokens[0]],
        });
    });

    it('should sort tokens on same line by start_col', () => {
        const tokens: Token[] = [
            {
                client_id: 1,
                modifiers: [],
                type: 'identifier',
                line: 2,
                marked: false,
                start_col: 20,
                end_col: 25,
            },
            {
                client_id: 1,
                modifiers: [],
                type: 'keyword',
                line: 2,
                marked: false,
                start_col: 5,
                end_col: 10,
            },
            {
                client_id: 1,
                modifiers: [],
                type: 'operator',
                line: 2,
                marked: false,
                start_col: 15,
                end_col: 16,
            },
        ];

        const result = groupAndSortTokensByLine(tokens);
        expect(result[2]).toHaveLength(3);
        expect(result[2][0].start_col).toBe(5);
        expect(result[2][1].start_col).toBe(15);
        expect(result[2][2].start_col).toBe(20);
    });

    it('should group tokens on different lines correctly', () => {
        const tokens: Token[] = [
            {
                client_id: 1,
                modifiers: [],
                type: 'keyword',
                line: 1,
                marked: false,
                start_col: 0,
                end_col: 5,
            },
            {
                client_id: 1,
                modifiers: [],
                type: 'identifier',
                line: 3,
                marked: false,
                start_col: 10,
                end_col: 15,
            },
            {
                client_id: 1,
                modifiers: [],
                type: 'string',
                line: 5,
                marked: false,
                start_col: 20,
                end_col: 30,
            },
        ];

        const result = groupAndSortTokensByLine(tokens);
        expect(Object.keys(result)).toHaveLength(3);
        expect(result[1]).toEqual([tokens[0]]);
        expect(result[3]).toEqual([tokens[1]]);
        expect(result[5]).toEqual([tokens[2]]);
    });

    it('should handle complex scenario with multiple tokens on multiple lines', () => {
        const tokens: Token[] = [
            // Line 1: two tokens
            {
                client_id: 1,
                modifiers: [],
                type: 'keyword',
                line: 1,
                marked: false,
                start_col: 10,
                end_col: 15,
            },
            {
                client_id: 1,
                modifiers: [],
                type: 'identifier',
                line: 1,
                marked: false,
                start_col: 0,
                end_col: 5,
            },
            // Line 2: one token
            {
                client_id: 1,
                modifiers: [],
                type: 'string',
                line: 2,
                marked: false,
                start_col: 20,
                end_col: 30,
            },
            // Line 4: three tokens (unsorted input)
            {
                client_id: 1,
                modifiers: [],
                type: 'operator',
                line: 4,
                marked: false,
                start_col: 15,
                end_col: 16,
            },
            {
                client_id: 1,
                modifiers: [],
                type: 'number',
                line: 4,
                marked: false,
                start_col: 25,
                end_col: 27,
            },
            {
                client_id: 1,
                modifiers: [],
                type: 'function',
                line: 4,
                marked: false,
                start_col: 5,
                end_col: 12,
            },
        ];

        const result = groupAndSortTokensByLine(tokens);

        // Check that we have the right number of lines
        expect(Object.keys(result)).toHaveLength(3);

        // Check line 1 is sorted correctly
        expect(result[1]).toHaveLength(2);
        expect(result[1][0].start_col).toBe(0); // identifier comes first
        expect(result[1][1].start_col).toBe(10); // keyword comes second

        // Check line 2 has one token
        expect(result[2]).toHaveLength(1);
        expect(result[2][0].type).toBe('string');

        // Check line 4 is sorted correctly
        expect(result[4]).toHaveLength(3);
        expect(result[4][0].start_col).toBe(5); // function
        expect(result[4][1].start_col).toBe(15); // operator
        expect(result[4][2].start_col).toBe(25); // number
    });

    it('should handle tokens with same start_col on same line', () => {
        const tokens: Token[] = [
            {
                client_id: 1,
                modifiers: [],
                type: 'keyword',
                line: 0,
                marked: false,
                start_col: 10,
                end_col: 15,
            },
            {
                client_id: 2,
                modifiers: [],
                type: 'identifier',
                line: 0,
                marked: false,
                start_col: 10,
                end_col: 15,
            },
        ];

        const result = groupAndSortTokensByLine(tokens);
        expect(result[0]).toHaveLength(2);
        // Both should be present, order doesn't matter since start_col is same
        expect(result[0]).toContainEqual(tokens[0]);
        expect(result[0]).toContainEqual(tokens[1]);
    });

    it('should preserve all token properties', () => {
        const token: Token = {
            client_id: 123,
            modifiers: ['static', 'readonly'],
            type: 'property',
            line: 7,
            marked: true,
            start_col: 12,
            end_col: 20,
        };

        const result = groupAndSortTokensByLine([token]);
        const resultToken = result[7][0];

        expect(resultToken.client_id).toBe(123);
        expect(resultToken.modifiers).toEqual(['static', 'readonly']);
        expect(resultToken.type).toBe('property');
        expect(resultToken.line).toBe(7);
        expect(resultToken.marked).toBe(true);
        expect(resultToken.start_col).toBe(12);
        expect(resultToken.end_col).toBe(20);
    });
});
