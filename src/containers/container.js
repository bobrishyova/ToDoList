import { connect } from 'react-redux'
import ToDoApp from './ToDoApp'

const mapStateToProps = state => ({
    state,
})

const mapDispatchToProps = dispatch => ({
    addColumn: (name) => dispatch({ type: 'ADD_COLUMN', name })
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDoApp)
