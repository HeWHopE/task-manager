import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter instead of BrowserRouter
import BoardsModal from '../../components/BoardsModal';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
const store = setupStore();

export default {
  title: 'Components/BoardsModal',
  component: BoardsModal,
  decorators: [(Story) => <MemoryRouter><Provider store={store}><Story /></Provider></MemoryRouter>], // Wrap your stories with MemoryRouter
} as Meta;

const Template: StoryFn<{}> = () => <BoardsModal onOpenChange={() => {}} />;

export const Default = Template.bind({});
