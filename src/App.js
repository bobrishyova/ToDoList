import React from 'react'
import ToDoApp from './containers/ToDoApp'
import store from './store'
import { Provider } from 'react-redux'

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <ToDoApp />
      </Provider>
    )
  }
}
