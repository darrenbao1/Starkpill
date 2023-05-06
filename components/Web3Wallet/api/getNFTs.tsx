import { ethers, JsonRpcProvider } from "ethers";
export const getNFTs = async (address: string) => {
	const provider = new JsonRpcProvider(
		"https://fluent-powerful-replica.discover.quiknode.pro/1e38ba8d4ceb4ee6da587f5c5cb2d10445229b94/"
	);
	const heads = await provider.send("qn_fetchNFTs", [
		{
			wallet: { address },
			contracts: ["0xf4A7C105CFdc6aaBe9AE65bDF2d0dF0A567A7aDE"],
		},
	]);
	//console.log(heads.assets);
	return heads.assets;
};
