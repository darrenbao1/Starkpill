import styled from "styled-components";
import Image from "next/image";

export const Container = styled.div`
	display: flex;
	width: 53.063rem;
	height: 24.375rem;
	background: #ffffff;
	border-radius: 12px;
	flex-direction: column;
`;
export const CoverPhotoContainer = styled.div`
	display: flex;
	width: 100%;
	height: 71%;
	border-radius: 12px 12px 0px 0px;
	overflow: hidden;
`;

export const ProfilePictureContainer = styled(Image)`
	display: flex;
	position: absolute;
	margin-top: 10.1rem;
	margin-left: 1.4rem;
	box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.12);

	border-radius: 50%;

	width: 10.063rem;
	height: 10.063rem;
`;

export const DetailsContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 29%;
	width: 100%;

	border-radius: 0px 0px 12px 12px;
`;
export const Details = styled.div`
	display: flex;
	flex-direction: row;
	width: 656px;
	margin-left: 20%;
`;

export const NameContainer = styled.div`
	display: flex;

	flex-direction: column;
	width: 14.75rem;
	height: 3.853rem;

	h1 {
		color: #343434;
		font-family: Patrick Hand;
		font-size: 30px;
		font-style: normal;
		font-weight: 400;
	}
	p {
		color: #343434;
		font-family: Patrick Hand;
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		margin-top: -20px;
	}
`;
export const FollowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 16px;
	margin-left: 60px;
`;
export const FollowContainer = styled.div`
	display: flex;
	width: 95px;
	height: 27px;

	color: #343434;
	font-family: Patrick Hand;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	margin-top: 40px;
	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

export const EditProfileButton = styled.button`
	display: flex;
	height: 40px;
	padding: 8px 16px;
	justify-content: center;
	align-items: center;
	border-radius: 6px;
	border: 1px solid #ff4f0a;
	background: none;
	color: #ff4f0a;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: 100%;
	margin-top: 40px;
	margin-left: 40px;
	&:hover {
		cursor: pointer;
	}
`;

export const FollowButtonWrapper = styled.div`
	display: flex;
	margin-top: 40px;
	margin-left: 40px;
`;
