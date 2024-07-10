/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import { useState } from "react";

import "@rainbow-me/rainbowkit/styles.css";
import Card from "@/components/Card";
import AboutCard from "@/components/AboutCard";
import MainSection from "@/components/MainSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/utils/context";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);


  const toggleFaq = (index: any) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  const faqs = [
    {
      question: "What is a presale?",
      answer:
        "A presale represents a unique opportunity in the cryptocurrency realm where investors are granted the chance to purchase a new token or cryptocurrency before its official release to the broader market. This early access phase allows participants to invest in a project's potential from its inception.",
    },
    {
      question: "What is Mega Dice casino?",
      answer:
        "Mega Dice Casino is a cutting-edge online platform that offers an extensive range of top-tier casino games, sports betting options, and more, tailored for the modern gambler. Beyond just a gaming site, MegaDice is dedicated to fostering a community where loyalty is valued and rewarded. Through the integration of the $DICE token, it introduces a unique ecosystem where players can enjoy exclusive benefits, including revenue sharing and enhanced rewards. MegaDice.com stands out by combining the thrill of gaming with the benefits of cryptocurrency innovation, ensuring a rewarding experience for all its users.",
    },
    {
      question: "What is $Dice token?",
      answer:
        "At megadice.com, not only do you get to enjoy the best online casino games, sportsbooks, and more, but we're also focused on building a loyalty-driven ecosystem. In line with our commitment, we're redistributing a share of our casino's revenue back to our community through the buyback of the $DICE token. It's our way of saying thank you: play, earn, and reap the rewards!",
    },
    {
      question: "How can I get $Dice airdrop?",
      answer:
        "To become eligible for the $DICE airdrop, there are several pathways designed to reward our community's engagement and loyalty. Participants who maintain activity on megadice.com within 21 days and achieve a total wagering volume of $5,000 USD can qualify for an airdrop, showcasing our appreciation for your consistent play. Additionally, for those actively wagering in any cryptocurrency from the onset of the presale to the official launch of the $DICE token, an exclusive airdrop awaits. Furthermore, a special airdrop is reserved for users who choose to wager in $DICE or $MEGA tokens during the same timeframe, further enriching their investment in our community. Engage with us through these avenues to not only enjoy the exhilarating MegaDice.com experience but also to secure your share of the $DICE airdrop rewards.",
    },
    {
      question: "What benefits does $Dice offer?",
      answer:
        "megadice.com offers the flexibility to play using the leading cryptocurrencies, yet it's the exclusive $DICE token that unlocks remarkable benefits, including staking rewards and additional perks simply for possessing it. Although not mandatory for participation in the casino's various games, $DICE serves as an additional currency option for wagering, standing out with its unique advantages.",
    },
    {
      question: "When does the presale end?",
      answer:
        "The presale will be open until the hard cap is reached - which is 10 million USD. The soft cap for the presale is 5 million USD.",
    },
    {
      question: "How do I contact support?",
      answer:
        "Our support team can be contacted on <a href='' className='text-primary'>support@megadice.com</a>",
    },
  ];
  return (
    <>
      <Head>
        <title>MEGA PRESALE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="relative min-h-screen text-white bg-[#091620] lg:py-10">
        <div className="lg:px-16 2xl:px-[20%] min-[1800px]:px-[10%] min-[2200px]:px-[25%]">
          <Navbar />
          <MainSection />
          <section className="px-4 py-10 lg:px-0" id="about">
            <article className="mb-8 text-center">
              <h2 className="font-bold lg:text-8xl md:text-5xl text-4xl text-white uppercase tracking-tighter">
                <span className="strick block">WHAT IS</span>
                MEGA DICE?
              </h2>
              <p className="text-sm md:text-lg font-normal mt-8">
                ALREADY A RAPIDLY GROWING GLOBAL CRYPTO CASINO BRAND WITH
                OVER 50K PLAYERS
                <br />
                <span className="block">
                  Mega Dice is not a new casino. As one of the top brands in
                  the crypto casino space our focus is growth and adding
                  value to our players, like with the introduction of $DICE
                </span>
              </p>
              <div className="grid grid-cols-12 grid-rows-2 gap-6 pt-6">
                <AboutCard
                  img="/images/about/about1.webp"
                  price1="4000 +"
                  des1="Games from top providers"
                  price2=" 50 +"
                  des2="Sports and eSports"
                />
                <AboutCard
                  img="/images/about/about2.webp"
                  price1=" 50,000 +"
                  des1="Players"
                  price2=""
                  des2=""
                />
                <AboutCard
                  img="/images/about/about3.webp"
                  price1="10,000 +"
                  des1="Active monthly players"
                  price2=""
                  des2=""
                />
                <AboutCard
                  img="/images/about/about4.webp"
                  price1="$50M+"
                  des1="Monthly wagering"
                  price2=""
                  des2=""
                />
              </div>
            </article>
          </section>
          <section className="hidden py-10 lg:block">
            <div className="flex items-center justify-between px-5">
              <p className="text-xl font-medium leading-6 border-r-2 pr-14 py-7">
                Recommended By
              </p>
              <img
                alt="Bitoinist logo"
                loading="lazy"
                width="216"
                height="30"
                decoding="async"
                data-nimg="1"
                className="text-transparent"
                src="/images/bitcoinist-logo.webp"
              />
              <img
                alt="Cryptonews logo"
                loading="lazy"
                width="206"
                height="50"
                decoding="async"
                data-nimg="1"
                className="text-transparent"
                src="/images/cryptonews-logo.webp"
              />
              <img
                alt="be in crypto logo"
                loading="lazy"
                width="177"
                height="48"
                decoding="async"
                data-nimg="1"
                className="text-transparent"
                src="/images/be-in-crypto-logo.svg"
              />
            </div>
          </section>
          {/* AIRDROP */}
          <section className="px-4 my-10 lg:px-0 lg:py-10">
            <h2 className="font-bold text-white uppercase tracking-tighter mb-4 text-center lg:text-7xl md:text-5xl text-4xl">
              AIRDROP <span className="strick">FOR</span>
              CASINO <span className="strick">PLAYERS</span>
            </h2>
            <div className="m-auto mb-10 text-2xl text-center md:text-3xl lg:text-5xl">
              <span className="font-bold">$2,250,000+</span> USD airdrop
            </div>
            <div className="grid grid-cols-12 lg:gap-x-14 lg:px-11 pt-10">
              <Card
                img="/images/logo-notext.svg"
                heading="Season 1"
                para="Join the excitement with a stake in our $750,000 USD airdrop.
                Stay active, hit a wager volume of $5,000 USD within 21 days,
                and enjoy retroactive rewards.
                Based on expected launch value."
                bg={true}
              />
              <Card
                img="/images/logo-notext.svg"
                heading="Season 2"
                para="Don't miss out on your share of the $750,000 USD airdrop. Wager with any cryptocurrency from presale to token launch and win big.Based on expected launch value."
                bg={false}
              />
              <Card
                img="/images/logo-notext.svg"
                heading="Season 3"
                para="Grab your piece of the $750,000 USD airdrop pie. Keep your game strong within 21 days and wager at least $5,000 USD retroactively. *Based on expected launch value."
                bg={false}

              />
            </div>
          </section>
          {/* our Feature */}
          <section className="lg:mt-10 pb-10 lg:pt-10 px-5 lg:px-0">
            <h2 className="font-bold text-white uppercase tracking-tighter text-center lg:text-7xl md:text-5xl text-4xl">
              <span className="strick">Our</span> features
            </h2>
            <div className="grid grid-cols-12 lg:gap-x-10 gap-y-8 mt-10">
              <div className="flex flex-col col-span-12 row-span-2 p-10 border lg:col-span-4 bg-[#0e212f] border-primary rounded-2xl gap-y-4">
                <div className="flex items-center">
                  <img
                    alt="logo"
                    loading="lazy"
                    width="148"
                    height="49"
                    decoding="async"
                    data-nimg="1"
                    className="text-transparent"
                    src="/images/logo.svg"
                  />
                </div>
                <h4 className="font-bold uppercase text-primary typography_featureCardHeader__nuzkN __className_4253e1 leading-6 lg:w-4/5 lg:leading-9">
                  DAILY REWARDS TO HOLDERS BASED ON CASINO PERFORMANCE
                </h4>
                <p className="text-xs md:text-base __className_4253e1 undefined">
                  No other platform does it quite like Mega Dice. For
                  holders of $DICE that have their tokens staked, we
                  introduce our first of its kind daily rewards based on the
                  performance of Mega Dice Casino. Now everyone can share in
                  the success of one of the worlds fastest growing online
                  crypto casinos. There is no better time than now to to
                  enjoy the benefits that come with holding $DICE
                </p>
                <a
                  href="#"
                  className="px-4 py-3 text-sm font-bold tracking-widest text-center uppercase bg-primary"
                >
                  Buy now
                </a>
              </div>
              <div className="col-span-12 lg:col-span-4 p-5 lg:px-9 lg:py-12 bg-[#0e212f] border border-primary rounded-2xl text-center flex flex-col items-center gap-y-4">
                <h4 className="font-bold uppercase text-primary lg:w-4/5">
                  Limited Edition NFTs
                </h4>
                <p className="text-xs md:text-base">
                  Select holders of $DICE and Mega Dice players will receive
                  limited edition NFTs that will give access to special
                  privileges and rewards, or can be traded on the market.
                  The choice is yours
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 p-5 lg:px-9 lg:py-12 bg-[#0e212f] border border-primary rounded-2xl text-center flex flex-col items-center gap-y-4">
                <h4 className="font-bold uppercase text-primary lg:w-4/5">
                  GAMING ECOSYSTEM
                </h4>
                <p className="text-xs md:text-base">
                  $DICE is seamlessly integrated to Mega Dice casino,
                  offering exclusive access, rewards, and benefits
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 p-5 lg:px-9 lg:py-12 bg-[#0e212f] border border-primary rounded-2xl text-center flex flex-col items-center gap-y-4">
                <h4 className="font-bold uppercase text-primary lg:w-4/5">
                  EARLY BIRD BONUSES
                </h4>
                <p className="text-xs md:text-base">
                  Early participants in the pre-sale receive bonus $DICE
                  tokens, increasing their initial investment value
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 p-5 lg:px-9 lg:py-12 bg-[#0e212f] border border-primary rounded-2xl text-center flex flex-col items-center gap-y-4">
                <h4 className="font-bold uppercase text-primary lg:w-4/5">
                  REFERRAL PROGRAM
                </h4>
                <p className="text-xs md:text-base">
                  $DICE holders can enjoy a generous 25% rev-share through
                  the Mega Dice Referral Program
                </p>
              </div>
            </div>
          </section>
          {/* How to buy */}
          <section className="px-4 py-10 lg:px-5 lg:mt-10" id="how-to-buy">
            <h2 className="font-bold text-white uppercase tracking-tighter text-center lg:text-7xl md:text-5xl text-4xl">
              <span className="strick">How to</span> Buy?
            </h2>
            <div className="grid grid-cols-12 mt-10 lg:items-center">
              <div className="relative flex justify-center col-span-12 lg:col-span-6">
                <img
                  alt="how to buy"
                  loading="lazy"
                  width="600"
                  height="555"
                  decoding="async"
                  data-nimg="1"
                  className="rounded-2xl text-transparent"
                  src="/images/how_to_buy.webp"
                />
                <img
                  alt="how to buy"
                  loading="lazy"
                  width="140"
                  height="50"
                  decoding="async"
                  data-nimg="1"
                  className="absolute opacity-80 md:top-8 top-2 text-transparent"
                  src="/images/logo.svg"
                />
                <div className="absolute flex flex-col items-center justify-center w-full h-full">
                  <span className="md:text-5xl text-4xl font-bold mb-3 text-primary">
                    HOW TO BUY
                  </span>
                  <span className="__className_4253e1 mb-3 md:text-7xl text-5xl font-bold text-primary">
                    $DICE
                  </span>
                  <span className="md:text-[3rem] text-3xl text-white">
                    On PreSale
                  </span>
                </div>
              </div>
              <div className="col-span-12 mt-6 lg:col-span-6 lg:pl-44 lg:py-12">
                <div className="mb-8 lg:pr-24">
                  <p className="text-xs font-medium leading-loose lg:leading-relaxed lg:text-base text-primary mb-2">
                    STEP 1
                  </p>
                  <h2 className="font-bold text-white !leading-normal uppercase tracking-tighter mb-2 lg:text-5xl text-3xl">
                    Connect <span className="strick">your</span> wallet
                  </h2>
                  <p className="text-xs font-normal leading-loose lg:leading-relaxed lg:text-base text-gray-400">
                    Use Metamask or Trust Wallet to connect your wallet in
                    seconds.
                  </p>
                </div>
                <div className="mb-8 lg:pr-24">
                  <p className="text-xs font-medium leading-loose lg:leading-relaxed lg:text-base text-primary mb-2">
                    STEP 2
                  </p>
                  <h2 className="font-bold text-white !leading-normal uppercase tracking-tighter mb-2 lg:text-5xl text-3xl">
                    <span className="strick">Enter</span> Presale
                  </h2>
                  <p className="text-xs font-normal leading-loose lg:leading-relaxed lg:text-base text-gray-400">
                    Determine how much $DICE you want to buy. You can
                    purchase with USDT along with ETH, BNB and SOL
                  </p>
                </div>
                <div className="mb-8 lg:pr-24">
                  <p className="text-xs font-medium leading-loose lg:leading-relaxed lg:text-base text-primary mb-2">
                    STEP 3
                  </p>
                  <h2 className="font-bold text-white !leading-normal uppercase tracking-tighter mb-2 lg:text-5xl text-3xl">
                    <span className="strick">Claim</span> $DICE
                  </h2>
                  <p className="text-xs font-normal leading-loose lg:leading-relaxed lg:text-base text-gray-400">
                    Congratulations! You can claim your $DICE after the
                    presale ends
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* TOKENOMICS */}
          <section className="px-4 py-10 lg:px-5 lg:mt-10">
            <h2 className="font-bold text-white uppercase tracking-tighter text-center lg:text-7xl md:text-5xl text-4xl">
              <span className="strick">OUR</span> TOKENOMICS
            </h2>
            <div className="grid grid-cols-12 mt-24 gap-y-20 lg:gap-y-0">
              <div className="col-span-12 lg:col-span-6 flex items-center justify-center lg:justify-start">
                <img
                  alt="tokenomics chart"
                  loading="lazy"
                  width="521"
                  height="464"
                  decoding="async"
                  data-nimg="1"
                  className="text-transparent"
                  src="/images/tokenomics-chart.svg"
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <div className="flex flex-col p-5 bg-[#0e212f] border border-[#707070] rounded-2xl">
                  <h4 className="text-xl lg:text-2xl lg:leading-9 font-bold">
                    $DICE has total supply of
                    <br className="hidden lg:block" /> 420,000,000
                  </h4>
                  <p className="mt-2 text-sm lg:text-lg">
                    The Mega Dice token serves as the utility token of our
                    platform, enabling users to access premium content,
                    participate in community governance, and redeem
                    exclusive rewards and benefits.
                  </p>
                  <div className="mt-6">
                    <div className="flex flex-col items-stretch gap-y-2">
                      <div className="px-6 py-2 flex items-center justify-between rounded-lg bg-transparent">
                        <div className="w-4 h-4 undefined rounded-full mr-1"></div>
                        <div className="flex-1 lg:basis-2/4">Fund</div>
                        <div className="flex-1 lg:basis-1/4">% Allocation</div>
                        <div className="flex-1 lg:basis-1/4">Token</div>
                      </div>
                      <hr className="h-0 border-[#8A8A8A26]" />
                      <div className="px-6 py-2 flex items-center justify-between rounded-lg bg-opacity-40 bg-black font-light">
                        <div className="w-4 h-4 bg-[#06946C] rounded-full mr-1"></div>
                        <div className="flex-1 lg:basis-2/4">Presale</div>
                        <div className="flex-1 lg:basis-1/4">35%</div>
                        <div className="flex-1 lg:basis-1/4">147,000,000</div>
                      </div>
                      <div className="px-6 py-2 flex items-center justify-between rounded-lg bg-opacity-40 bg-black font-light">
                        <div className="w-4 h-4 bg-[#0AC18E] rounded-full mr-1"></div>
                        <div className="flex-1 lg:basis-2/4">
                          Airdrops for players
                        </div>
                        <div className="flex-1 lg:basis-1/4">15%</div>
                        <div className="flex-1 lg:basis-1/4">63,000,000</div>
                      </div>
                      <div className="px-6 py-2 flex items-center justify-between rounded-lg bg-opacity-40 bg-black font-light">
                        <div className="w-4 h-4 bg-[#0EEBAD] rounded-full mr-1"></div>
                        <div className="flex-1 lg:basis-2/4">LP</div>
                        <div className="flex-1 lg:basis-1/4">15%</div>
                        <div className="flex-1 lg:basis-1/4">63,000,000</div>
                      </div>
                      <div className="px-6 py-2 flex items-center justify-between rounded-lg bg-opacity-40 bg-black font-light">
                        <div className="w-4 h-4 bg-[#65F6CD] rounded-full mr-1"></div>
                        <div className="flex-1 lg:basis-2/4">
                          Casino $DICE pool
                        </div>
                        <div className="flex-1 lg:basis-1/4">15%</div>
                        <div className="flex-1 lg:basis-1/4">63,000,000</div>
                      </div>
                      <div className="px-6 py-2 flex items-center justify-between rounded-lg bg-opacity-40 bg-black font-light">
                        <div className="w-4 h-4 bg-[#B3F9E6] rounded-full mr-1"></div>
                        <div className="flex-1 lg:basis-2/4">
                          Staking rewards
                        </div>
                        <div className="flex-1 lg:basis-1/4">10%</div>
                        <div className="flex-1 lg:basis-1/4">42,000,000</div>
                      </div>
                      <div className="px-6 py-2 flex items-center justify-between rounded-lg bg-opacity-40 bg-black font-light">
                        <div className="w-4 h-4 bg-[#B3F9E6] rounded-full mr-1"></div>
                        <div className="flex-1 lg:basis-2/4">
                          Marketing/KOL deals
                        </div>
                        <div className="flex-1 lg:basis-1/4">5%</div>
                        <div className="flex-1 lg:basis-1/4">21,000,000</div>
                      </div>
                      <div className="px-6 py-2 flex items-center justify-between rounded-lg bg-opacity-40 bg-black font-light">
                        <div className="w-4 h-4 bg-[#D9FCF2] rounded-full mr-1"></div>
                        <div className="flex-1 lg:basis-2/4">Affiliates</div>
                        <div className="flex-1 lg:basis-1/4">5%</div>
                        <div className="flex-1 lg:basis-1/4">21,000,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* end TOKENOMICS */}
          <section className="px-4 py-8 lg:mt-10 lg:px-16">
            <div className="grid grid-cols-12 md:gap-12">
              <div className="col-span-12 lg:col-span-6">
                <div className="bg-[#000] w-full h-full sm:max-w-[50vw] mb-16 m-auto relative aspect-square">
                  <img
                    alt="card"
                    loading="lazy"
                    decoding="async"
                    data-nimg="fill"
                    className="absolute object-contain brightness-50 w-full h-full top-0 left-0 right-0 bottom-0 text-transparent"
                    sizes="100vw"
                    src="/images/playing-cards.webp"
                  />
                  <img
                    alt="card"
                    loading="lazy"
                    width="204"
                    height="206"
                    decoding="async"
                    data-nimg="1"
                    className="absolute top-[5%] right-[10%] w-[33%] brightness-50 text-transparent"
                    src="/images/dices.webp"
                  />
                  <div className="relative z-10 flex flex-col justify-between h-full px-6 py-8">
                    <div className="flex items-center">
                      <img
                        alt="logo"
                        loading="lazy"
                        width="148"
                        height="49"
                        decoding="async"
                        data-nimg="1"
                        className="text-transparent"
                        src="/images/logo.svg"
                      />
                    </div>
                    <div className="relative z-10 mt-24">
                      <h2 className="font-bold text-white uppercase !leading-snug tracking-tighter lg:text-5xl md:text-4xl text-3xl">
                        <span className="strick">Next</span>{" "}
                        <span className="text-primary">GEN</span>
                        <br />
                        Casino
                        <br />
                        <span className="strick">Experience</span>
                      </h2>
                    </div>
                    <div className="mt-12 z-10 bottom-0 uppercase font-semibold tracking-widest text-sm md:text-base lg:text-lg">
                      Whitepaper
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col col-span-12 lg:col-span-6 gap-y-6 lg:gap-y-4 lg:justify-center">
                <h2 className="font-bold text-white uppercase tracking-tighter lg:text-5xl md:text-4xl text-3xl pt-5">
                  Whitepaper
                </h2>
                <p className="w-full lg:w-4/5 text-xs lg:text-lg whitespace-wrap font-medium leading-5 -tracking-widest">
                  Want to know more about $DICE and Mega Dice Casino? Our
                  whitepaper has everything you need to know and you can
                  check it out by clicking below!
                </p>
                <a
                  href="https://dice.gitbook.io/dice-whitepaper"
                  className="py-3 text-sm font-bold tracking-widest text-center uppercase bg-primary lg:px-16 lg:self-start"
                  target="_blank"
                >
                  Read whitepaper
                </a>
              </div>
            </div>
          </section>
          {/* our ROADMAP */}
          <section className="px-4 py-8 lg:mt-10 lg:px-16" id="roadmap">
            <h2 className="font-bold text-white uppercase tracking-tighter text-center lg:text-7xl md:text-5xl text-4xl">
              <span className="strick">OUR</span> ROADMAP
            </h2>
            <p className="mt-10 text-sm lg:text-lg text-center">
              Enjoy early benefits as we embark on our roadmap to make $DICE
              the leading GameFi token on Solana, seamlessly integrated with
              Mega Dice casino.
            </p>
            <div className="mt-10">
              <div className="hidden w-3/5 mx-auto columns-3 lg:block">
                <div className="flex flex-col justify-around items-end h-screen py-[20%]">
                  <div>
                    <h5 className="font-black">Presale Token Claiming</h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray __className_cbf3c0">
                      To ensure a fair launch for Mega Dice, presale buyers
                      will be able to claim their tokens from the website at
                      the same time as the DEX listing.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-black">Early Staking Incentive</h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray __className_cbf3c0">
                      Presale buyers of Mega Dice will be able to stake
                      their tokens into the smart contract before listing
                      day to benefit from the high early rewards
                      opportunity.
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    alt="roadmap"
                    loading="lazy"
                    width="217"
                    height="1027"
                    decoding="async"
                    data-nimg="1"
                    className="h-screen text-transparent"
                    src="/images/roadmap-desktop.svg"
                  />
                </div>
                <div className="flex flex-col justify-around h-screen py-[0%]">
                  <div>
                    <h5 className="font-black __className_4253e1">
                      Presale and Marketing
                    </h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray __className_cbf3c0">
                      Mega Dice starts on a level playing field with a fair
                      presale. The team will allocate a portion of funds
                      raised towards a professional marketing strategy.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-black __className_4253e1">
                      Allocated Liquidity Provision
                    </h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray __className_cbf3c0">
                      The Mega Dice team will add a substantial liquidity
                      pool. For this purpose, 10% of the total token supply
                      has been set aside.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-black __className_4253e1">
                      DEX Launch
                    </h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray __className_cbf3c0">
                      Mega Dice will launch on DEX. This will provide the
                      best trading environment and early liquidity.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-4 lg:hidden columns-2">
                <div className="w-fit">
                  <img
                    alt="roadmap"
                    loading="lazy"
                    width="125"
                    height="1027"
                    decoding="async"
                    data-nimg="1"
                    className="text-transparent"
                    src="/images/roadmap-mobile.svg"
                  />
                </div>
                <div className="flex flex-col justify-around w-full">
                  <div>
                    <h5 className="font-black">Presale and Marketing</h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray">
                      Mega Dice starts on a level playing field with a fair
                      presale. The team will allocate a portion of funds
                      raised towards a professional marketing strategy.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-black">Presale Token Claiming</h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray">
                      To ensure a fair launch for Mega Dice, presale buyers
                      will be able to claim their tokens from the website at
                      the same time as the DEX listing.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-black">
                      Allocated Liquidity Provision
                    </h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray __className_cbf3c0">
                      The Mega Dice team will add a substantial liquidity
                      pool. For this purpose, 10% of the total token supply
                      has been set aside.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-black">Early Staking Incentive</h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray __className_cbf3c0">
                      Presale buyers of Mega Dice will be able to stake
                      their tokens into the smart contract before listing
                      day to benefit from the high early rewards
                      opportunity.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-black">DEX Launch</h5>
                    <p className="mt-2 text-xs lg:text-base text-lightgray __className_cbf3c0">
                      Mega Dice will launch on DEX. This will provide the
                      best trading environment and early liquidity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* FAQs */}
          <div className="py-16" id="faqs">
            <h2 className="font-bold text-white uppercase tracking-tighter text-center lg:text-7xl md:text-5xl text-4xl">
              FREQUENTLY <span className="strick"> ASKED</span>QUESTIONS
            </h2>
            <div>
              {faqs.map((faq, index) => (
                <div className="px-4 mt-14 lg:px-0" key={index}>
                  <div className="flex justify-between">
                    <h3
                      className="font-medium text-sm lg:text-2xl hover:text-primary hover:cursor-pointer -tracking-widest"
                      onClick={() => toggleFaq(index)}
                    >
                      {faq.question}
                    </h3>
                    <img
                      alt="downwards arrow"
                      loading="lazy"
                      width="26"
                      height="26"
                      decoding="async"
                      data-nimg="1"
                      className="w-4 lg:w-6 hover:cursor-pointer text-transparent"
                      src={`${openIndex === index
                        ? "/images/arrow-up.svg"
                        : "/images/arrow-down.svg"
                        }`}
                      onClick={() => toggleFaq(index)}
                    />
                  </div>
                  {openIndex === index && (
                    <div className="mt-5">
                      <p
                        className="font-light lg:text-base text-sm leading-relaxed -tracking-wider"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      ></p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
