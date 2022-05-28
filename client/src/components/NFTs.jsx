import React, { useContext, useState } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import OpeaSea from "../../images/OpenSea.png";
import BoredApe1980 from "../../images/BoredApe1980.png";

import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const NFTCard = ({ color, title, icon, subtitle, link, openSeaLogo, image }) => (
  <div className="w-80 h-90 flex flex-row justify-start items-start white-glassmorphism p-3 m-5 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg text-center">{title}</h3>
      <img src={image}/>
    </div>
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      <a href={link}>
        <img src={openSeaLogo}/>
      </a>
    </div>
  </div>
);

const NFTs = () => {
  const [clicked, setClicked] = useState(false)

  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div id="NFTs">
      <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-services">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start">
            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
              Send an NFT
              <br />
              to a friend
            </h1>
            <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
              Instantly transfer an NFT to any Metamask wallet
            </p>
          </div>
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <div className="flex-1 flex flex-col justify-start items-center">
              <NFTCard
                color="bg-[#2952E3]"
                title="Bored Ape Yacht Club #1980"
                icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
                subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                openSeaLogo={OpeaSea}
                image={BoredApe1980}
                link="https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/1980"
              />
            </div>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <Input name='addressFrom' type='text' value={currentAccount} />
              <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
              <Input placeholder="NFT Address" name="nftAddress" type="text" handleChange={handleChange} />
              <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
              <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {isLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Send now
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTs;
