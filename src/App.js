import React from 'react'


const DoneTask = {
  textDecoration: "line-through",
}

class ToDoApp extends React.Component {
  state = {
    items: [],
    text: '',
  }

  saveInputText = (event) => this.setState({
    text: event.target.value,
  })

  addItem = () => {
    if (this.state.text.length === 0) {
      return null
    }
    this.setState((state) => ({
      items: [
        ...state.items,
        {
          text: state.text,
          id: Date.now(),
          done: false,
        }
      ],
      text: '',
    })
    )
  }

  deleteTask = (id) => () => {
    const filteredItems = this.state.items.filter((item) => item.id !== id)
    this.setState({
      items: filteredItems,
    })
  }

  doneTask = (currentItem) => () => {
    const newItems = this.state.items.map((item) => {
      if (currentItem.id === item.id) {
        return {
          ...item,
          done: !currentItem.done,
        }
      }
      return item
    })
    this.setState({
      items: newItems,
    })
  }

  render() {
    return (
      <div className="toDo">
        <form className="toDoForm">
          <input type="text" value={this.state.text} placeholder="Task" onChange={this.saveInputText} />
          <button id="button" type="button" onClick={this.addItem}>Add</button>
        </form>
        {this.state.items.map((item) => (
          <div key={item.id} className="task">
            <form className="checkbox">
              <input type="checkbox" checked={item.done} onChange={this.doneTask(item)} />
            </form>
            <p className="text" style={item.done ? DoneTask : {}}>{item.text}</p>
            <button className="button" onClick={this.deleteTask(item.id)}>&times;</button>
          </div>
        ))}
      </div>
    )
  }
}


export default ToDoApp