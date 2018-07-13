import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Description from './description';
import Link from './link';

const Image = styled.img`
	flex-grow: 1;
	background-image: url(${props => (props.url) });
	background-size: cover;
	background-position: center;
  border: 2px solid rgb(240,240,240);
	box-shadow: 1px 1px 1px 1px rgba(30,30,30,0.6);
	margin: 10px 20px 10px 20px;
  border-radius: 5px;
  width: -webkit-fill-available;
`;

const Result = ({title, description, realFoodLink, imageURL}) => [
	<Header text={title} key="title" additionalStyles={{'fontSize': '1.6rem'}} />,
	<Image url={imageURL} key="image" />,
	<Description text={description} key="description" additionalStyles={{'fontSize': '1.2rem'}} />,
	<Link text="View on the RealFood website" link={realFoodLink} key="More like this" additionalStyles={{'margin': '20px auto 12px auto'}} target="_blank"/>,
];

export default Result;