import React from 'react'

type Props = {
	children: React.ReactNode
	className?: string
}

function Column({ children, className }: Props): JSX.Element {


	return <>
		<div className={'w-1/4 h-full bg-gray-800 relative' + (className ? ' ' + className : '')}>
			{children}
		</div>
	</>
}

export default Column