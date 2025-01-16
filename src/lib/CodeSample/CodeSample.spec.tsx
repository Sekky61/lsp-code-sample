import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as json1 from './__tests__/testingData.json';
import type {CodeSampleObject} from './CodeSample';
import {CodeSample} from './CodeSample';

const testingData = json1 as unknown as CodeSampleObject;

describe('CodeSample', () => {
    /**
     * Jest hook which runs before each test,
     * @see https://jestjs.io/docs/en/api#beforeeachfn-timeout
     */
    beforeEach(() => {});

    it('renders empty without crashing', () => {
        /**
         * `asFragment`:
         * @see https://testing-library.com/docs/react-testing-library/api#asfragment
         * `baseElement`:
         * @see https://testing-library.com/docs/react-testing-library/api#baseelement
         */
        const {baseElement} = render(<CodeSample />);
        expect(baseElement.querySelector('pre')!.textContent).toBe('');
    });

    it('renders one line without crashing', () => {
        const {baseElement} = render(<CodeSample codeSample={testingData} />);
        expect(baseElement.querySelector('pre')!.textContent).toBe(testingData.code);
    });

    it('copies code on button click', async () => {
        userEvent.setup({
            writeToClipboard: true,
        });

        const {getByRole} = render(<CodeSample codeSample={testingData} />);

        /**
         * Search for the button and make testing library click on it
         * @see https://testing-library.com/docs/react-testing-library/cheatsheet#events
         */
        fireEvent.click(getByRole('button'));

        const copiedText = await window.navigator.clipboard.readText();
        expect(copiedText).toBe(testingData.code);
    });

    it('renders file name', () => {
        /**
         * `asFragment`:
         * @see https://testing-library.com/docs/react-testing-library/api#asfragment
         * `baseElement`:
         * @see https://testing-library.com/docs/react-testing-library/api#baseelement
         */
        const {baseElement} = render(<CodeSample codeSample={testingData} />);
        expect(baseElement.querySelector('.code-sample-file-name')!.textContent).toBe('file1');
    });
});

describe('CodeSample > line numbers', () => {
    // it('renders line "1" without specifying a range', () => {
    //     // todo
    // });
});
