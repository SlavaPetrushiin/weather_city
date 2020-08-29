import React from 'react';
import classes from './Input.module.css';

type IProps = {
	type: string
	value: string
	placeholder: string
	onChange: () => void
}

const Input = (props: IProps) => {
	return (
		<div className={classes.blockInput}>
			<input 
				type={props.type || "text"}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.onChange}
			/>
		</div>
	)
}

export default Input