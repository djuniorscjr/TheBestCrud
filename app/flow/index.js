// @flow

export type Meta = {
	touched?: boolean;
	error?: string;
}

export type Input = {
	name: string;
	value?: Object;
	onBlur?: Function;
	onChange?: Function;
	onFocus?: Function;
}
