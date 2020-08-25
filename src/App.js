import React from 'react'

const DoneTask = {
  textDecoration: "line-through",
}

class ToDoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      text: '',
      columns: [],
      columnName: '',
      currentItem: {},
      currentColumn: {},
    }
    this.wrapperRef = React.createRef()
  }

  getCurrentItem = (item) => () => {
    if (item.id === this.state.currentItem.id) {
      this.setState({
        currentItem: {},
      })
    } else {
      this.setState({
        currentItem: item,
      })
    }
  }

  getCurrentColum = (currentColumn) => () => {
    this.setState({
      currentColumn,
    })
  }

  addColumn = () => {
    if (this.state.columnName.length === 0) {
      return null
    }
    this.setState((state) => ({
      columns: [
        ...state.columns, 
        {
          id: Date.now(),
          name: state.columnName,
          items: [],
        }
      ],
      columnName: '',
    })
    )
  }

  saveInputText = (event) => this.setState({
    text: event.target.value,
  })

  saveInputName = (event) => this.setState({
    columnName: event.target.value,
  })

  addItem = (currentColumnId) => () => {
    if (this.state.text.length === 0) {
      return null
    }
    const newColumns = this.state.columns.map((column) => {
      if (currentColumnId === column.id) {
        return {
          ...column,
          items: [
            ...column.items,
            {
              text: this.state.text,
              id: Date.now(),
              done: false,
            }
          ],
        }
      }
      return column
    })
    this.setState({
      columns: newColumns,
      text: '',
    })
  }

  deleteTask = (id) => () => {
    const filteredItems = this.state.columns.map((column) => ({
      ...column,
      items: column.items.filter((item) => item.id !== id),
    }))
    this.setState({
      columns: filteredItems,
    })
  }

  deleteColumn = (id) => () => {
    const filteredColumns = this.state.columns.filter((column) => column.id !== id)
    this.setState({
      columns: filteredColumns,
    })
  }

  toggleCheckbox = (currentItem) => () => {
    const newItems = this.state.columns.map((column) => ({
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
    this.setState({
      columns: newItems,
    })
  }

  viewColumnInput = () => {
    document.getElementById("columnWithName").style.display = "flex";
  }

  handleKeyPressAddColumn = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.addColumn()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        currentItem: {}
      })
    } console.log('ssds', this.wrapperRef.current)
  } 
 

  movingTaskToAnotherColumn = (nextColumn, currentColumn) => (event) => {
    const moveToColumn = this.state.columns.map((column) => {
      if (currentColumn.id === column.id) {
        return {
          ...column,
          items: column.items.filter((item) => this.state.currentItem.id !== item.id),
        }
      }
      if (nextColumn.id === column.id) {
        return {
          ...column,
          items: [
            ...column.items,
            this.state.currentItem,
          ],
        }
      }
      return column
    })
    this.setState({
      columns: moveToColumn,
    })
  }

  render() {
    return (
      <div className="addForm">
        {this.state.columns.map((column) => (
          <div key={column.id} className="toDo">
            <div className="DeleteColumnAndAddName">
              <p>{column.name}</p>
              <button className="deleteColumn" type="button" onClick={this.deleteColumn(column.id)}>&#10006;</button>
            </div>
            <div className="toDoForm">
              <input
                type="text" value={column.id === this.state.currentColumn.id ? this.state.text : ''}
                placeholder="Task"
                onChange={this.saveInputText}
                onFocus={this.getCurrentColum(column)}
              />
              <button id="button" type="button" onClick={this.addItem(column.id)}>Add</button>
            </div>
            {column.items.map((item) => (
              <div key={item.id} className="taskWithMoving">
                <div className="task">
                  <div className="checkbox">
                    <input type="checkbox" checked={item.done} onChange={this.toggleCheckbox(item)} />
                  </div>
                  <p className="text" style={item.done ? DoneTask : {}}>{item.text}</p>
                  <button className="button" onClick={this.deleteTask(item.id)}>&#128465;</button>
                </div>
                <div ref={this.wrapperRef}>
                  <button className="buttonMovingTask" type="button" onClick={this.getCurrentItem(item)}>
                    &#8942;
                    {item.id === this.state.currentItem.id && (
                      <div className="movingTask">
                        {this.state.columns.map((movingColumn) => (
                          <div key={movingColumn.id}>
                            {movingColumn.id !== column.id && (
                              <button className="columnNameToMoveTask" onClick={this.movingTaskToAnotherColumn(movingColumn, column)}>{movingColumn.name}</button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div>
          <button id="addColumnButton" type="button" onMouseDown={this.viewColumnInput}><b>+</b> Add another column </button>
          <div id="columnWithName">
            <input type="text" value={this.state.columnName} onKeyPress={this.handleKeyPressAddColumn} onChange={this.saveInputName} className="columnName" placeholder="Сolumn's name" />
            <button type="button" className="addColumnButtonWithName" onClick={this.addColumn}>Add column</button>
          </div>
        </div>
      </div>
    )
  }
}


export default ToDoApp