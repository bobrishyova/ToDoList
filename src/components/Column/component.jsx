import React from 'react'
import Item from '../Item'

const Column = ({
  column,
  deleteColumn,
  currentColumn,
  text,
  saveInputText,
  getCurrentColum,
  addItem,
  toggleCheckbox,
	DoneTask,
	deleteTask,
	getCurrentItem,
	currentItem,
	wrapperRef,
	columns,
	movingTaskToAnotherColumn,
}) => {
  return (
    <div className="toDo">
      <div className="deleteColumnAndAddName">
        <p>{column.name}</p>
        <button 
          className="deleteColumn" 
          type="button" 
          onClick={deleteColumn(column.id)}
        >
          &#10006;
        </button>
      </div>
      <div className="toDoForm">
        <input
          value={column.id === currentColumn.id ? text : ''}
          type="text" 
          placeholder="Task"
          onChange={saveInputText}
          onFocus={getCurrentColum(column)}
        />
        <button id="button" type="button" onClick={addItem(column.id)}>Add</button>
      </div>
      {column.items.map((item) => (
        <Item
          key={item.id}
          movingTaskToAnotherColumn={movingTaskToAnotherColumn}
          item={item}
          toggleCheckbox={toggleCheckbox}
	        DoneTask={DoneTask}
	        deleteTask={deleteTask}
          getCurrentItem={getCurrentItem}
          currentItem={currentItem}
          wrapperRef={wrapperRef}
          columns={columns}
          column={column}
        />
      ))}
    </div>
  )
}

export default Column

