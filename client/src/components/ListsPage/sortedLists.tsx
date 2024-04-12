import React from 'react'
import ListItem from './listItem'
import TaskList from './taskList'
import { IList } from '../../models/IList'
import { TextAreaComponent } from './TextAreaComponent'

export interface ListItemsProps {
  sortedLists: IList[] | undefined // Adjusted type to allow undefined

  handleRemove: (list: IList) => void
  showTextarea: { [key: number]: boolean }
  setShowTextarea: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >
}

const ListItems: React.FC<ListItemsProps> = ({
  sortedLists,
  handleRemove,
  showTextarea,
  setShowTextarea,
}) => {
  return (
    <>
      {sortedLists?.map((list: IList) => (
        <li key={list.id} className="m-4 max-h-[900px]">
          <div className="rounded-3xl bg-slate-200 w-80">
            <ListItem remove={handleRemove} list={list} />
            <ol className="max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <TaskList listId={Number(list.id)} />
              <TextAreaComponent
                list={list}
                showTextarea={showTextarea}
                setShowTextarea={setShowTextarea}
              />
            </ol>
          </div>
        </li>
      ))}
    </>
  )
}

export default ListItems
