import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	color: #222;
	font-size: 1.4rem;
	padding: 15px 20px 15px 20px;
	border: 2px solid #333;
	background-color: #efefef;
	border-radius: 5px;
	cursor: pointer;
	
	transition: 0.5s all;
	
	&:focus, &:hover, &:active {
		outline: none;
	}

	&:hover {
		background-color: #dcdcdc;
	}
		
	&:active {
		background-color: #efefef;
	}
	
`;

const ButtonComponent = ({id, text, additionalStyles, onClickEvt}) => {
	return (
		<Button id={id} style={additionalStyles} onClick={onClickEvt}>
			{text}
		</Button>
	);
}

export default ButtonComponent;