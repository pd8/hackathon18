import React from 'react';
import styled from 'styled-components';
import english from './../images/cuisine/english.jpeg';
import american from './../images/cuisine/american.jpeg';
import french from './../images/cuisine/french.jpg';
import chinese from './../images/cuisine/chinese.jpeg';
import wheatfree from './../images/diet/wheatfee.jpeg';
import vegetarian from './../images/diet/veg.jpeg';
import eggfree from './../images/diet/eggfree.jpeg';
import dairyfree from './../images/diet/dairyfree.jpeg';
import breakfast from './../images/course/breakfast.jpeg';
import lunch from './../images/course/lunch.jpg';
import dinner from './../images/course/dinner.jpeg';
import dessert from './../images/course/dessert.jpg';

const Container = styled.div`
	width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  flex-grow: 1;
`;

const imageNameToFile = {
	'WHEAT_FREE': wheatfree,
	'VEGETARIAN': vegetarian,
	'EGG_FREE': eggfree,
	'DAIRY_FREE': dairyfree,
	'BREAKFAST': breakfast,
	'LUNCH': lunch,
	'DINNER': dinner,
	'DESSERT': dessert,
	'BRITISH': english,
	'AMERICAN': american,
	'FRENCH': french,
	'CHINESE': chinese,
}

const GridBox = styled.div`
  display: flex; 
  flex-basis: calc(50% - 40px);  
  justify-content: center;
  flex-direction: column;
  margin: 20px;
  border: 2px solid rgb(240,240,240);
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  background-color: #333333b3;
  box-shadow: 1px 1px 1px 1px rgba(30,30,30,0.6);
  
  &:active {
  	outline: none;
  }
  
  &:hover {
  	cursor: pointer;
  }
`;

const GridBox__Inner = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: row;
`;

const GridBox__Text = styled.h2`
	color: white;
	font-size: 1.5rem;
	font-weight: 900;
	background-color: rgba(30,30,30,0.8);
	padding: 10px;
`;

const FourGrid = ({array, additionalStyles, onClick}) => {
	const mapItems = (item) => {
		return <GridBox key={item.optionTag} style={{'backgroundImage': `url(${imageNameToFile[item.optionTag]})`}} onClick={onClick.bind(this, item)}><GridBox__Inner><GridBox__Text>{item.optionText}</GridBox__Text></GridBox__Inner></GridBox>
	};

	return (
		<Container styles={additionalStyles}>
			{array.map(mapItems)}
		</Container>
	);
}

export default FourGrid;