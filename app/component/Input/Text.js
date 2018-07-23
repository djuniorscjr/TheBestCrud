import React from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

import { Colors } from '../../utils';
import { Input as InputProps, Meta } from '../../flow';

const Container = styled.View`
	height: 42;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-bottom: 12;
`;

const Input = styled.TextInput`
	height: 30;
	width: ${props => props.width};
	font-weight: bold;
	font-size: 19;
	border-color: ${Colors.gray};
	border-bottom-width: 3;
	padding-vertical:0;
`;

const Error = styled.Text`
	height: 12;
	font-size: 10;
	color: ${Colors.error};
	font-weight: bold;
	margin-top: 1;
`;

const ErrorView = styled.View``;

const ErrorViewAnimeted = Animated.createAnimatedComponent(ErrorView);

// @flow
export type Props = {
	input: InputProps;
	meta: Meta;
	width?: string;
	placeholder?: string;
	keyboardType?: string;
}

class Simple extends React.Component<Props> {
	static defaultProps = {
		keyboardType: 'default',
	}

	constructor(props) {
		super(props);
		this.errorScale = new Animated.Value(0);
	}

	componentWillReceiveProps(nextProps) {
		const { touched, error } = nextProps.meta;
		if ((touched && error) !== (this.props.meta.touched && this.props.meta.error)) {
			this.animationError((touched && error !== undefined));
		}
	}

	animationError(existError) {
		if (existError) {
			this.errorScale.setValue(0);
			Animated.spring(this.errorScale, {
				toValue: 1.5,
				duration: 450,
			}).start();
		}
	}

	render() {
		const animationErrorScale = { transform: [{ scale: this.errorScale }] };
		return (
			<Container>
				<Input
					{...this.props.input}
					placeholder={this.props.placeholder}
					placeholderTextColor={Colors.gray}
					width={this.props.width}
					keyboardType={this.props.keyboardType}
					autoCapitalize="none"
					underlineColorAndroid="transparent"
				/>
				{this.props.meta.touched && (this.props.meta.error && (
					<ErrorViewAnimeted style={animationErrorScale}>
						<Error>{this.props.meta.error}</Error>
					</ErrorViewAnimeted>
				))}
			</Container>
		);
	}
}

export default Simple;
