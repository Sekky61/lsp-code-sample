import type {Meta, StoryObj} from '@storybook/react';

import {CopyButton} from './CopyButton';

const meta = {
    title: 'CopyButton',
    component: CopyButton,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CustomCopyButton: Story = {
    args: {},
};
