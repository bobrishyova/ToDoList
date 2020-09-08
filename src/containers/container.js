import { connect } from 'react-redux'
import ToDoApp from './ToDoApp'
import { actionSetColumn, actionSetCurrentItem, actionSetCurrentColumn } from '../actions/index'

const mapStateToProps = state => ({
	columns: state.toDoApp.columns,
	currentItem: state.toDoApp.currentItem,
	currentColumn: state.toDoApp.currentColumn,
})

const mapDispatchToProps = dispatch => ({
	setColumn: (payload) => dispatch(actionSetColumn(payload)),
	setCurrentItem: (payload) => dispatch(actionSetCurrentItem(payload)),
	setCurrentColumn: (payload) => dispatch(actionSetCurrentColumn(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDoApp)
