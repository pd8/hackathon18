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

const SpinnerContainer = styled.div`
	flex-grow: 1;
	width: 100%;
`;

const Spinner = styled.div`
	border: 8px solid #f3f3f3; /* Light grey */
	border-top: 8px solid #00539f; /* Blue */
	border-radius: 50%;
	width: 60px;
	height: 60px;
	animation: spin 2s linear infinite;
	margin: ${(window.innerHeight - 120) / 2}px auto auto auto;
`;

class FullHeightWrapper extends Component {
	constructor(props) {
		super(...props);

		this.getQuestions();

		this.state = {
			progress: 0,
			currentQuestion: 0,
			loading: 1,
			realFoodLink: 'https://realfood.tesco.com/',
			questions: [],
			results: [],
			suggestedFood: {
			}
		}
	}

	async getQuestions() {
		let questions = await fetch('http://ec2-52-208-100-245.eu-west-1.compute.amazonaws.com:7001/getQuestions').then(res => res.json());
		this.setState({...this.state, questions: questions.questions})
	};

	async postAnswers(newStateResults) {
		const foo = '["'+newStateResults.join('","')+'"]';
		let suggestedFood = await fetch('http://ec2-52-208-100-245.eu-west-1.compute.amazonaws.com:7001/postAnswers', {
			method: 'POST',
			body: foo
		}).then(res => res.json());
		const formattedSuggestedFood = {
			title: suggestedFood.recipeTitle,
			description: suggestedFood.recipeDescription,
			imageURL: suggestedFood.recipeImage,
			realFoodLink: suggestedFood.realFoodUrl
		};
		this.setState({...this.state, loading: 0, suggestedFood: formattedSuggestedFood})
	};

	startEvt = () => {
		this.setState({...this.state, currentQuestion: 0, progress: 1, results: [], suggestedFood: {}});
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
		this.setState({...this.state, currentQuestion: 0, progress: 0, results: [], suggestedFood: {}, loading: 1});
	};

	nextEvt = () => {
		const prevStateCurrentQuestion = this.state.currentQuestion;
		const newStateCurrentQuestion = prevStateCurrentQuestion + 1;
		const newStateProgress = prevStateCurrentQuestion === this.state.questions.length - 1 ? 2 : 1;
		if (newStateProgress === 2 && this.state.results.length === 0) {
			this.restartEvt();
			return;
		}
		newStateProgress === 2 && this.postAnswers(this.state.results);
		this.setState({...this.state, currentQuestion: newStateCurrentQuestion, progress: newStateProgress});
	};

	clickEvt = (item) => {
		const prevStateCurrentQuestion = this.state.currentQuestion;
		const newStateProgress = prevStateCurrentQuestion === this.state.questions.length - 1 ? 2 : 1;
		const newStateCurrentQuestion = prevStateCurrentQuestion + 1;
		const prevStateResults = this.state.results;
		const newStateResults = [...prevStateResults, item.optionTag];
		if (newStateProgress === 2 && newStateResults.length === 0) {
			this.restartEvt();
			return;
		}
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
						description="Hungry and don't know what you want to eat? No Problem! Using this handy web app you'll be able to decide on your next meal in just one minute!"
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
				{
					this.state.loading === 1 && this.state.progress === 2 &&
						(
							<SpinnerContainer ><Spinner /></SpinnerContainer>
						)
				}
				{
					this.state.loading === 0 && this.state.progress === 2 &&
				(
					<Result
						title={this.state.suggestedFood.title}
						description={this.state.suggestedFood.description}
						realFoodLink={this.state.suggestedFood.realFoodLink}
						imageURL={this.state.suggestedFood.imageURL}
					/>
				)
				}
				{
					(this.state.progress === 1 || this.state.progress === 2) &&
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