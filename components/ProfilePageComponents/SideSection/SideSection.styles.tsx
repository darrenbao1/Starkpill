import styled from "styled-components";
import Image from "next/image";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px;

	width: 16.688rem;
	border-radius: 12px;

	background: linear-gradient(0deg, #fff 0%, #fff 100%), #c4c4c4;
	h1 {
		color: #343434;
		font-family: Patrick Hand;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-bottom: 0;
		margin-top: 0;
	}
	p {
		color: #494949;
		font-family: Patrick Hand;
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 17px;
		margin-bottom: 0;
	}
	a {
		color: #494949;
		font-family: Patrick Hand;
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 17px;
		margin-bottom: 0;
		text-decoration: underline;
		&:hover {
			color: #ff4f0a;
		}
	}
`;

export const LocationIcon = styled(Image)`
	width: 24px;
	height: 24px;
	margin-top: 15px;
`;

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
