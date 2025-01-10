import {render} from '@testing-library/react';

import {plain} from '.';
import {CodeSample} from '../CodeSample';

const code = `const x = 8;
console.log(x);`;

const firstLine = code.split('\n')[0];
const secondLine = code.split('\n')[1];

describe('lib > plain', () => {
    it('converts string to code sample object', () => {
        const codeSample = plain(code);

        expect(codeSample.code).toBe(code);
        expect(codeSample.range).toEqual([1, 3]);
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
});
