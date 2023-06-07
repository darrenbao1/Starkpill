import Styled, { css } from "styled-components";
import Image from "next/image";
import KebabIcon from "../../public/svgs/kebab.svg";
import KebabIconSmall from "../../public/svgs/kebabSmall.svg";
import EditPillIcon from "../../public/svgs/EditPillIcon.svg";
import PillDetailsIcon from "../../public/svgs/PillDetailsIcon.svg";
import ExternalLinksIcon from "../../public/svgs/EditPillIcon.svg";

import DownloadLogo from "../../public/svgs/downloadIcon.svg";

//STYLED COMPONENTS FOR THE CARD(StarkpillCard.tsx) ↓↓↓

//Interfaces ↓↓↓
interface CardProps {
	isTop3: boolean;

	rank: number;
}
interface MenuProps {
	isOwner?: boolean;
	isTop3: boolean;
}
interface OptionProps {
	isOwner?: boolean;
}

//Overall Card Container ↓↓↓
export const Card = Styled.div<CardProps>`
    width: ${(props) => (props.isTop3 ? "300px" : "200px")};
    border: ${(props) =>
			props.isTop3 && props.rank === 1
				? "5px solid #FFC107"
				: props.isTop3 && props.rank === 2
				? "5px solid #E0E0E0"
				: props.isTop3 && props.rank === 3
				? "5px solid #FF9838"
				: "2px solid rgba(228, 228, 228, 0.6)"};
    border-radius: ${(props) => (props.isTop3 ? "12px" : "7.7px")};
	margin: auto;
	display: grid;
	cursor: pointer;
	position: relative;
	font-size: ${(props) => (props.isTop3 ? "26px" : "20px")};
    
    //HOVER EFFECTS FOR THE TOP 3 CARDS ↓↓↓ 
    &:hover {
        outline: ${(props) => (props.isTop3 ? "2px solid #ff4f0a;" : "none")};
    }
    
@media screen and (max-width: 500px) {
    width: 300px;
    `;

//Inner Container wraps the image and content ↓↓↓
export const CardInnerContainer = Styled.div`
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    border-radius: 6px;`;

//IMAGE OF CARD ↓↓↓
export const CardImage = Styled(Image)<CardProps>`

    width: ${(props) => (props.isTop3 ? "300px" : "200px")};
	height: ${(props) => (props.isTop3 ? "300px" : "200px")};
	background-color: white;
	border-bottom: 1px solid hsla(0,0%,89%,.6);
    
    &:hover {
        opacity: 0.7}
    @media screen and (max-width: 500px) {
        width: 300px;
        height: 300px;
    }
    `;
//CONTENT OF CARD ↓↓↓
export const Content = Styled.div<CardProps>`
    padding-left: ${(props) => (props.isTop3 ? "20px" : "16px")};
    padding-bottom: ${(props) => (props.isTop3 ? "0px" : "2px")};
    font-size: large;
    width: ${(props) => (props.isTop3 ? "290px" : "200px")};
    color: black;
    background-color: white;
    
    border-top: none;
   
    h1{
        font-size: ${(props) => (props.isTop3 ? "32px" : "24px")};
        color: #ff4f0a;
        margin-bottom: ${(props) => (props.isTop3 ? "0px" : "0px")};
    }
    h1:hover {
        text-decoration: underline;}
    @media screen and (max-width: 500px) {
        width: 300px;
    }
    p {
       font-size:  ${(props) => (props.isTop3 ? "26px" : "large")};
       line-height: 0.5;   
       }
`;

// export const ButtonContainer = Styled.div`
//     background-color: white;
// 	border-radius: 6px 6px 0 0;
// 	padding: 10px;`;

//Container for TestPill Name & Kebab Icon ↓↓↓
export const HeaderContainer = Styled.div`
display: flex;
align-items: center;`;

export const KebabIconStyled = Styled.div<CardProps>`
    position:absolute;
    right: 0px;
    cursor: pointer;
    margin-bottom: -20px;
    width: 40px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 500px) {
         
        top: ${(props) => (props.isTop3 ? "205" : "305px")};
    }
    `;

//Kebab Menu Bubble↓↓↓
export const MenuOptionsWrapper = Styled.div<MenuProps>`
    position: absolute;
    z-index:3;
    top: ${(props) =>
			props.isTop3
				? "calc(100% - 130px);"
				: props.isOwner
				? "calc(100% - 60px);"
				: "calc(100% - 87px);"};
    right: ${(props) =>
			props.isTop3
				? props.isOwner
					? "-30px"
					: "-2px"
				: props.isOwner
				? "-3px"
				: "-2px"};

`;
export const MenuOptions = Styled.div<OptionProps>`
    background-color: white;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #262626;
    border:1px solid #ccc;
    border-radius: 8px;
    padding: 0px 8px -0px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
   
   &:before {
        content: "";
        position: absolute;
        border-style: solid;
        border-color: #ccc transparent;
        border-width: 0 12.5px 11.5px 13px;
        top: -11px;
        left: 75%;
            } 
    &:after {
    
                content: "";
                position: absolute;
                border-style: solid;
                border-width:0 13px 12px 13px;
                
                border-color: #fff transparent;
                top: -10px;
                left: 75%;
                }

//ADJUST OPTIONS HERE ↓↓↓                                    
     p {
        padding: 0px 16px 0px 16px;
	    cursor: pointer;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
         
        display: flex;
        align-items: center;
        
        gap: 5px;
        
        &:hover {
            background-color: #f1f1f1}
        }
        //First Option ↓
        p:first-child {
            padding-top: 0px;
           
           
        }
        p:nth-child(2) {
            padding-left: ${(props) => (props.isOwner ? "12px" : "16px")};
            gap: ${(props) => (props.isOwner ? "3px" : "5px")};
          
       }
   
       //LastOption ↓↓↓
        p:last-child {
            padding-top: 0px;
            margin-bottom: 10px;
            border-bottom: none;
            padding-bottom: 0px;

        }
            `;

//Icons↓↓↓
const sharedIconStyles = css``;
export const EditIcon = Styled(EditPillIcon)`
   
    `;
export const DetailsIcon = Styled(PillDetailsIcon)`
    ${sharedIconStyles}
    `;
export const ExternalLinks = Styled(ExternalLinksIcon)`
    ${sharedIconStyles}
    `;
export const SaveImageIcon = Styled(DownloadLogo)`
`;
