import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
	display: inline-block;
	margin: 20px auto 8px auto;
	padding: 0 12px 0 12px;
	color: white;
	font-size: 4rem;
	text-align: center;
`;

const HeaderComponent = ({id, text, additionalStyles}) => {
	return (
		<Header id={id} style={additionalStyles}>
			{text}
		</Header>
	);
}

export default HeaderComponent;