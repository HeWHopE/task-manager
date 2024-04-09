// TextAreaInput.stories.tsx

import React from 'react';
import { Meta, Story } from '@storybook/react';
import TextAreaInput, { TextAreaInputProps } from './textAreaInput';

export default {
  title: 'Components/TextAreaInput',
  component: TextAreaInput,
} as Meta;

const Template: Story<TextAreaInputProps> = (args) => <TextAreaInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text...',
  value: '',
  onChange: (e) => console.log('Value changed:', e.target.value),
};
