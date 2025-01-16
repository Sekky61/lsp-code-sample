import {render} from '@testing-library/react';

import {plain} from '.';
import {CodeSample} from '../CodeSample';

const code = `const x = 8;
afunction(x);`;

const firstLine = code.split('\n')[0];
const secondLine = code.split('\n')[1];

describe('lib > plain', () => {
    it('converts string to code sample object', () => {
        const codeSample = plain(code);

        expect(codeSample.code).toBe(code);
        expect(codeSample.range).toEqual([0, 2]); // zero based, 1 is added in component
    });

    it('can be rendered with the component', () => {
        const {baseElement} = render(<CodeSample codeSample={plain(code)} />);

        // It has two lines
        const allLines = baseElement.querySelectorAll('code');
        expect(allLines.length).toBe(2);
        // Each line
        expect(allLines[0]!.textContent).toBe(firstLine);
        expect(allLines[1]!.textContent).toBe(secondLine);
    });

    it('takes file_name as an option', () => {
        const codeSample = plain(code, {file_name: 'foo'});
        expect(codeSample.file_name).toEqual('foo');
    });

    it('takes start_line as an option', () => {
        const codeSample = plain(code, {start_line: 8});
        expect(codeSample.range).toEqual([8, 10]);
    });
});
