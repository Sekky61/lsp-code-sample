import type {Meta, StoryObj} from '@storybook/react';

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
        initialValue: 0,
    },
};

export const ExampleCodeSampleWithInitialValue: Story = {
    args: {
        initialValue: 11,
    },
};
