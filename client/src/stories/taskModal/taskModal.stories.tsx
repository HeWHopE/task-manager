import { Provider } from 'react-redux'; // Import Provider from react-redux
import { StoryFn, Meta } from '@storybook/react';
import TaskModal, { TaskModalProps } from '../../components/ListsPage/modals/taskModal';
import { setupStore } from '../../store/store';

const store = setupStore(); // Create a store

export default {
  title: 'Components/TaskModal',
  component: TaskModal,
  decorators: [(Story) => <Provider store={store}><Story /></Provider>], // Wrap your stories with Provider
} as Meta;

const Template: StoryFn<TaskModalProps> = (args) => <TaskModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClose: () => console.log('Modal closed'),
  task: {
    id: "1",
    name: 'Sample Task',
    description: 'This is a sample task description',
    list_id: "1",
  },
  boardId: 1, 
};
