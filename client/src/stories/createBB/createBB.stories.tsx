import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import CreateBB from '../../components/BoardPage/createBB'
import { Provider } from 'react-redux'
import { setupStore } from '../../store/store'

const store = setupStore()

export default {
  title: 'Components/CreateBB',
  component: CreateBB,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ], // Use Provider to wrap the stories
} as Meta

const Template: StoryFn<{}> = () => <CreateBB />

export const Default = Template.bind({})

Default.storyName = 'Default State'
