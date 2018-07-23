import React from 'react';
import styled from 'styled-components/native';
import User from './screens/User';

import { Colors } from './utils';

const Container = styled.SafeAreaView`
	flex: 1;
	background: ${Colors.primary};
`;

const App = () => (
	<Container>
		<User />
	</Container>
);

export default App;
