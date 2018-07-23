import React from 'react';
import { FlatList, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';

import { Colors } from '../../utils';
import type { UserType } from './';

const Container = styled.View`
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	padding: 10px;
`;

const ActionCard = styled.TouchableOpacity``;

const Card = styled.View`
	height: 80;
	width: 100%;
	background: ${Colors.white};
	padding: 15px;
	border-radius: 10;
	shadow-opacity: 0.20;
  	shadow-radius: 5px;
  	shadow-color: ${Colors.gray};
	shadow-offset: 0px 0px;
	flex-direction: row;
	align-items: center;
`;

const CardAnimated = Animated.createAnimatedComponent(Card);

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
`;

const Name = styled.Text`
	font-size: 22;
`;

const Email = styled.Text`
	font-weight: bold;
	font-size: 12;
	color: ${Colors.gray};
`;

const Space = styled.View`
	padding-top: ${props => props.size};
`;

// @flow
/* eslint react/no-unused-prop-types: 0 */
type PropsItem = {
	item: UserType;
	showDetails: Function;
	delete: Function;
	markWithAdded: Function;
}

const firstLetter = name => name !== undefined && name.toUpperCase().split('')[0];


class Item extends React.Component<PropsItem> {
	constructor(props) {
		super(props);
		this.animatedStyle = {};
		this.itemAnimated = new Animated.Value(0.5);
	}

	componentWillMount() {
		if (this.props.item.new) {
			this.addAnimation();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.item.delete) {
			this.deleteAnimation();
		}
	}

	setAnimatedStyle(removeCard, scaleCard) {
		if (this.props.item.delete) {
			this.animatedStyle = {
				transform: [
					{ scale: scaleCard },
					{ translateX: removeCard },
				],
			};
		} else if (this.props.item.new) {
			this.animatedStyle = {
				transform: [
					{ scale: scaleCard },
				],
			};
		}
	}

	deleteAnimation() {
		Animated.sequence([
			Animated.timing(this.itemAnimated, {
				toValue: 1,
				duration: 250,
			}),
			Animated.timing(this.itemAnimated, {
				toValue: 0,
				duration: 250,
				easing: Easing.inOut(Easing.ease),
			}),
		]).start(() => this.props.delete(this.props.item));
	}

	addAnimation() {
		Animated.sequence([
			Animated.timing(this.itemAnimated, {
				toValue: 1,
				duration: 250,
			}),
			Animated.timing(this.itemAnimated, {
				toValue: 0.5,
				duration: 250,
				easing: Easing.inOut(Easing.ease),
			}),
		]).start(() => this.props.markWithAdded(this.props.item));
	}


	render() {
		const removeCard = this.itemAnimated.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [-360, 0, 200],
		});
		const scaleCard = this.itemAnimated.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0.3, 1, 0.8],
		});
		this.setAnimatedStyle(removeCard, scaleCard);
		return (
			<ActionCard
				onPress={() => this.props.showDetails(this.props.item)}
			>
				<CardAnimated
					style={this.animatedStyle}
				>
					<Avatar
						background={this.props.item.color}
					>
						<FirstLetter>{firstLetter(this.props.item.name)}</FirstLetter>
					</Avatar>
					<Profile>
						<Name>{this.props.item.name}</Name>
						<Email>{this.props.item.email}</Email>
					</Profile>
				</CardAnimated>
			</ActionCard>
		);
	}
}

type Props = {
	users: Array<UserType>;
	showDetails: Function;
	delete: Function;
	markWithAdded: Function;
}

const List = (props: Props): ReactElement => (
	<Container>
		<FlatList
			style={{
				width: '100%',
			}}
			data={props.users}
			renderItem={({ item }: PropsItem): ReactElement => (
				<Item
					showDetails={props.showDetails}
					item={item}
					delete={props.delete}
					markWithAdded={props.markWithAdded}
				/>
			)}
			ItemSeparatorComponent={() => <Space size={15} />}
			keyExtractor={item => item.id.toString()}
		/>

	</Container>
);

export default List;
