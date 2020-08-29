import React from 'react';
import classes from './Input.module.css';

type IProps = {
	type: string
	value: string
	placeholder: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: IProps) => {
	return (
		<div className={classes.blockInput}>
			<input 
				type={props.type || "text"}
				value={props.value}
				placeholder={props.placeholder}
				onChange={(e) => props.onChange(e)}
			/>
		</div>
	)
}

export default Input