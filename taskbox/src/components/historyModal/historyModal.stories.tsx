// HistoryModal.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react';
import HistoryModal, { HistoryModalProps } from './historyModal';

export default {
  title: 'Components/HistoryModal',
  component: HistoryModal,
} as Meta;

const Template: Story<HistoryModalProps> = (args) => <HistoryModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClose: () => console.log('Modal closed'),
  onOpenChange: (isOpen) => console.log('Modal open state changed:', isOpen),
  activities: [
    { id: 1, action_description: 'Action 1', timestamp: new Date() },
    { id: 2, action_description: 'Action 2', timestamp: new Date() },
    // Add more sample activities here if needed
  ],
};
