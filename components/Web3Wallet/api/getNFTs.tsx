import { ethers, JsonRpcProvider } from "ethers";
import { NFTData } from "../../../types/interfaces";
import client from "../../../apollo-client";
import { CHECK_IS_REDEEMED } from "../../../types/constants";
import { zeroPadHexString } from "../../../types/utils";

export const getNFTs = async (address: string, contract_address: string) => {
	const contractAddressForApi = zeroPadHexString(contract_address);
	const provider = new JsonRpcProvider(
		"https://fluent-powerful-replica.discover.quiknode.pro/1e38ba8d4ceb4ee6da587f5c5cb2d10445229b94/"
	);
	const heads = await provider.send("qn_fetchNFTs", [
		{
			wallet: address,
			contracts: [contract_address],
		},
	]);
	const result: NFTData[] = heads.assets.map((asset: any) => ({
		name: asset.name,
		imageUrl: asset.imageUrl,
		collectionName: asset.collectionName,
		collectionTokenId: asset.collectionTokenId,
	}));
	//create an array from the result that contains only collectionTokenId
	const collectionTokenIds: number[] = result.map((nft) =>
		Number(nft.collectionTokenId)
	);
	//create an async gql call here
	try {
		const isClaimedResultArray = await client.query({
			query: CHECK_IS_REDEEMED,
			variables: {
				tokenIds: collectionTokenIds,
				contractAddress: contractAddressForApi,
			},
		});
		const isClaimedValues = isClaimedResultArray.data.checkIsClaimed;
		// Add isClaimed value to the result array
		result.forEach((nft, index) => {
			nft.hasBeenClaimed = isClaimedValues[index];
		});
	} catch (error) {
		console.log(error);
	}
	return result;
};
