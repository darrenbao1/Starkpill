export interface Page {
	title: string;
	link: string;
	isActive: boolean;
	paramName?: string;
}
export interface Trait {
	id: number;
	name: string;
	link: string;
	tokenId?: number;
	premiumPrice?: number;
	quantityLeft?: number;
}
export interface FAQ {
	question: string;
	answer: string;
}
