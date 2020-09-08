import React from 'react'
import ToDoApp from './containers/container'
import store from './store'
import { Provider } from 'react-redux'

 const App = () => {
  return (
    <Provider store={store}>
      <ToDoApp />
    </Provider>
  )
}

export default App
