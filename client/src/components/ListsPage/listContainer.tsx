import {
  useFetchListsQuery,
  useDeleteListMutation,
} from '../../services/ListService'
import React, { createRef, useState, MouseEvent } from 'react'
import { useParams } from 'react-router-dom'
import AddListForm from './addListForm'
import { useEffect } from 'react'
import HeaderOfLists from './headerOfListsPage/HeaderOfLists'
import ListItems from './sortedLists'
import { usePostListMutation } from '../../services/ListService'

import { IList } from '../../models/IList'

export interface ListContainerProps {
  isHistoryModalOpen: boolean
  isBoardsModalOpen: boolean
}

const ListContainer: React.FC<ListContainerProps> = ({
  isHistoryModalOpen,
  isBoardsModalOpen,
}) => {
  const { yourArg } = useParams<{ yourArg?: string }>()
  const boardId = yourArg ? parseInt(yourArg, 10) : undefined

  if (boardId === undefined) {
    throw new Error('boardId is undefined')
  }

  const { data: lists } = useFetchListsQuery({ boardId })
  const [deleteList] = useDeleteListMutation()
  const olRef = createRef<HTMLOListElement>()
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState<number | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showTextarea, setShowTextarea] = useState<{ [key: number]: boolean }>(
    {},
  )

  const [isAddingList, setIsAddingList] = useState(false)
  const [newListName, setNewListName] = useState('')

  const [postList] = usePostListMutation()

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (isHistoryModalOpen && olRef.current) {
        olRef.current.scrollLeft = 0
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLOListElement>) => {
    if (!isDragging || !olRef.current || startX === null) return
    const x = e.pageX - olRef.current.offsetLeft
    const walk = (x - startX) * 3 // Adjust the sensitivity
    olRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseDown = (e: MouseEvent<HTMLOListElement>) => {
    setIsDragging(true)
    if (olRef.current) {
      setStartX(e.pageX - olRef.current.offsetLeft)
      setScrollLeft(olRef.current.scrollLeft)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleRemove = (list: IList) => {
    deleteList(list)
  }

  const handleAddList = () => {
    if (!newListName) {
      setNewListName('')
      setIsAddingList(false)
      return
    }
    postList({ name: newListName, boardId })
    setNewListName('')
    setIsAddingList(false)
  }

  const sortedLists = lists?.slice().sort((a: IList, b: IList) => {
    const idA = Number(a.id) || 0
    const idB = Number(b.id) || 0
    return idA - idB
  })
  return (
    <>
      <HeaderOfLists
        isHistoryModalOpen={isHistoryModalOpen}
        isBoardsModalOpen={isBoardsModalOpen}
      />

      <ol
        className={`select-none ${isHistoryModalOpen ? 'mr-72' : 'mr-4'} ${isBoardsModalOpen ? 'ml-72' : 'ml-4'} min-h-[790px] duration-300 flex-grow flex flex-row overflow-y-hidden z-2`}
        ref={olRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
       
        <ListItems
        sortedLists={sortedLists}
        handleRemove={handleRemove}
        showTextarea={showTextarea}
        setShowTextarea={setShowTextarea}
      />
        
        
        <AddListForm
          isAddingList={isAddingList}
          newListName={newListName}
          handleAddList={handleAddList}
          setNewListName={setNewListName}
          setIsAddingList={setIsAddingList}
        />
      </ol>
    </>
  )
}

export default ListContainer
