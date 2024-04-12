import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import ListPopup, {
  PopupProps,
} from '../../components/ListsPage/popups/listPopup'

export default {
  title: 'Components/ListPopup',
  component: ListPopup,
} as Meta

const Template: StoryFn<PopupProps> = (args) => <ListPopup {...args} />

export const Default = Template.bind({})
Default.args = {
  handleClosePopup: () => console.log('Popup closed'),
  handleRemove: () => console.log('List removed'),
}
