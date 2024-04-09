// CloseXButton.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react';
import CloseXButton, { CloseXButtonProps } from './closeXButton';

export default {
  title: 'Components/CloseXButton',
  component: CloseXButton,
} as Meta;

const Template: Story<CloseXButtonProps> = (args) => <CloseXButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => console.log('Close button clicked'),
};
