import React from 'react';
import styled from 'styled-components/native';

const Input = styled.TextInput`
	display:none;
`;

const Hidden = () => (
	<Input />
);

export default Hidden;
