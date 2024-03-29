export interface Page {
	title: string;
	link: string;
	isActive: boolean;
	paramName?: string;
	isBeta?: boolean;
}
export interface Trait {
	id: number;
	name: string;
	link: string;
	tokenId?: number;
	premiumPrice?: number;
	quantityLeft?: number;
	marketViewLink?: string;
	isHidden?: boolean;
}
export interface FAQ {
	question: string;
	answer: string;
}
export interface NFTData {
	name: string;
	imageUrl: string;
	collectionName: string;
	collectionTokenId: string;
	hasBeenClaimed?: boolean;
}
export enum TraitName {
	Ingredient = "Ingredient",
	Background = "Background",
}
export const typeIndex: Record<TraitName, number> = {
	[TraitName.Ingredient]: 1,
	[TraitName.Background]: 2,
};

export interface CollabProject {
	contract_address: string;
	name: string;
	imageUrl: string;
	redeemIngId: number;
	redeemBgId?: number;
}

export interface decodedSignature {
	v: number;
	rLow: string;
	rHigh: string;
	sLow: string;
	sHigh: string;
}

export interface InventoryTokenObj {
	id: number;
	imageUrl: string;
	isIngredient: boolean;
	itemName: string;
	equippedById: number;
	address?: string;
}

export interface StarkpillToken {
	ownerAddress: string;
	imageUrl: string;
	mintPrice: number;
	tokenId: number;
	fame: number;
	bgId: number;
	ingId: number;
}

export interface UserProfile {
	address: string;
	totalFame: number;
	username: string | null;
	twitterHandle: string | null;
	firstName: string | null;
	lastName: string | null;
	bio: string | null;
	profilePictureTokenId: number | null;
	ensDomain: string | null;
	location: string | null;
	websiteUrl: string | null;
	coverPictureUrl: string | null;
	followersCount: number;
	followingCount: number;
	followers: string[];
	following: string[];
	transactions: any[];
	posts: Post[];
	pos_x_CoverPicture: number;
	pos_y_CoverPicture: number;
}

export interface UserProfileBasic {
	address: string;
	username: string | null;
	twitterHandle: string | null;
	profilePictureTokenId: number | null;
	followers: string[];
	following: string[];
	transactions: any[];
}

export enum Action {
	Unfollow = 1,
	RemoveFollower = 2,
	RemoveCoverPhoto = 3,
}

export interface Post {
	id: number;
	authorId: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	images: string[] | null;
	authorAddress: string;
	likes: Like[];
	comments: Comment[];
	likedByAddresses: string[];
}
export interface Comment {
	authorId: number;
	createdAt: string;
	id: number;
	postId: number;
	text: string;
	updatedAt: string;
	authorAddress: string;
}
export interface Like {
	accountId: number;
	createdAt: string;
	id: number;
	postId: number;
	updatedAt: string;
}
export interface PostMinimal {
	id: number;
	authorAddress: string;
}
//create an enum to store Status code for the API
export enum Status {
	Success = 200,
	SuccessCreate = 201,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500,
}
