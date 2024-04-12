import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import ListItem, { ListItemProps } from '../../components/ListsPage/listItem'
import { setupStore } from '../../store/store'
import { Provider } from 'react-redux'

const store = setupStore()

export default {
  title: 'Components/ListItem',
  component: ListItem,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ], // Wrap your stories with Provider
} as Meta

const Template: StoryFn<ListItemProps> = (args) => <ListItem {...args} />

export const Default = Template.bind({})
Default.args = {
  list: {
    id: '1',
    name: 'Sample List',
  },
  remove: () => console.log('List removed'),
}
