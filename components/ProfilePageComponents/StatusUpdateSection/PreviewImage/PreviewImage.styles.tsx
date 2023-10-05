import styled from "styled-components";
import CloseIcon from "../../../../public/svgs/closeIconImagePreview.svg";
export const PreviewImageContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
	gap: 8px;
	max-height: 358px;
	height: 100vh;
	border-radius: 12px;
	overflow-x: auto;
`;
export const CloseButton = styled(CloseIcon)`
	display: flex;
	width: 31px;
	height: 31px;
	cursor: pointer;
	position: absolute;
	top: 12px;
	right: 16px;
	background: white;
	border-radius: 4px;
`;
export const PreviewImageItem = styled.div`
	position: relative;
	border-radius: 12px;
	&:hover {
		cursor: pointer;
	}
`;
