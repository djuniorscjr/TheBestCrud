import React from 'react';
import { Keyboard, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Form as FormFinalForm, Field } from 'react-final-form';

import type { UserType } from './';
import { Colors, Validate } from '../../utils';
import { Input } from '../../component';

const Container = styled.View`
	flex: 1;
	background: ${Colors.white};
	justify-content: center;
	align-items: center;
	shadow-opacity: 0.75;
  	shadow-radius: 5px;
  	shadow-color: ${Colors.gray};
	shadow-offset: 0px 0px;
	margin: 5px;
	max-height: 250;
	min-height: 250;
	margin-top: ${props => props.marginTop};
`;

const ContainerAnimated = Animated.createAnimatedComponent(Container);

const Row = styled.View`
	flex-direction: row;
	width: 90%;
`;

const Space = styled.View`
	padding-top: ${props => props.size};
`;

const Button = styled.TouchableOpacity`
	height: 45;
	width: 50%;
	border-width: 3;
	align-items: center;
	justify-content: center;
`;

const TextButton = styled.Text`
	font-weight: 900;
	font-size: 14;
`;

const SaveButton = Button.extend`
	border-color: ${Colors.success};
	background: ${Colors.success};
`;

const ClearButton = Button.extend`
	border-color: ${Colors.black};
	background: ${Colors.black};
`;

const SaveButtonText = TextButton.extend`
	color: ${Colors.white};
`;

const ClearButtonText = TextButton.extend`
	color: ${Colors.white};
`;

// @flow
type Props = {
	save: Function;
	user: UserType;
	existList: boolean;
}

class Form extends React.Component<Props> {
	constructor(props) {
		super(props);
		this.marginTop = new Animated.Value(0);
	}

	componentWillMount() {
		this.animate();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.existList !== this.props.existList) {
			this.animate(nextProps.existList);
		}
	}

	getInitialValue() {
		return this.props.user;
	}

	animate(existList = this.props.existList) {
		Animated.timing(this.marginTop, {
			toValue: existList ? 0 : 50,
			duration: 300,
		}).start();
	}

	dismissKeyboard(fn) {
		new Promise((resolve, reject) => {
			const frameListener = Keyboard.addListener('keyboardWillChangeFrame', () => {
			  frameListener.remove();
			  didListener.remove();
			  resolve();
			});

			const didListener = Keyboard.addListener('keyboardDidHide', () => {
			  frameListener.remove();
			  didListener.remove();
			  resolve();
			});

			Keyboard.dismiss();
		}).then(() => fn());
	}

	render() {
		return (
			<ContainerAnimated
				marginTop={this.marginTop}
			>
				<FormFinalForm
					initialValues={this.getInitialValue()}
					onSubmit={this.props.save}
					render={({
						form,
					}) => (
						<React.Fragment>
							<Field
								width="90%"
								placeholder="Name"
								component={Input.Text}
								validate={Validate.required}
								name="name"
							/>
							<Field
								width="90%"
								placeholder="Email"
								keyboardType="email-address"
								component={Input.Text}
								validate={Validate.composeValidators(Validate.required, Validate.email)}
								name="email"
							/>
							<Field
								name="id"
								component={Input.Hidden}
							/>
							<Field
								name="color"
								component={Input.Hidden}
							/>
							<Space size={15} />
							<Row>
								<ClearButton onPress={() => form.reset()}>
									<ClearButtonText>CLEAR</ClearButtonText>
								</ClearButton>
								<SaveButton
									onPress={() => {
										form.submit();
										if(form.getState().submitSucceeded) {
											this.dismissKeyboard(() => form.reset());
										}
									}}
								>
									<SaveButtonText>SAVE</SaveButtonText>
								</SaveButton>
							</Row>
						</React.Fragment>
					)}
				/>
			</ContainerAnimated>
		);
	}
}

export default Form;
