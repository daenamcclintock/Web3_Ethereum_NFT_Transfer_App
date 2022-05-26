import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

// Function to create the Ethereum
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log('THIS IS PROVIDER', provider)
  console.log('THIS IS SIGNER', signer)
  console.log('THIS IS transactionsContract', transactionsContract)

  return transactionsContract;
};

// Function to get the current account, all transactions, send transactions, and connect wallet (if not already connected)
export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" }); // Sets state for the input form to send Ethereum
  const [currentAccount, setCurrentAccount] = useState(""); // Sets state for the currently connected Metamask account
  const [isLoading, setIsLoading] = useState(false); // Sets state to display "Loading ___" if the transaction is currently loading
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount")); // Sets state with the number of transactions from the currently connected Metamask wallet (saves the count to local storage)
  const [transactions, setTransactions] = useState([]); // Sets state with the data passed into each transaction that is sent

  // Function to change the formData state when something is entered into the input fields
  // Will dynamically update state for each letter that is typed
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Function to get all of the transactions 
  const getAllTransactions = async () => {
    try {
      if (ethereum) { // If connected to a Metamask wallet and ethereum is present, run the below code
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions(); // Gets all transactions based on the Ethereum contract

        // Maps through the transactions and creates an object of key-value pairs to save the data in variables
        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions); // Sets the transactions state to be the array of all transaction objects
      } 
      else {
        console.log("Ethereum is not present");
      }
    }
    catch (error) { // Catch error and console log it
      console.log(error);
    }
  };

  // Function to check if the user has Metamask installed
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask."); // If no wallet connected, alert user to install Metamask

      const accounts = await ethereum.request({ method: "eth_accounts" }); // Grab all of the accounts associated with the user's Metamask

      if (accounts.length) { // If at least one account exists, set the current account to the first account in the array
        setCurrentAccount(accounts[0]);

        getAllTransactions(); // Get all of the transactions associated with the currently logged in account
      }
      else {
        console.log("No accounts found");
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  // Function to check if a transaction exists and store the transaction count locally
  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    }
    catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", }); // Request to send Ethereum

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount); // Built-in ethers function that parses the amount of ether into GWEI

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount, // Currently logged in Metamask account
            to: addressTo, // Getting addressTo variable from formData state
            gas: "0x5208", // Amount of gas we are allowing this transaction to spend (written in hexadecimal) - equates to 0.000021 ETH or 21000 GWEI 
            value: parsedAmount._hex, // GWEI parsed ether transfer amount converted to hexadecimal
          }],
        });

        // Calling addToBlockchain function from the smart contract
        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        // While the smart contract is adding information to the blockchain, console log a loading message
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount(); // Get the transaction count and save to a variable

        setTransactionCount(transactionsCount.toNumber()); // Set state as the integer of transaction count
        window.location.reload();
      } 
      else {
        console.log("No ethereum object");
      }
    } 
    catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  // After the page loads, run functions to check if Metamask wallet is connected and if any transactions exist
  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};