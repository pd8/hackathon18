import React from 'react';
import styled from 'styled-components';

const Description = styled.p`
	display: inline-block;
	margin: 8px 12px 8px 20px;
	color: white;
	font-size: 1.2rem;
	font-weight: 300;
	text-align: left;
`;

const DescriptionComponent = ({id, text, additionalStyles}) => {
	return (
		<Description id={id} style={additionalStyles}>
			{text}
		</Description>
	);
}

export default DescriptionComponent;