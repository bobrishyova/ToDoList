import React from 'react'


class ToDoApp extends React.Component {
  state = {
    items: [],
    text: '',
  }

  saveInputText = (event) => this.setState({
    text: event.target.value,
  })

  addItem = () => {
    this.setState((state) => ({
      items: [
        ...state.items,
        {
          text: state.text,
          id: Date.now(),
        }
      ],
      text: '',
    })
    )
  }

  render() {
    return (
      <div className="toDo">
        <form>
          <input type="text" value={this.state.text} placeholder="Task" onChange={this.saveInputText} />
          <button id="button" type="button" onClick={this.addItem}>Add</button>
        </form>
        <ul>
          {this.state.items.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    )
  }
}


export default ToDoApp