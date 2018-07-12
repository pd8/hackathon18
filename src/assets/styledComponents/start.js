import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Description from './description';
import Button from './button';
import Link from './link';

const Image = styled.img`
	height: ${window.innerHeight / 10}px;
	background-image: url(${props => (props.url) });
	background-size: cover;
	background-position: center;
	margin: auto;
`;

const Start = ({title, description, realFoodLink, buttonText, buttonClickEvt}) => [
	<Header text={title} key="title" />,
	<Button text={buttonText} key="button" additionalStyles={{'margin': 'auto'}} onClickEvt={buttonClickEvt}/>,
	<Description text={description} key="description" additionalStyles={{'fontSize': '1.2rem', 'margin': 'auto 80px'}} />,
	<Image key="image" src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Tesco_Logo.svg/1280px-Tesco_Logo.svg.png" style={{'margin': 'auto auto 10px auto'}} />,
	<Link text="View the RealFood website" link={realFoodLink} key="realfood" additionalStyles={{'marginBottom': '68px'}} />,
];

export default Start;