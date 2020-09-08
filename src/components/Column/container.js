import { connect } from 'react-redux'
import Column from './component'

const mapStateToProps = state => ({
    testColumns: state.toDoApp.columns,
})

const mapDispatchToProps = dispatch => ({
    testSetColumn: (payload) => dispatch({ type: 'SET_COLUMN', payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(Column)
