import {
	Dimensions,
	Platform,
} from 'react-native';
import * as Colors from './colors';
import * as Validate from './validate';

const isIphoneX = () => {
	const dimen = Dimensions.get('window');
	return (
		Platform.OS === 'ios' &&
		!Platform.isPad &&
		!Platform.isTVOS &&
		(dimen.height === 812 || dimen.width === 812)
	);
};

const generateUID = () => {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return `${s4()}${s4()} - ${s4()} - ${s4()} - ${s4()} - ${s4()}${s4()}${s4()}`;
};

const getRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i += 1) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export { Colors, isIphoneX, Validate, generateUID, getRandomColor };
