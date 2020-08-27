import React from 'react'

const Item = ({
	movingTaskToAnotherColumn,
	item,
	toggleCheckbox,
	DoneTask,
	deleteTask,
	getCurrentItem,
	currentItem,
	wrapperRef,
	columns,
	column,
}) => {
	return(
		<div className="taskWithMoving">
			<div className="task">
				<div className="checkbox">
					<input 
						type="checkbox" 
						checked={item.done} 
						onChange={toggleCheckbox(item)} 
					/>
				</div>
				<p className="text" style={item.done ? DoneTask : {}}>{item.text}</p>
				<button className="button" onClick={deleteTask(item.id)}>&#128465;</button>
			</div>
			<div>
				<button className="buttonMovingTask notClickOutside" type="button" onClick={getCurrentItem(item)}>
					&#8942;
					{item.id === currentItem.id && columns.length > 1 && (
						<div ref={wrapperRef} className="movingTask">
							{columns.map((movingColumn) => (
								<div key={movingColumn.id}>
									{movingColumn.id !== column.id && (
										<button 
											className="columnNameToMoveTask" 
											onClick={movingTaskToAnotherColumn(movingColumn, column)}
										>
											{movingColumn.name}
										</button>
									)}
								</div>
							))}
						</div>
					)}
				</button>
			</div>
		</div>
	)
}

export default Item