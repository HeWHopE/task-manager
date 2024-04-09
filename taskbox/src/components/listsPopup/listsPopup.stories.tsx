// listPopup.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react';
import ListPopup, { PopupProps } from './listsPopup';

export default {
  title: 'Components/ListPopup',
  component: ListPopup,
} as Meta;

const Template: Story<PopupProps> = (args) => <ListPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  handleClosePopup: () => console.log('Popup closed'),
  handleRemove: () => console.log('List removed'),
};
