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
