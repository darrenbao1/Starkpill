import styled from "styled-components";

export const CardContainer = styled.div`
	display: grid;
	--grid-layout-gap: 10px;
	--grid-column-count: 6;
	--grid-item--min-width: 200px;
	--gap-count: calc(var(--grid-column-count) - 1);
	--total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
	--grid-item--max-width: calc(
		(100% - var(--total-gap-width)) / var(--grid-column-count)
	);
	grid-template-columns: repeat(
		auto-fill,
		minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
	);
	grid-template-rows: max-content;
	grid-gap: 2rem;
	height: 100%;
	margin-top: 2.5rem;
	margin-right: 8px;
	padding-bottom: 10vh;
`;

export const NoPillsFound = styled.div`
	text-align: center;
	width: 100%;
`;
