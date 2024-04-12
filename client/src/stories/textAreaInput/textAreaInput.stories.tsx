import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import TextAreaInput, {
  TextAreaInputProps,
} from '../../components/ListsPage/inputs/TextAreaInput'

export default {
  title: 'Components/TextAreaInput',
  component: TextAreaInput,
} as Meta

const Template: StoryFn<TextAreaInputProps> = (args) => (
  <TextAreaInput {...args} />
)

export const Default = Template.bind({})

Default.args = {
  placeholder: 'Enter text here',
  value: '',
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('onChange event fired')
  },
}
