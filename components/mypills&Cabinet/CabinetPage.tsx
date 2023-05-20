import { useState, useEffect, useRef } from "react";
// import { StarkPillCard } from "../components/StarkPillCard"; <<Previous StarkPillCard
import { StarkPillCard } from "../StarkPillCard/StarkPillCard";

import { useQuery, gql } from "@apollo/client";
import sharedBackgroundStyles from "../../styles/sharedBackground.module.css";

import { DROPDOWN_MENU_ITEMS, handleScrollToTop } from "../../types/constants";
import { BackToTopButton } from "../BackToTopButton";
import { useSelector } from "react-redux";
import {
	DropdownWrapper,
	SortButton,
	SortContainer,
	SortWrapper,
	SortIcon,
	DropdownMenu,
	CustomRadio,
	Top3Container,
	Top3Header,
	StarkPillsHeader,
	CardContainer,
	MenuLabel,
	MenuInput,
	LoadingHeader,
} from "./Cabinet.styles";
export default function CabinetPage() {
	const offsetIncrement = 20; //number of pills per load
	const [offsetAmount, setOffsetAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadedAllPills, setIsLoadedAllPills] = useState(false);
	const [sortOption, setSortOption] = useState(0); // is the index of the DROPDOWN_MENU_ITEMS
	const [showDropbox, setShowDropbox] = useState(false);
	const scrollTopRef = useRef<HTMLDivElement>(null);
	const [showButton, setShowButton] = useState(false);
	const reduxState = useSelector((state: any) => state.refetch);
	function useOutsideAlerter(ref: any) {
		useEffect(() => {
			function handleClickOutside(event: any) {
				if (ref.current && !ref.current.contains(event.target)) {
					setShowDropbox(false);
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	const handleScroll = async (e: any) => {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom && !loading && !loadedAllPills) {
			setLoading(true);
			let i = offsetAmount + offsetIncrement;
			await fetchMore({
				variables: {
					skip: i,
				},
			})
				.then(({ data }) => {
					if (data[DROPDOWN_MENU_ITEMS[sortOption].keyName] < offsetIncrement) {
						setIsLoadedAllPills(true);
					} else setOffsetAmount(offsetAmount + offsetIncrement);
				})
				.finally(() => {
					setLoading(false);
				});
		}
		if (e.target.scrollTop >= 300) {
			setShowButton(true);
		} else if (e.target.scrollTop < 300) {
			setShowButton(false);
		}
	};

	const {
		data,
		loading: loadingInit,
		fetchMore,
	} = useQuery(DROPDOWN_MENU_ITEMS[sortOption].query, {
		variables: {
			skip: 0,
			first: offsetIncrement,
		},
	});
	if (loadingInit) {
		return (
			<div className={`container ${sharedBackgroundStyles.sharedBackground}`}>
				<div className="contentContainer">
					<LoadingHeader>Starkpills</LoadingHeader>
					<CardContainer>Loading</CardContainer>
				</div>
			</div>
		);
	}
	const tokenIds = data[DROPDOWN_MENU_ITEMS[sortOption].keyName];
	const handleOptionChange = (event: any) => {
		setSortOption(Number(event.target.value));
		setShowDropbox(false);
	};
	return (
		<div
			className={`container ${sharedBackgroundStyles.extendedBackground}`}
			onScroll={(e) => handleScroll(e)}
			ref={scrollTopRef}>
			<div className="contentContainer">
				<SortWrapper ref={wrapperRef}>
					<SortContainer>
						<DropdownWrapper>
							<SortButton onClick={() => setShowDropbox(!showDropbox)}>
								<SortIcon />
								<span>Sort ({DROPDOWN_MENU_ITEMS[sortOption].label})</span>
							</SortButton>

							{showDropbox && (
								<DropdownMenu>
									{DROPDOWN_MENU_ITEMS.map((item, index) => (
										<MenuLabel htmlFor={`option${index}`} key={index}>
											<MenuInput
												id={`option${index}`}
												value={index}
												checked={sortOption == index}
												onChange={handleOptionChange}
											/>
											<CustomRadio />
											<span>{item.label}</span>
										</MenuLabel>
									))}
								</DropdownMenu>
							)}
						</DropdownWrapper>
					</SortContainer>
				</SortWrapper>
				{sortOption != 3 && <Top3Header> Top 3 Starkpills</Top3Header>}
				<Top3Container>
					{sortOption != 3 &&
						tokenIds
							.slice(0, 3)
							.map((token: any, index: number) => (
								<StarkPillCard
									tokenId={token.id}
									ownerAddress={token.owner.address}
									mintPrice={token.metadata.mintPrice}
									imageUrl={token.metadata.imageUrl}
									rank={index + 1}
									key={index}
									fame={token.metadata.fame}
								/>
							))}
				</Top3Container>
				<StarkPillsHeader sortOption={sortOption}>Starkpills</StarkPillsHeader>
				<CardContainer>
					{sortOption != 3
						? tokenIds
								.slice(3)
								.map((token: any, index: number) => (
									<StarkPillCard
										tokenId={token.id}
										ownerAddress={token.owner.address}
										mintPrice={token.metadata.mintPrice}
										imageUrl={token.metadata.imageUrl}
										key={index}
										rank={index + 4}
										fame={token.metadata.fame}
									/>
								))
						: tokenIds.map((token: any, index: number) => (
								<StarkPillCard
									tokenId={token.id}
									ownerAddress={token.owner.address}
									mintPrice={token.metadata.mintPrice}
									imageUrl={token.metadata.imageUrl}
									key={index}
									rank={index + 4}
									fame={token.metadata.fame}
								/>
						  ))}
				</CardContainer>
			</div>
			{showButton &&
				!reduxState.imageModalShown &&
				!reduxState.editPillModalShown && (
					<BackToTopButton
						scrollTopFunc={() => handleScrollToTop(scrollTopRef)}
					/>
				)}
			{loading && <div className="snackbar">Loading</div>}
		</div>
	);
}
