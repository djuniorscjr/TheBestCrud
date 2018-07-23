import React from 'react';
import { Platform, Dimensions, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';

import type { UserType } from './';
import { Colors } from '../../utils';

const Container = styled.View`
	height: ${Dimensions.get('screen').height};
	width: ${Dimensions.get('screen').width};
	background: ${Colors.transparent()};
	z-index: 2;
	${({ visible }) => visible && `
		position: absolute;
  	`}
	bottom: 0;
	justify-content: flex-end;
	align-items: center;
	padding-horizontal: 10px;
	opacity: ${props => props.opacity};
	display: ${props => (props.visible ? 'flex' : 'none')};
`;

const ContainerAnimated = Animated.createAnimatedComponent(Container);

const Card = styled.View`
	height: 200;
	width: 100%;
	background: ${Colors.white};
	padding: 15px;
	border-radius: 10;
	shadow-opacity: 0.20;
  	shadow-radius: 5px;
  	shadow-color: ${Colors.gray};
	shadow-offset: 0px 0px;
	flex-direction: column;
	align-items: center;
	margin: 10px;
`;

const CardAnimated = Animated.createAnimatedComponent(Card);

const CloseButton = styled.TouchableOpacity`
	width: 20;
	height: 20;
	border-radius: 10;
	background: ${Colors.gray};
	justify-content: center;
	align-items: center;
	align-self: flex-end;
`;

const CloseButtonText = styled.Text`
	color: ${Colors.white};
	font-size: 18;
	line-height: 18;
	align-self: center;
	font-weight: 400;
	font-family: ${Platform.OS === 'android' ? 'Roboto' : 'Verdana'};
`;

const Avatar = styled.View`
	background: ${props => props.background};
	height: 50;
	width: 50;
	border-radius: 25;
	align-items: center;
	justify-content: center;
`;

const FirstLetter = styled.Text`
	font-weight: bold;
	font-size: 22;
	color: ${Colors.white};
`;

const Profile = styled.View`
	flex-direction: column;
	padding-left: 10;
	align-items: center;
`;

const Name = styled.Text`
	font-size: 22;
`;

const Email = styled.Text`
	font-weight: bold;
	font-size: 12;
	color: ${Colors.gray};
`;

const Row = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	margin-top: 25;
	justify-content: space-around;
`;

const Button = styled.TouchableOpacity`
	height: 35;
	width: 40%;
	align-items: center;
	justify-content: center;
	border-radius: 5;
`;

const TextButton = styled.Text`
	font-weight: bold;
	font-size: 14;
`;

const DeleteButton = Button.extend`
	background: ${Colors.errorLight};
`;

const EditButton = Button.extend`
	background: ${Colors.successLight};
`;

const DeleteButtonText = TextButton.extend`
	color: ${Colors.error};
`;

const EditButtonText = TextButton.extend`
	color: ${Colors.success};
`;

// @flow
type Props = {
	visible: boolean;
	edit: Function;
	beforeDelete: Function;
	hideDetails: Function;
	user: UserType;
}

const firstLetter = name => name !== undefined && name.toUpperCase().split('')[0];

const animateHideOrShowDetails = (value, move, opacity, fn) => {
	const opacityAnimated = Animated.timing(opacity, {
		toValue: value,
		duration: 300,
	});
	const moveAnimated = Animated.timing(move, {
		toValue: value,
		duration: 500,
		easing: Easing.back(5),
	});
	const animations = value ?
		[opacityAnimated, moveAnimated]
		: [moveAnimated, opacityAnimated];

	Animated.sequence(animations).start(() => fn());
};


const Details = (props: Props): ReactElement => {
	const move = new Animated.Value(0);
	const opacity = new Animated.Value(0);
	if (props.visible) {
		animateHideOrShowDetails(1, move, opacity, () => false);
	}

	const movingCard = move.interpolate({
		inputRange: [0, 1],
		outputRange: [-200, 0],
	});
	const scaleCard = move.interpolate({
		inputRange: [0, 1],
		outputRange: [0.5, 1],
	});
	return (
		<ContainerAnimated
			opacity={opacity}
			visible={props.visible}
		>
			<CardAnimated
				style={{
					transform: [
						{ translateY: movingCard },
						{ scale: scaleCard },
					],
				}}
			>
				<CloseButton
					onPress={() =>
						animateHideOrShowDetails(0, move, opacity, props.hideDetails)
					}
				>
					<CloseButtonText>x</CloseButtonText>
				</CloseButton>
				<Avatar
					background={props.user.color || Colors.white}
				>
					<FirstLetter>{firstLetter(props.user.name)}</FirstLetter>
				</Avatar>
				<Profile>
					<Name>{props.user.name}</Name>
					<Email>{props.user.email}</Email>
				</Profile>
				<Row>
					<DeleteButton
						onPress={() =>
							animateHideOrShowDetails(0, move, opacity, () => props.beforeDelete(props.user.id))
						}
					>
						<DeleteButtonText>Delete</DeleteButtonText>
					</DeleteButton>

					<EditButton
						onPress={() =>
							animateHideOrShowDetails(0, move, opacity, () => props.edit(props.user.id))
						}
					>
						<EditButtonText>Edit</EditButtonText>
					</EditButton>
				</Row>
			</CardAnimated>
		</ContainerAnimated>
	);
};

export default Details;
