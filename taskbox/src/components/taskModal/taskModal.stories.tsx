// TaskModal.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react';
import TaskModal, { TaskModalProps } from './taskModal'; // Adjust the import path here

export default {
  title: 'Components/TaskModal',
  component: TaskModal,
} as Meta;

const Template: Story<TaskModalProps> = (args) => <TaskModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClose: () => console.log('Modal closed'),
  task: {
    id: 1,
    name: 'Sample Task',
    description: 'This is a sample task description',
    list_id: 1,
  },
  boardId: 1,
};
