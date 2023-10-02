import { StatusUpdateSection } from "../../ProfilePageComponents/StatusUpdateSection";
import { Container, PostContainer, PostsContainer } from "./FeedsPage.styles";
import { Key, useRef, useState } from "react";
import {
	GET_USER_FEED,
	GET_USER_PROFILE,
	handleScrollToTop,
} from "../../../types/constants";
import { useQuery } from "@apollo/client";
import { PostMinimal, UserProfile } from "../../../types/interfaces";
import { useEffect } from "react";
import { getTokenImage } from "../../../types/utils";
import { Post } from "../../ProfilePageComponents/Post";
import { BackToTopButton } from "../../BackToTopButton";
import { useLoader } from "../../Provider/LoaderProvider";
import { Loader } from "../../Loader";
export const FeedsPage = () => {
	const scrollTopRef = useRef<HTMLDivElement>(null);
	const offsetIncrement = 5;
	const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
		null
	);
	const [offsetAmount, setOffsetAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [isAllPostsLoaded, setIsAllPostsLoaded] = useState(false);
	const { data: userProfileData, loading: loadingProfile } = useQuery<{
		user: UserProfile;
	}>(GET_USER_PROFILE, {
		variables: {
			address: localStorage.getItem("walletAddress"),
		},
	});

	const {
		data,
		loading: loadingInit,
		fetchMore,
		refetch,
	} = useQuery(GET_USER_FEED, {
		variables: {
			skip: 0,
			first: offsetIncrement,
			walletAddress: localStorage.getItem("walletAddress"),
		},
	});
	const { showLoader, hideLoader, isLoading } = useLoader();
	useEffect(() => {
		if (userProfileData) {
			const userProfile = userProfileData.user;
			const fetchProfilePicture = async () => {
				try {
					const imageUrl = await getTokenImage(
						userProfile.profilePictureTokenId
					);
					setProfilePictureUrl(imageUrl);
				} catch (error) {
					console.error("Error fetching profile picture:", error);
				}
			};
			fetchProfilePicture();
		}
	}, [userProfileData]);
	const handleScroll = async (e: any) => {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom && !loading && !isAllPostsLoaded) {
			setLoading(true);
			showLoader();
			let i = offsetAmount + offsetIncrement;
			await fetchMore({
				variables: {
					skip: i,
					first: offsetIncrement,
				},
			})
				.then(({ data }) => {
					if (data.getPostsForUser < offsetIncrement) {
						setIsAllPostsLoaded(true);
					} else setOffsetAmount(offsetAmount + offsetIncrement);
				})
				.finally(() => {
					setLoading(false);
					hideLoader();
				});
		}
		if (e.target.scrollTop >= 300) {
			setShowButton(true);
		} else if (e.target.scrollTop < 300) {
			setShowButton(false);
		}
	};

	if (loadingInit || loadingProfile)
		return (
			<div className="pageContainer">
				<Loader />
			</div>
		);

	return (
		<div
			className="pageContainer"
			onScroll={(e) => handleScroll(e)}
			ref={scrollTopRef}>
			<Container>
				<PostsContainer>
					<StatusUpdateSection
						profilePictureUrl={
							profilePictureUrl ? profilePictureUrl : "/basepill.png"
						}
						refetch={refetch}
					/>
					{data?.getPostsForUser.map((post: PostMinimal) => {
						return (
							<PostContainer key={post.id}>
								<Post postMinimal={post} refetchUserProfile={refetch} />
							</PostContainer>
						);
					})}
				</PostsContainer>
			</Container>
			{showButton && (
				<BackToTopButton
					scrollTopFunc={() => handleScrollToTop(scrollTopRef)}
				/>
			)}
			{isLoading && <Loader />}
		</div>
	);
};
