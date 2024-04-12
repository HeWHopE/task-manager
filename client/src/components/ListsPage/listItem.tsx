import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ListPopup from './popups/listPopup'
import ListEditForm from './ListEditForm'
import { IList } from '../../models/IList'
import { useUpdateListMutation } from '../../services/ListService'

export interface ListItemProps {
  list: IList
  remove: (list: IList) => void
}

const ListItem: React.FC<ListItemProps> = ({ list, remove }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [listName, setListName] = useState(list.name)
  const [updateList, {}] = useUpdateListMutation()

  const handleUpdate = async (listName: string) => {
    try {
      await updateList({ name: listName, list_id: Number(list.id) })
    } catch (error) {
      console.error('Error updating list:', error)
    }
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleRemove = () => {
    if (list.id !== undefined) {
      remove(list)
    } else {
      console.error('ID is undefined')
    }
  }

  return (
    <div className="pl-4 flex justify-between items-center w-11/12 p-2">
      <ListEditForm
        listName={listName}
        setListName={setListName}
        handleUpdate={handleUpdate}
      />
      <div className="relative">
        <div
          className="cursor-pointer hover:bg-slate-400 rounded-xl duration-200 p-2 w-8 h-8 flex items-center justify-center"
          onClick={togglePopup}
        >
          <BsThreeDotsVertical />
        </div>
        {showPopup && (
          <ListPopup
            handleClosePopup={() => setShowPopup(false)}
            handleRemove={handleRemove}
          />
        )}
      </div>
    </div>
  )
}

export default ListItem
