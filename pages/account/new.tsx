import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import { ethers } from "ethers";
import { request, gql } from "graphql-request"

const AccountEditPage: NextPage = () => {
  const router = useRouter();
  const address = "0x78A42a84bFE3E173C3A9246b3F5F1c5Aa8BBaE72";
  const [ensNames, setEnsNames] = useState<any>([]);

  const getEnsNamePromise = (tokenId: string) => {
    const BigNumber = ethers.BigNumber
    const labelHash = BigNumber.from(tokenId).toHexString()
  
    const url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
    const GET_LABEL_NAME = gql`
    query{
      domains(first:1, where:{labelhash:"${labelHash}"}){
        labelName
      }
    }`

    return request(url, GET_LABEL_NAME);
    // request(url, GET_LABEL_NAME).then((data) => {
    //   console.log("getEns", data.domains[0].labelName);
    //   return data.domains[0].labelName;
    // })
  }

  useEffect(() => {
    const fetchEns = async () => {
      const options = {
        method: 'GET',
        url: `https://api.nftport.xyz/v0/accounts/${address}`,
        params: {chain: 'ethereum', contract_address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85", include: "metadata"},
        headers: {'Content-Type': 'application/json', Authorization: '51bb64f4-d1da-462a-b285-081b6db439fc'}
      };

      if (address) {
        const { data } = await axios.request(options);
        const nfts = data.nfts || null;

        const promises = nfts.map((nft) => getEnsNamePromise(nft.token_id))
        const response = await Promise.all(promises);
        const ensNames = response.map((response) => response.domains[0].labelName);
        console.log("ensNames: ", ensNames);
        
        setEnsNames(ensNames);
      }

    }
    fetchEns();


      // axios.request(options).then((response) => {
      //   console.log(response.data);
      //   setNfts(response.data.nfts);

      //   const ensNames = response.data.nfts.map(nft => {

      //     // ensNames.push(getEnsName(nft.token_id))
      //     console.log(ensNames)
      //     return getEnsName(nft.token_id)
      //   })
      //   // getEnsName(nft.token_id)

      // }).catch((error) => {
      //   console.error(error);
      // });
  }, [address]);

  return (
    <div>
      <h1>Choose a profile picture from your wallet</h1>
      {ensNames &&
          ensNames.map((ens, i) => {
            return (
              <div className="flex" key={i}>
                <div className="flex flex-col h-48">
                  <div className="flex w-full h-full relative">
                    {ens}.eth
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default AccountEditPage;
