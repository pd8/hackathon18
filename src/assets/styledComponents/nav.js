import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: ${window.innerWidth}px;
	height: 60px;
	background-color: #c71928;
	display: flex;
	text-align: center;
	color: white;
	border-top: 2px solid #bb1422;
`;

const Box = styled.div`
	width: ${props => props.width}%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-left: 1px solid #bb1422;
	border-right: 1px solid #bb1422;
	cursor: pointer;
	transition: 0.5s all;
	
	&:hover {
		background-color: #bb1422;
	}
	
	&:active {
		background-color: #ffffff;
	}
`;

const Nav = ({goBack, goForward, restart, backEvt, restartEvt, nextEvt}) => {
	const width = goBack && goForward && restart ? (100/3) : (100);
	return (
		<Container>
			{
				goBack &&
				(
					<Box
						width={width}
						onClick={backEvt}
					>
						back
					</Box>
				)
			}
			{
				restart &&
				(
					<Box
						width={width}
						onClick={restartEvt}
					>
						restart
					</Box>
				)
			}
			{
				goForward &&
				(
					<Box
						width={width}
						onClick={nextEvt}
					>
						next
					</Box>
				)
			}
		</Container>
	);
}

export default Nav;