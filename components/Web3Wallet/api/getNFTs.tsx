import { ethers, JsonRpcProvider } from "ethers";
import { NFTData } from "../../../types/interfaces";

export const getNFTs = async (address: string) => {
	const provider = new JsonRpcProvider(
		"https://fluent-powerful-replica.discover.quiknode.pro/1e38ba8d4ceb4ee6da587f5c5cb2d10445229b94/"
	);
	const heads = await provider.send("qn_fetchNFTs", [
		{
			wallet: address,
			//Contracts to fetch NFTs from
			//contracts: ["0xf4A7C105CFdc6aaBe9AE65bDF2d0dF0A567A7aDE"],
		},
	]);
	const result: NFTData[] = heads.assets.map((asset: any) => ({
		name: asset.name,
		imageUrl: asset.imageUrl,
		collectionName: asset.collectionName,
		collectionTokenId: asset.collectionTokenId,
	}));
	return result;
};
