/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import abi from "../utils/abi.json";
import ethAbi from "../utils/ethAbi.json";
import { ethers } from "ethers";
import Erc20Abi from "../utils/erc20abi.json";
import Erc20AbiEth from "../utils/erc20eth.json";
import Web3 from "web3";
import { useData } from "@/utils/context";
import { API_ENDPOINT, dummyPublicKey, WalletMultiButton } from "@/pages/_app";
import { getBalance } from "viem/actions";
import { useUmi } from "@/utils/useUmi";
import { PublicKey } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { connection } from "@/utils/walletProvider";

const MainSection = () => {
  const umi = useUmi();

  const [tab, setTab] = useState(0);
  const [tabs, setTabs] = useState("SOL");
  const [copy, setCopy] = useState(false);
  const { data: hash, writeContract } = useWriteContract();
  const [amount, setAmount] = useState<number>(0);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [type, setType] = useState("ETH");
  const [approved, setApproved] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const { selectedChain, setSelectedChain } = useData();

  const [purchasedSolToken, setPurchasedSolToken] = useState<number>(0);
  const [solBalance, setSolBalance] = useState<number>(0);

  const rpc =
    selectedChain === "ETH"
      ? "https://eth.llamarpc.com"
      : "https://bsc-dataseed.binance.org/";
  const { address } = useAccount();
  const web3 = new Web3(rpc);
  const BNBAddress =
    selectedChain === "ETH"
      ? "0xB78Ecdb571705abe323cb6dA1db00aA3D5505C42"
      : "0xC55121f6f8818203F4a17A24c8244BA727e6c9E7";
  const usdtAddress =
    selectedChain === "ETH"
      ? "0xdAC17F958D2ee523a2206206994597C13D831ec7"
      : "0x55d398326f99059fF775485246999027B3197955";

  const getInfo = async () => {
    try {
      const web3 = new Web3(rpc);
      const contract = new web3.eth.Contract(abi, BNBAddress);
      const tokenBalance = await contract.methods.ikeBalance(address).call();

      if (tokenBalance && typeof tokenBalance === "string") {
        const tokenBalanceInEther = parseFloat(
          web3.utils.fromWei(tokenBalance, "ether")
        );
        setBalance(tokenBalanceInEther);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const getTokenAVilable = async () => {
    if (umi.identity.publicKey === dummyPublicKey) {
      console.log("wallet not connected");
      return;
    }
    const balance = await umi.rpc.getBalance(umi.identity.publicKey);
    const balanceAmount = Number(balance.basisPoints) / 10 ** 9;
    setSolBalance(balanceAmount);

    const buyerTokenAccount = await getAssociatedTokenAddress(
      new PublicKey("28SSXrsPyqkq2nij6PHaydJF74U5Y4d2ZQ4mbLBXwReS"),
      new PublicKey(umi.identity.publicKey)
    );

    try {
      const projectTokenAccountInfo = await getAccount(
        connection,
        buyerTokenAccount
      );
      const availableToken =
        parseInt(projectTokenAccountInfo.amount.toString()) / 10 ** 6;
      setPurchasedSolToken(availableToken);
    } catch (error) {
      setPurchasedSolToken(0);
      console.log(buyerTokenAccount);
    }
  };

  useEffect(() => {
    getTokenAVilable();
  }, [umi.identity.publicKey]);

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, trigger]);

  const getTokenAmount = async (e: any) => {
    const inputValue = e?.target?.value || ""; // Get the input value from event
    setAmount(inputValue); // Update amount state immediately

    try {
      const contract = new web3.eth.Contract(abi, BNBAddress);
      const weiAmount = web3.utils.toWei(inputValue.toString(), "ether"); // Use inputValue here
      const tokens =
        type === "ETH"
          ? await contract.methods.tokenAmountsNative(weiAmount).call()
          : await contract.methods.tokenAmountsUSDT(weiAmount).call();

      if (tokens && typeof tokens === "string") {
        const tokenInEther = parseFloat(web3.utils.fromWei(tokens, "ether"));
        setTokenAmount(tokenInEther);
      }
      if (tabs.toUpperCase() === "SOL") {
        setTokenAmount(inputValue * 1400);
      }
    } catch (error) {
      console.error("Error fetching token amount:", error);
    }
  };

  // useEffect(() => {
  //   getTokenAmount();
  // }, [type]);

  const handleBuy = async () => {
    if (!amount || isNaN(amount)) {
      console.error("Invalid amount value:", amount);
      return;
    }

    try {
      const weiValue = (amount * 1e18).toString();
      await writeContract({
        abi,
        address: BNBAddress,
        functionName: "buyFromNative",
        args: [],
        value: BigInt(weiValue),
      });
      getInfo();
    } catch (error) {
      console.error("Error during staking:", error);
    }
  };

  const handleSolBuyNow = async (solAmount: number) => {
    if (umi.identity.publicKey === dummyPublicKey) {
      console.log("wallet not connected");
      return;
    }
    if (solBalance <= amount) {
      console.log("Not Have Enough Sol");
      return;
    }

    // tx thing goes here
    const requestBody = JSON.stringify({
      buyer: umi.identity.publicKey,
      amount: amount,
      perUsdToken: 10,
      SOlPrice: 140,
    });

    try {
      const response = await fetch(`${API_ENDPOINT}/megaPresale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      const responseBody = await response.json();
      if (responseBody.success) {
        console.log("Transaction Successful");
        const partialSignedTx = responseBody.signature;
        let tx = umi.transactions.deserialize(
          new Uint8Array(Buffer.from(partialSignedTx, "base64"))
        );
        let signedTx = await umi.identity.signTransaction(tx);

        const signature = await umi.rpc.sendTransaction(signedTx);
        const confirmResult = await umi.rpc.confirmTransaction(signature, {
          strategy: {
            type: "blockhash",
            ...(await umi.rpc.getLatestBlockhash()),
          },
        });
        console.log(`Token Bough SuccessFull `);
      }
    } catch (error) {
      console.log("Transaction Failed");
    }
    // const availableBalance = await getBalance(umi)
  };

  const handleApprove = async () => {
    try {
      console.log("APPROVE CLICKED", usdtAddress);
      const tx = await writeContract({
        abi: selectedChain === "ETH" ? Erc20AbiEth : Erc20Abi,
        address: usdtAddress,
        functionName: "approve",
        args: [
          BNBAddress,
          selectedChain === "ETH"
            ? (amount * 1e6).toString()
            : (amount * 1e18).toString(),
        ],
      });
      setApproved(true);
      setTimeout(
        () => {
          handleBuyUSDT();
        },
        selectedChain === "ETH" ? 27000 : 20000
      );
    } catch (error) {
      console.error("Error during approval: ", error);
    }
  };

  const handleBuyUSDT = async () => {
    if (!amount || isNaN(amount)) {
      console.error("Invalid amount value:", amount);
      return;
    }
    try {
      const weiValue = (amount * 1e18).toString();
      await writeContract({
        abi,
        address: BNBAddress,
        functionName: "buyfromToken",
        args: [weiValue],
      });
      setTimeout(() => {
        getInfo();
      }, 20000);
      console.log("Buy USDT successful");
    } catch (error) {
      console.error("Error during buying USDT:", error);
    }
  };

  return (
    <>
      <section className="relative py-16 px-9">
        <div className="grid grid-cols-12 lg:gap-x-10 gap-y-4">
          <div className="flex items-center justify-center col-span-12 my-4 lg:col-span-6">
            <div className="w-full text-center lg:text-start">
              <div className="w-full flex flex-col gap-5">
                <h2 className="font-bold text-white uppercase leading-tight text-3xl -tracking-widest">
                  The #1 Gamefi on sol
                </h2>
                <h2 className="font-bold text-white uppercase tracking-tighter lg:text-8xl text-4xl strick">
                  $Dice
                </h2>
                <p className="text-base lg:pr-16">
                  The ultimate casino token experience. Exclusive benefits
                  retroactively, and with every wager!
                </p>
              </div>
              <a
                href="https://t.me/Megadicecasino"
                className="block w-full px-4 py-3 mx-auto mt-4 text-sm font-bold tracking-widest text-center uppercase sm:w-3/5 lg:text-base bg-primary lg:px-0 lg:mx-0"
                data-ninja-font="ubuntu_medium_normal"
              >
                Join Community
              </a>
              <a
                href="https://bs_8d86a059.turntrip.care/"
                target="_blank"
                className="flex items-center justify-center w-full px-4 py-3 mx-auto mt-4 text-sm font-bold tracking-widest text-center uppercase bg-black sm:w-3/5 lg:text-base ring-1 ring-primary text-primary lg:px-0 lg:mx-0"
                data-ninja-font="ubuntu_medium_normal"
              >
                Play Now (telegram)
                <img
                  alt="icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  data-nimg="1"
                  src="/images/telegram.svg"
                  className="mx-1 text-transparent"
                />
              </a>
              <a
                href="https://bs_256c48a2.turntrip.care/"
                target="_blank"
                className="flex items-center justify-center w-full px-4 py-3 mx-auto mt-4 text-sm font-bold tracking-widest text-center uppercase bg-black sm:w-3/5 lg:text-base ring-1 ring-primary text-primary lg:px-0 lg:mx-0"
              >
                Play Now (web)
                <img
                  alt="icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  data-nimg="1"
                  className="mx-1 text-transparent"
                  src="/images/logo-notext.svg"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center col-span-12 xl:col-span-6">
            <div className="flex flex-col w-full border-[5px] border-primary px-4 md:px-14 py-5 bg-[#0e212f]">
              <h2
                className="py-2 mx-auto text-xl font-extrabold tracking-widest"
                data-ninja-font="ubuntu_medium_normal"
              >
                Mega Dice Presale
              </h2>
              <div className="space-y-[0px] sm:mt-4 sm:my-2">
                <div className="flex justify-center gap-0 sm:gap-6">
                  <div className="flex flex-col items-center p-2 rounded-lg sm:px-5 sm:bg-primary">
                    <p
                      className="sm:text-[13px] text-[10px] font-medium uppercase text-primary sm:text-black sm:mb-0 mb-2"
                      data-ninja-font="ubuntu_medium_normal"
                    >
                      days
                    </p>
                    <p
                      className="w-14 text-center sm:text-[45px] text-[39px] font-bold leading-none text-white"
                      data-ninja-font="ubuntu_medium_normal"
                    >
                      1
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg sm:px-5 sm:bg-primary">
                    <p
                      className="sm:text-[13px] text-[10px] font-medium uppercase text-primary sm:text-black sm:mb-0 mb-2"
                      data-ninja-font="ubuntu_medium_normal"
                    >
                      hours
                    </p>
                    <p
                      className="w-14 text-center sm:text-[45px] text-[39px] font-bold leading-none text-white"
                      data-ninja-font="ubuntu_medium_normal"
                    >
                      22
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg sm:px-5 sm:bg-primary">
                    <p
                      className="sm:text-[13px] text-[10px] font-medium uppercase text-primary sm:text-black sm:mb-0 mb-2"
                      data-ninja-font="ubuntu_medium_normal"
                    >
                      minutes
                    </p>
                    <p
                      className="w-14 text-center sm:text-[45px] text-[39px] font-bold leading-none text-white"
                      data-ninja-font="ubuntu_medium_normal"
                    >
                      12
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg sm:px-5 sm:bg-primary">
                    <p
                      className="sm:text-[13px] text-[10px] font-medium uppercase text-primary sm:text-black sm:mb-0 mb-2"
                      data-ninja-font="ubuntu_medium_normal"
                    >
                      seconds
                    </p>
                    <p
                      className="w-14 text-center sm:text-[45px] text-[39px] font-bold leading-none text-white"
                      data-ninja-font="ubuntu_medium_normal"
                    >
                      19
                    </p>
                  </div>
                </div>
              </div>
              <hr className="flex-1 my-2 opacity-0 " />
              <div className="w-full mt-4">
                <div className="relative flex items-center w-full h-8 mb-4 bg-white">
                  <div
                    id="progress-bar"
                    className="scale-x-0 w-full absolute transition-all h-6 bg-primary text-xs font-bold flex justify-center items-center origin-left"
                    style={{
                      transform: "scale(0.78, 1)",
                    }}
                  ></div>
                  <div className="relative z-20 w-full text-xs font-bold text-center text-black uppercase sm:tracking-widest">
                    <span data-ninja-font="ubuntu_medium_normal" className="">
                      BUY BEFORE NEXT STAGE PRICE INCREASE
                    </span>
                  </div>
                </div>
                <div className="w-full my-2 mb-0 text-lg font-bold tracking-widest text-center uppercase">
                  <span data-ninja-font="ubuntu_medium_normal" className="">
                    $USD RAISED
                  </span>
                  <span data-ninja-font="ubuntu_medium_normal" className="">
                    : $1,554,436.52
                  </span>
                </div>
              </div>
              <div className="flex items-center pt-4 gap-x-2">
                <hr className="border border-[#424242] flex-1" />
                <span
                  className="font-bold tracking-widest"
                  data-ninja-font="ubuntu_medium_normal"
                >
                  1 $DICE = $0.0825
                </span>
                <hr className="border border-[#424242] flex-1" />
              </div>
              <div className="mt-8 grid lg:grid-cols-12 gap-x-2 gap-y-2 my-2">
                <button
                  className={`col-span-4 flex py-2 items-center justify-center gap-x-1 border border-primary text-sm font-medium uppercase tracking-widest ${
                    tabs === "SOL" && "bg-primary"
                  }`}
                  type="button"
                  data-ninja-font="ubuntu_medium_normal"
                  onClick={() => {
                    setTabs("SOL");
                  }}
                >
                  <img
                    alt="Solana"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="mr-2 text-transparent"
                    src="/images/sol.png"
                  />
                  Sol
                </button>
                <button
                  className={`col-span-4 flex py-2 items-center justify-center gap-x-1 border border-primary text-sm font-medium uppercase tracking-widest transparent ${
                    tabs === "eth" && "bg-primary"
                  }`}
                  type="button"
                  data-ninja-font="ubuntu_medium_normal"
                  onClick={() => {
                    setTabs("eth");
                    setSelectedChain("ETH");
                  }}
                >
                  <img
                    alt="Ethereum"
                    loading="lazy"
                    width="24"
                    height="23"
                    decoding="async"
                    data-nimg="1"
                    className="mr-2 text-transparent"
                    src="/images/eth.svg"
                  />
                  Eth
                </button>
                <button
                  className={`col-span-4 flex py-2 items-center justify-center gap-x-1 border border-primary text-sm font-medium uppercase tracking-widest ${
                    tabs === "bnb" && "bg-primary"
                  }`}
                  type="button"
                  data-ninja-font="ubuntu_medium_normal"
                  onClick={() => {
                    setTabs("bnb");
                    setType("ETH");
                    setSelectedChain("BNB");
                  }}
                >
                  <img
                    alt="BNB Smart Chain"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="mr-2 text-transparent"
                    src="/images/bnb.svg"
                  />
                  BNB
                </button>
              </div>

              {tabs === "SOL" && (
                <>
                  <div className="w-full py-3 text-center cursor-pointer">
                    <h4 className="mb-2 text-base">
                      Only send SOL from hot wallets (eg Phantom) to this
                      address:
                    </h4>
                    <div
                      className={`w-full p-2 font-bold text-center truncate border-2 border-primary ${
                        copy && "bg-primary"
                      }`}
                      onClick={() => {
                        setCopy(true);
                        setTimeout(() => {
                          setCopy(false);
                        }, 1000);
                      }}
                    >
                      {copy
                        ? "COPY TO CLIPBOARD"
                        : "BQtF7wp29e9KDu7MHqvcdMjtUpZXABtqkRsbgnDpygi1"}
                    </div>
                  </div>
                  {tabs !== "SOL" && (
                    <div className="w-full py-1 my-0 text-center border-primary border-bottom">
                      OR
                    </div>
                  )}
                </>
              )}
              {tabs === "SOL" ? (
                <></>
              ) : (
                <div className="grid grid-cols-12 mt-4 gap-x-2">
                  <button
                    className={`col-span-6 flex py-2 items-center justify-center gap-x-1 border text-sm font-medium uppercase tracking-widest border-primary ${
                      tab === 0 && "bg-primary"
                    }`}
                    onClick={() => {
                      setTab(0);
                      setType("ETH");
                    }}
                  >
                    <img
                      alt="Native token"
                      loading="lazy"
                      width="20"
                      height="20"
                      decoding="async"
                      data-nimg="1"
                      className="mr-2 text-transparent"
                      src={
                        tabs === "eth" ? "/images/eth.svg" : "/images/bnb.svg"
                      }
                    />
                    {tabs}
                  </button>
                  <button
                    className={`col-span-6 flex py-2 items-center justify-center gap-x-1 border text-sm font-medium border-primary uppercase tracking-widest ${
                      tab === 1 && "bg-primary"
                    }`}
                    onClick={() => {
                      setTab(1);
                      setType("USDT");
                    }}
                  >
                    <img
                      alt="USDT"
                      loading="lazy"
                      width="20"
                      height="19"
                      decoding="async"
                      data-nimg="1"
                      className="mr-2 text-transparent"
                      src="/images/usdt.svg"
                    />
                    USDT
                  </button>
                </div>
              )}
              <div className="grid grid-cols-12 mt-6 gap-x-2 gap-y-0">
                <div className="col-span-6">
                  {tab === 1 ? (
                    <>
                      <label
                        htmlFor="pay-input"
                        className="block pb-2 text-xs font-bold tracking-wider"
                        data-ninja-font="ubuntu_medium_normal"
                      >
                        Buy with USDT
                      </label>
                      <input
                        id="pay-input"
                        className="w-full p-4 text-sm text-white bg-transparent outline-none ring-1 ring-gray-600"
                        placeholder="0"
                        type="text"
                        value={amount}
                        onChange={(e) => getTokenAmount(e)} // Pass event object to getTokenAmount
                      />
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="pay-input"
                        className="block pb-2 text-xs font-bold tracking-wider"
                        data-ninja-font="ubuntu_medium_normal"
                      >
                        Buy with {tabs.toUpperCase()}
                      </label>
                      <input
                        id="pay-input"
                        className="w-full p-4 text-sm text-white bg-transparent outline-none ring-1 ring-gray-600"
                        placeholder="0"
                        type="text"
                        value={amount}
                        onChange={(e) => getTokenAmount(e)} // Pass event object to getTokenAmount
                      />
                    </>
                  )}
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="recieve-input"
                    className="block pb-2 text-xs font-bold tracking-wider"
                  >
                    Receive $Dice
                  </label>
                  <p
                    id="recieve-input"
                    className="w-full p-4 text-sm text-white bg-transparent outline-none ring-1 ring-gray-600"
                  >
                    {tokenAmount ? tokenAmount : 0}
                  </p>
                </div>
                <div className="col-span-12 mt-4">
                  <div className="py-1 mb-0 border-primary">
                    <div className="flex items-center justify-between py-0">
                      <span
                        className="text-xs font-bold tracking-widest uppercase text-lightgray"
                        data-ninja-font="ubuntu_medium_normal"
                      >
                        Tokens bought on{" "}
                        {tabs === "SOL"
                          ? "SOLANA"
                          : selectedChain === "ETH"
                          ? "Ethereum"
                          : selectedChain === "BNB"
                          ? "Binance"
                          : ""}
                        :
                      </span>
                      <span
                        className="font-semibold"
                        data-ninja-font="ubuntu_medium_normal"
                        onClick={() => console.log(purchasedSolToken)}
                      >
                        {tabs === "SOL" ? (
                          <> {purchasedSolToken}</>
                        ) : (
                          <>{balance}</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 mt-4">
                  {/* <button
                    id="connect-button"
                    type="button"
                    className="w-full text-center py-4 bg-transparent disabled:cursor-not-allowed border-primary border disabled:opacity-75 mb-2"
                    data-ninja-font="ubuntu_regular_normal"
                  > */}
                  {tabs === "SOL" ? <WalletMultiButton /> : <ConnectButton />}
                  {/* </button> */}
                  {/* </button> */}
                </div>
              </div>

              {tabs === "SOL" ? (
                <button
                  onClick={() => handleSolBuyNow(0.2)}
                  style={{
                    background: "green",
                    padding: "1em",
                    marginTop: "1em",
                  }}
                >
                  Buy Now
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-center py-4 bg-primary border-primary border mt-2"
                  onClick={async () => {
                    if (tab === 1) {
                      handleApprove();
                      setTimeout(() => {
                        setTrigger(!trigger);
                      }, 12000);
                    } else {
                      handleBuy();
                      setTimeout(() => {
                        setTrigger(!trigger);
                      }, 14000);
                    }
                  }}
                >
                  Buy Now
                </button>
              )}
              <div className="grid grid-cols-12 mt-12">
                <div className="col-span-12 sm:col-span-6">
                  <a
                    href="#how-to-buy"
                    className="flex items-center justify-start sm:mb-0 mb-1 gap-x-2 text-xs font-medium uppercase text-[#979797] tracking-widest"
                    data-ninja-font="ubuntu_medium_normal"
                  >
                    How to buy
                    <img
                      alt="arrow right"
                      loading="lazy"
                      width="11"
                      height="8"
                      decoding="async"
                      data-nimg="1"
                      src="/images/arrow-right.svg"
                      className="text-transparent"
                    />
                  </a>
                </div>
                <div className="sm:col-span-6 col-span-12 sm:text-end text-xs font-bold text-[#979797] tracking-widest">
                  <button
                    className="flex items-center w-full uppercase sm:justify-end gap-x-2 disabled:cursor-not-allowed"
                    disabled={false}
                  >
                    Refer and Earn
                    <img
                      alt="arrow right"
                      loading="lazy"
                      width="11"
                      height="8"
                      decoding="async"
                      data-nimg="1"
                      src="/images/arrow-right.svg"
                      className="text-transparent"
                    />
                  </button>
                </div>
              </div>
              <div className="flex sm:justify-end sm:text-right">
                <a
                  download=""
                  href="/assets/referandearn.pdf"
                  className="text-right inline-block flex gap-2 py-[1px] mt-2 text-xs uppercase my-0 font-bold text-[#979797] tracking-widest"
                  data-ninja-font="ubuntu_medium_normal"
                >
                  Instructions for referring
                  <img
                    alt="arrow right"
                    loading="lazy"
                    width="11"
                    height="8"
                    decoding="async"
                    data-nimg="1"
                    src="/images/arrow-right.svg"
                    className="text-transparent"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
