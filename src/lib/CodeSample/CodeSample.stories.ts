import type {Meta, StoryObj} from '@storybook/react';

const testingData = json1 as unknown as CodeSampleObject;

import json1 from './__tests__/testingData.json';
import type {CodeSampleObject} from './CodeSample';
import {CodeSample} from './CodeSample';

const meta = {
    title: 'Example/CodeSample',
    component: CodeSample,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as Meta<typeof CodeSample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleCodeSample: Story = {
    args: {
        codeSample: testingData,
    },
};

export const ExampleCodeSampleWithInitialValue: Story = {
    args: {
        codeSample: testingData,
    },
};
