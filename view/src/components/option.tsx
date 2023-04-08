import React from 'react'

type PropTypes = {
	display: Database | Table
	isSelected: boolean
	onMouseOver?: () => void
	onClick?: () => void
}

export default ({ display, onMouseOver, isSelected, onClick }: PropTypes): JSX.Element => {

	return <>
		<div onMouseOver={onMouseOver ? onMouseOver : () => {}} onClick={onClick ? onClick : () => {}} key={JSON.stringify(display)} className='h-[8%] w-full my-8 flexer flex-col'>
			<span className='cursor-pointer text-lg text-slate-300 w-[50%] h-full border-y-2 overflow-x-visible flexer [transition:.3s] hover:w-[60%]'>{display.name}</span>
		</div>
	</>
}