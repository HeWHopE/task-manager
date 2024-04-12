import React from 'react'
import { IList } from '../../models/IList'
import TextAreaForm from './TextAreaForm'
import { useParams } from 'react-router-dom'
export interface TextAreaComponentProps {
  list: IList
  showTextarea: { [key: number]: boolean }
  setShowTextarea: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >
}

export const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  list,
  showTextarea,
  setShowTextarea,
}) => {
  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined

  if (boardId === undefined) {
    throw new Error('boardId is undefined')
  }

  return (
    <TextAreaForm
      list={list}
      showTextarea={showTextarea[Number(list.id)]}
      setShowTextarea={(value) =>
        setShowTextarea((prevState) => ({
          ...Object.fromEntries(
            Object.entries(prevState).map(([key, _]) => [key, false]),
          ),
          [Number(list.id)]: value,
        }))
      }
    />
  )
}
