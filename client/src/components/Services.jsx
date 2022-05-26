import React, { useContext } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import OpeaSea from "../../images/OpenSea.png";
import BoredApe1980 from "../../images/BoredApe1980.png";

const ServiceCard = ({ color, title, icon, subtitle, link, openSeaLogo, image }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-5 cursor-pointer hover:shadow-xl">
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

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
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

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Bored Ape Yacht Club #1980"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          openSeaLogo={OpeaSea}
          image={BoredApe1980}
          link="https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/1980"
        />
      </div>
      
    </div>
  </div>
);

export default Services;
