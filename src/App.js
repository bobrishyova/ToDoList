import React, { useState, useCallback, useEffect, useRef } from 'react'
import Column from './components/Column'

const DoneTask = {
  textDecoration: "line-through",
}

const ToDoApp = () => {
  const [text, setText] = useState('')
  const [columns, setColumns] = useState([])
  const [columnName, setColumnName] = useState('')
  const [currentItem, setCurrentItem] = useState({})
  const [currentColumn, setCurrentColumn] = useState({})
  const wrapperRef = useRef(null)

  const getCurrentItem = useCallback((item) => () => {
    if (item.id === currentItem.id) {
      setCurrentItem({})
    } else {
      setCurrentItem(item)
    }
  }, [currentItem, setCurrentItem])

  const getCurrentColum = useCallback((selectedColumn) => () => {
    setCurrentColumn(selectedColumn)
  }, [setCurrentColumn])

  const addColumn = useCallback(() => {
    if (columnName.length === 0) {
      return null
    }
    setColumns([
      ...columns,
      {
        id: Date.now(),
        name: columnName,
        items: [],
      }
    ])
    setColumnName('')
  }, [columnName, columns, setColumns, setColumnName])

  const saveInputText = useCallback((event) => (
    setText(event.target.value)
  ), [setText])
    
  const saveInputName = useCallback((event) => (
    setColumnName(event.target.value)
  ), [setColumnName])

  const addItem = useCallback((currentColumnId) => () => {
    if (text.length === 0) {
      return null
    }
    const newColumns = columns.map((column) => {
      if (currentColumnId === column.id) {
        return {
          ...column,
          items: [
            ...column.items,
            {
              text,
              id: Date.now(),
              done: false, 
            }
          ],
        }
      }
      return column
    })
    setColumns(newColumns)
    setText('')
  }, [text, columns, setColumns, setText])

  const deleteTask = useCallback((id) => () => {
    const filteredItems = columns.map((column) => ({
      ...column,
      items: column.items.filter((item) => item.id !== id),
    }))
    setColumns(filteredItems)
  }, [columns, setColumns])

  const deleteColumn = useCallback((id) => () => {
    const filteredColumns = columns.filter((column) => column.id !== id)
    setColumns(filteredColumns)
  }, [columns, setColumns])

  const toggleCheckbox = useCallback((currentItem) => () => {
    const newItems = columns.map((column) => ({
      ...column,
      items: column.items.map((item) => {
        if (currentItem.id === item.id) {
          return {
            ...item,
            done: !currentItem.done,
          }
        }
        return item
      })
    }))
    setColumns(newItems)
  }, [columns, setColumns])

  const viewColumnInput = useCallback(() => {
    document.getElementById("columnWithName").style.display = "flex"
  }, [])

  const handleKeyPressAddColumn = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addColumn()
    }
  }, [addColumn])

  const movingTaskToAnotherColumn = useCallback((nextColumn, currentColumn) => () => {
    const moveToColumn = columns.map((column) => {
      if (currentColumn.id === column.id) {
        return {
          ...column,
          items: column.items.filter((item) => currentItem.id !== item.id),
        }
      }
      if (nextColumn.id === column.id) {
        return {
          ...column,
          items: [
            ...column.items,
            currentItem,
          ],
        }
      }
      return column
    })
    setColumns(moveToColumn)
  }, [currentItem, columns, setColumns])

  const handleClickOutside = useCallback((event) => {
    if (
      wrapperRef
      && wrapperRef.current
      && !wrapperRef.current.contains(event.target)
      && !event.target.closest('.notClickOutside')
    ) {
      setCurrentItem({})
    }
  }, [wrapperRef, setCurrentItem])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="addForm">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          deleteColumn={deleteColumn}
          currentColumn={currentColumn}
          text={text}
          saveInputText={saveInputText}
          getCurrentColum={getCurrentColum}
          addItem={addItem}
          movingTaskToAnotherColumn={movingTaskToAnotherColumn}
          toggleCheckbox={toggleCheckbox}
	        DoneTask={DoneTask}
	        deleteTask={deleteTask}
          getCurrentItem={getCurrentItem}
          currentItem={currentItem}
          wrapperRef={wrapperRef}
          columns={columns}
        />
      ))}
      <div>
        <button 
          id="addColumnButton" 
          type="button" 
          onMouseDown={viewColumnInput}
        >
          <b>+</b> Add another column 
        </button>
        <div id="columnWithName">
          <input 
            value={columnName} 
            type="text" 
            onKeyPress={handleKeyPressAddColumn} 
            onChange={saveInputName} 
            className="columnName" 
            placeholder="Сolumn's name" 
          />
          <button 
            type="button" 
            className="addColumnButtonWithName" 
            onClick={addColumn}
          >
            Add column
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToDoApp