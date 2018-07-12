import React from 'react';
import styled from 'styled-components';
import cooklow from './../images/cooktime/cooklow.jpeg';
import cookmed from './../images/cooktime/cookmed.jpeg';
import cookhigh from './../images/cooktime/cookhigh.jpeg';
import sweet from './../images/taste/sweet.jpeg';
import savoury from './../images/taste/savoury.jpeg';

const Container = styled.div`
	width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  flex-grow: 1;
`;

const imageNameToFile = {
	'UNDER_30_MINUTES': cooklow,
	'BETWEEN_30_60': cookmed,
	'OVER_1_HOUR': cookhigh,
	'SWEET': sweet,
	'SAVOURY': savoury
}

const GridBox = styled.div`
  display: flex; 
  width: 100%;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
  border: 2px solid rgb(240,240,240);
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  box-shadow: 1px 1px 1px 1px rgba(30,30,30,0.6);
  
  &:active {
  	outline: none;
  }
`;

const GridBox__Inner = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: row;
`;

const GridBox__Text = styled.h2`
	color: white;
	font-size: 1.8rem;
	font-weight: 900;
	background-color: rgba(30,30,30,0.8);
	padding: 10px;
`;



const ThreeGrid = ({array, additionalStyles, onClick}) => {
	const mapItems = (item) => {
		return <GridBox key={item.optionTag} style={{'backgroundImage': `url(${imageNameToFile[item.optionTag]})`}} onClick={onClick.bind(this, item)}><GridBox__Inner><GridBox__Text>{item.optionText}</GridBox__Text></GridBox__Inner></GridBox>
	};

	return (
		<Container styles={additionalStyles}>
			{array.map(mapItems)}
		</Container>
	);
};

export default ThreeGrid;