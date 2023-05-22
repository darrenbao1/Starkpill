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
}
