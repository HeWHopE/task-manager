import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import HistoryModal, {
  HistoryModalProps,
} from '../../components/ListsPage/modals/historyModal'

export default {
  title: 'Components/HistoryModal',
  component: HistoryModal,
} as Meta

const Template: StoryFn<Partial<HistoryModalProps>> = (args) => (
  <HistoryModal {...(args as HistoryModalProps)} />
)

export const Default = Template.bind({})
Default.args = {
  onClose: () => console.log('Modal closed'),
  onOpenChange: (isOpen) => console.log('Modal open state changed:', isOpen),
  activities: [
    { id: 1, action_description: 'Action 1', timestamp: new Date() },
    { id: 2, action_description: 'Action 2', timestamp: new Date() },
  ],
}
