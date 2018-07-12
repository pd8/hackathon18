import React, {Component} from 'react';
import styled from 'styled-components';
import fetch from 'node-fetch/browser.js';
import food from './../assets/images/food.jpeg';
import Header from './../assets/styledComponents/header';
import Description from './../assets/styledComponents/description';
import FourGrid from './../assets/styledComponents/four-grid';
import ThreeGrid from './../assets/styledComponents/three-grid';
import Result from '../assets/styledComponents/result';
import Start from '../assets/styledComponents/start';
import Nav from '../assets/styledComponents/nav';

const Container = styled.div`
	display: inline-flex;
	height: ${window.innerHeight}px; 
	width: ${window.innerWidth}px;
	background: linear-gradient(rgba(30,30,30,0.8), rgba(30,30,30,0.6)), url(${food});
	background-size: cover;
	align-items: flex-start;
	flex-wrap: wrap;
	flex-direction: column;
`;

class FullHeightWrapper extends Component {
	constructor(props) {
		super(...props);

		this.getQuestions();

		this.state = {
			progress: 0,
			currentQuestion: 0,
			realFoodLink: 'https://realfood.tesco.com/',
			questions: [],
			results: [],
			suggestedFood: {
				title: 'Raspberry smoothie bowl with pomegranate and clementine',
				description: 'Smoothie bowls are a kind of fruity soup that make a nutrition-packed start to the day. Any range of toppings can work, but we suggest a blend of your favourite fruit topped with crunchy extras such as oats, nuts and seeds, plus other good stuff like yogurt. Get started with this zingy version – a vibrant smoothie recipe and brilliant breakfast idea.',
				imageURL: 'https://realfood.tesco.com/media/images/RFO-RaspberrySmoothieBowl-1400x919-2a9fe1db-00d7-42ef-9fcb-17e23ba76e33-0-1400x919.jpg',
				realFoodLink: 'https://realfood.tesco.com/recipes/raspberry-smoothie-bowl-with-pomegranate-and-clementine.html'
			}
		}
	}

	async getQuestions() {
		let questions = await fetch('http://localhost:7001/getQuestions').then(res => res.json());
		this.setState({...this.state, questions: questions.questions})
	};

	async postAnswers(newStateResults) {
		const foo = '["'+newStateResults.join('","')+'"]';
		let suggestedFood = await fetch('http://localhost:7001/postAnswers', {
			method: 'POST',
			body: foo
		});
		this.setState({...this.state, suggestedFood: suggestedFood})
	};

	startEvt = () => {
		this.setState({...this.state, currentQuestion: 0, progress: 1, results: []});
	};

	backEvt = () => {
		const prevStateCurrentQuestion = this.state.currentQuestion;
		const newStateCurrentQuestion = prevStateCurrentQuestion - 1;
		const optionTags = this.state.questions[newStateCurrentQuestion].questionOptions.map((option) => {
			return option.optionTag;
		});
		const newStateResults = this.state.results.filter((option) => {
			return !optionTags.includes(option);
		});
		this.setState({...this.state, currentQuestion: newStateCurrentQuestion, results: newStateResults});
	};

	restartEvt = () => {
		this.setState({...this.state, currentQuestion: 0, progress: 0, results: []});
	};

	nextEvt = () => {
		const prevStateCurrentQuestion = this.state.currentQuestion;
		const newStateCurrentQuestion = prevStateCurrentQuestion + 1;
		const newStateProgress = prevStateCurrentQuestion === this.state.questions.length - 1 ? 2 : 1;
		this.setState({...this.state, currentQuestion: newStateCurrentQuestion, progress: newStateProgress});
	};

	clickEvt = (item) => {
		const prevStateCurrentQuestion = this.state.currentQuestion;
		const newStateProgress = prevStateCurrentQuestion === this.state.questions.length - 1 ? 2 : 1;
		const newStateCurrentQuestion = prevStateCurrentQuestion + 1;
		const prevStateResults = this.state.results;
		const newStateResults = [...prevStateResults, item.optionTag];
		newStateProgress === 2 && this.postAnswers(newStateResults);
		this.setState({
			...this.state,
			currentQuestion: newStateCurrentQuestion,
			progress: newStateProgress,
			results: newStateResults
		});
	};

	render() {
		{
			console.log(this.state);
		}
		return (
			<Container>
				{this.state.progress === 0 &&
				(
					<Start
						title="Hungry?"
						description="Hungry and don't know what you want to eat? No Problem! Using this handy web app you'll be able to decide on your next meal in a just one minute!"
						buttonText="Begin the journey"
						realFoodLink={this.state.realFoodLink}
						buttonClickEvt={this.startEvt}
					/>
				)
				}
				{this.state.progress === 1 && (
					<Header text={this.state.questions[this.state.currentQuestion].questionTitle} id="header"/>)}
				{this.state.progress === 1 && (
					<Description text={this.state.questions[this.state.currentQuestion].questionText} id="description"/>)}
				{
					this.state.progress === 1 && this.state.questions[this.state.currentQuestion].questionOptions.length === 4 && (
						<FourGrid array={this.state.questions[this.state.currentQuestion].questionOptions}
											 onClick={this.clickEvt}/>)
				}
				{
					this.state.progress === 1 && this.state.questions[this.state.currentQuestion].questionOptions.length === 3 && (
						<ThreeGrid array={this.state.questions[this.state.currentQuestion].questionOptions}
											  onClick={this.clickEvt}/>)
				}
				{
					this.state.progress === 1 && this.state.questions[this.state.currentQuestion].questionOptions.length === 2 && (
						<ThreeGrid array={this.state.questions[this.state.currentQuestion].questionOptions}
											 onClick={this.clickEvt}/>)
				}
				{this.state.progress === 2 &&
				(
					<Result
						title={this.state.suggestedFood.title}
						description={this.state.suggestedFood.description}
						realFoodLink={this.state.suggestedFood.realFoodLink}
						imageURL={this.state.suggestedFood.imageURL}
					/>
				)
				}
				{(this.state.progress === 1 || this.state.progress === 2) &&
				(
					<Nav
						goBack={this.state.progress === 1 && this.state.currentQuestion !== 0}
						goForward={this.state.progress === 1}
						restart={(this.state.progress === 1 || this.state.progress === 2)}
						backEvt={this.backEvt}
						restartEvt={this.restartEvt}
						nextEvt={this.nextEvt}
					/>
				)
				}
			</Container>
		);
	}
}

export default FullHeightWrapper;