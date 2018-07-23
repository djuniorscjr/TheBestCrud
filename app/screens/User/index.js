import React from 'react';

import Form from './Form';
import List from './List';
import Details from './Details';
import { generateUID, getRandomColor } from '../../utils';


// @flow
export type UserType = {
	id: string;
	name: string;
	email: string;
	color: string;
	delete?: boolean;
	new?: boolean;
}

type State = {
	users: Array<UserType>;
	showDetails: boolean;
	userDetails?: UserType;
	userEdit?: UserType;
}

class User extends React.Component<void, State> {
	state: State = {
		users: [],
		showDetails: false,
		userEdit: {},
		userDetails: {},
	};

	getUserById(id: string): UserType {
		const { users } = this.state;
		return users.filter(item => item.id === id)[0];
	}

	remove(array: Array<T>, element: T): void {
		const index = array.indexOf(element);
		if (index !== -1) {
			array.splice(index, 1);
		}
	}

	/* eslint no-param-reassign: ["error", { "props": false }] */
	save = (values: UserType): void => {
		const { users } = this.state;
		if (values.id !== undefined) {
			const index = users.findIndex(item => item.id === values.id);
			users[index] = values;
			this.setState({ users, userEdit: {} });
		} else {
			values.id = generateUID();
			values.color = getRandomColor();
			values.new = true;
			users.push(values);
			this.setState({ users });
		}
	}

	markItemWithAdded = (values: UserType): void => {
		const { users } = this.state;
		const index = users.indexOf(values);
		users[index].new = false;
		this.setState({ users });
	}

	showDetails = (userDetails: UserType): void => {
		this.setState({ showDetails: true, userDetails });
	}

	hideDetails = (): void => {
		this.setState({ showDetails: false });
	}

	edit = (id: string): void => {
		const userEdit = this.getUserById(id);
		this.setState({ userEdit, showDetails: false });
	}

	beforeDelete = (id: string): void => {
		const { users } = this.state;
		const user = this.getUserById(id);
		const index = users.indexOf(user);
		users[index].delete = true;
		this.setState({ users, showDetails: false });
	}

	delete = (user: UserType): void => {
		const { users } = this.state;
		this.remove(users, user);
		this.setState({ users });
	}

	render(): ReactElement {
		return (
			<React.Fragment>
				<Form
					save={this.save}
					user={this.state.userEdit}
					existList={this.state.users.length > 0}
				/>
				<List
					users={this.state.users}
					showDetails={this.showDetails}
					delete={this.delete}
					markWithAdded={this.markItemWithAdded}
				/>
				<Details
					visible={this.state.showDetails}
					hideDetails={this.hideDetails}
					edit={this.edit}
					beforeDelete={this.beforeDelete}
					user={this.state.userDetails}
				/>
			</React.Fragment>
		);
	}
}

export default User;
