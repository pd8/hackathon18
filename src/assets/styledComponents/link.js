import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
	display: inline-block;
	margin: 8px auto 8px auto;
	color: white;
	font-size: 1.2rem;
	font-weight: 300;
	text-align: center;
	//red ee1c2e
	//blue 00539f
`;

const LinkComponent = ({id, text, additionalStyles, link}) => {
	return (
		<Link id={id} style={additionalStyles} href={link}>
			{text}
		</Link>
	);
}

export default LinkComponent;