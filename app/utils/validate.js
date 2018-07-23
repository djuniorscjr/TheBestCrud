export const required = value => (value ? undefined : 'This fields is required');

export const email = value => (
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
		'Email invalid' : undefined);

export const composeValidators = (...validators) => value =>
	validators.reduce((error, validator) => error || validator(value), undefined);
