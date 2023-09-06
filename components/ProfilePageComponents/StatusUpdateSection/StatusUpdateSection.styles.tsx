import styled from "styled-components";
import Image from "next/image";
export const StatusUpdateSectionContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 53.063rem;
	height: 100px;
	border-radius: 12px;
	background: #fff;
	box-shadow: 0px 1px 0px 0px #ebeef0;
	padding: 16px;
`;

export const ProfilePic = styled(Image)`
	display: flex;
	border-radius: 50%;
	width: 56px;
	height: 56px;
`;

export const StatusUpdateInput = styled.input`
	display: flex;
	width: 100%;
	border: none;
	border-bottom: 1px solid #e3e3e3;
	color: #787878;
	font-family: Poppins;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: 24px;
	&:focus {
		outline: none;
	}
`;
