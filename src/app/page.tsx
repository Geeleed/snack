"use client";

import React, { useRef, useState } from "react";

function Help({ helpPage, setHelpPage }: any) {
  return (
    <div
      className=" w-full h-full z-10 bg-[#000000dd] absolute top-0 left-0 p-10 grid place-content-center place-items-center cursor-pointer"
      onClick={() => setHelpPage(!helpPage)}
    >
      <p className=" text-2xl text-white">Highest Worth = Best PRICE!</p>
      <p className=" text-2xl text-white">best price for quantity</p>
      <br />
      <p className=" text-sm text-white">v.1.0.0</p>
      <p className=" text-sm text-white">Dev by Geeleed</p>
    </div>
  );
}

function Snack() {
  return (
    <div className=" place-self-center relative w-full h-full rounded-md flex justify-center items-center flex-col leading-none bg-[#B51200]">
      <h1 className=" text-[4rem] text-[#fff] font-extrabold">SNACK</h1>
      <p className=" text-[0.8rem] text-[#fff]">
        Compare worth for best quantity!
      </p>
    </div>
  );
}

function Root() {
  const [helpPage, setHelpPage] = useState<any>(false);
  const [items, setItems] = useState<any[]>([
    { price: 10, weight: 29 },
    { price: 15, weight: 45 },
  ]);
  const refPrice = useRef<HTMLInputElement>(null);
  const refWeight = useRef<HTMLInputElement>(null);
  function handleSubmit() {
    const price = refPrice.current?.value;
    const weight = refWeight.current?.value;
    const priceFocusThenSetEmpty = () => {
      refPrice.current?.focus();
      refPrice.current!.value = "";
    };
    if (Number(price) === 0) {
      priceFocusThenSetEmpty();
      return;
    }
    if (price !== "" && weight !== "") {
      setItems((prev: any) => [
        ...prev,
        {
          price: Number(price),
          weight: Number(weight),
        },
      ]);
      priceFocusThenSetEmpty();
      refWeight.current!.value = "";
    }
  }
  return (
    <div className=" grid place-content-center place-items-center">
      <div className=" w-full h-[100vh] grid grid-rows-7 p-5 bg-[#f9f6f2] relative md:w-[500px] md:drop-shadow-lg md:rounded-md">
        {/* head */}
        {helpPage && <Help helpPage={helpPage} setHelpPage={setHelpPage} />}
        <div className=" row-span-2 w-full grid bg-[#f9f6f2] relative rounded-md">
          <Snack />
          <h1
            className=" absolute bottom-0 right-0 p-3 text-xl bg-[#f9f6f2] m-1 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
            onClick={() => setHelpPage(!helpPage)}
          >
            ?
          </h1>
        </div>
        <div className=" row-span-4">
          {/* field name */}
          <div className=" grid grid-cols-7 place-items-center gap-2 ">
            <div className=" col-span-2 h-[3rem] grid place-items-center place-content-center w-full text-[#000]">
              Price
            </div>
            <div className=" col-span-2 h-[3rem] grid place-items-center place-content-center w-full text-[#000]">
              Weight
            </div>
            <div className=" col-span-2 h-[3rem] grid place-items-center place-content-center w-full text-[#000]">
              Worth
            </div>
            <button
              className="col-span-1 h-[3rem] grid place-items-center place-content-center w-full text-[#000] cursor-pointer bg-gray-200 m-1 p-1 rounded-md"
              onClick={() => setItems([])}
            >
              Reset
            </button>
          </div>
          {/* display items */}
          <div className=" h-[80%] overflow-y-auto flex flex-col gap-2">
            {items.map((item, index) => (
              <Display
                key={index}
                itemIndex={index}
                price={item.price}
                weight={item.weight}
                setItems={setItems}
                items={items}
              />
            ))}
          </div>
        </div>
        {/* input item data */}
        <div className=" row-span-1 flex h-full gap-2">
          <input
            className="w-full p-3 text-[2rem] bg-[#f9f6f2] rounded-md border-[#B51200] border-2 text-[#B51200]"
            type="number"
            placeholder="Price"
            ref={refPrice}
            onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
          />
          <input
            className="w-full p-3 text-[2rem] bg-[#f9f6f2] rounded-md border-[#B51200] border-2 text-[#B51200]"
            type="number"
            placeholder="Weight"
            ref={refWeight}
            onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
          />
          <button
            className="w-4/5 text-4xl flex justify-center items-center bg-[#B51200] cursor-pointer rounded-full text-[#ffffff] font-extrabold"
            onClick={handleSubmit}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Root;

interface propsDisplay {
  itemIndex: number;
  price: number;
  weight: number;
  setItems: any;
  items: any[];
}
function Display({ itemIndex, price, weight, setItems, items }: propsDisplay) {
  const worth = items.map((item) => item.weight / item.price);
  const highestValue = Math.max(...worth);
  const isHighest =
    worth[itemIndex] === highestValue ? " bg-[#FFD712] " : " bg-[#f9f6f2] ";
  const isRecommend = worth[itemIndex] === highestValue;

  return (
    <div
      className={
        " grid grid-cols-7 place-items-center gap-2 rounded-md border-b-gray-300 border-b" +
        isHighest
      }
    >
      <div className=" text-xl col-span-2 h-[3rem] grid place-items-center w-full">
        {price} ฿
      </div>
      <div className=" text-xl col-span-2 h-[3rem] grid place-items-center w-full">
        {weight}
      </div>
      <div className=" text-xl col-span-2 h-[3rem] grid place-items-center w-full">
        <div className="flex justify-center items-center gap-2">
          {isRecommend && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#B51200"
              className="bi bi-hand-thumbs-up scale-150 animate-blink"
              viewBox="0 0 16 16"
            >
              <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
            </svg>
          )}
          {(weight / price).toFixed(2)}
        </div>
      </div>
      <button
        className=" text-xl col-span-1 h-[3rem] grid place-items-center w-full"
        onClick={() => {
          setItems((prev: any) =>
            prev.filter((_: any, index: number) => index !== itemIndex)
          );
        }}
      >
        X
      </button>
    </div>
  );
}
