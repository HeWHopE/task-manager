import React, { useState } from 'react'

interface ListEditFormProps {
  listName: string
  setListName: (value: string) => void
  handleUpdate: (listName: string) => void
}

const ListEditForm: React.FC<ListEditFormProps> = ({
  listName,
  setListName,
  handleUpdate,
}) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <>
      {editMode ? (
        <textarea
          className={`resize-none w-full p-1 rounded-xl truncate`}
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onBlur={() => {
            setEditMode(false)
            if (listName.length < 1) {
              setListName('Untitled')
              return
            }
            handleUpdate(listName)
          }}
          autoFocus
          rows={1}
          maxLength={20}
          minLength={1}
        />
      ) : (
        <textarea
          className="cursor-pointer resize-none overflow-hidden w-full p-1 bg-slate-200 rounded-xl"
          onClick={() => setEditMode(true)}
          value={listName}
          rows={1}
        />
      )}
    </>
  )
}

export default ListEditForm
