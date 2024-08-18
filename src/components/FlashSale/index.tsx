import React, { useEffect, useState } from "react";

const FlashSale = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [numberRemainStock, setNumberRemainStock] = useState<number>(20);
  const [isFlashSaleActive, setIsFlashSaleActive] = useState<boolean>(false);

  useEffect(() => {
    const time = new Date();
    const startTime = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      9,
      0,
      0
    );
    const endTime = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      11,
      0,
      0
    );
    if (time >= startTime && time <= endTime) {
      setIsFlashSaleActive(true);
    } else {
      setIsFlashSaleActive(false);
    }
  }, [isFlashSaleActive]);

  const savePhoneNumber = async (phoneNumber: string) => {
    await fetch("/save-phone-number", {
      method: "POST",
      body: {
        phoneNumber: phoneNumber,
      },
    }).then(() => {
      toast.success("Đặt hàng thành công!");
    });
  };

  const checkPhoneNumber = async () => {
    await fetch("/check-phone-number", {
      method: "POST",
      body: {
        phoneNumber: phoneNumber,
      },
    })
      .then((res: any) => res.json())
      .then((data: any) => {
        if (data.exists) {
          setErrorMessage(
            "Số điện thoại của bạn đã thực hiện đặt hàng flash sale. Vui lòng chọn số khác!"
          );
        } else {
          if (numberRemainStock > 0) {
            setNumberRemainStock(numberRemainStock - 1);
            setErrorMessage("");
            savePhoneNumber(phoneNumber);
          } else {
            setNumberRemainStock(0);
            setErrorMessage("Sản phẩm flash sale này đã được bán hết!");
          }
        }
      });
  };

  const handleAddToCart = async () => {
    if (!phoneNumber || phoneNumber?.length === 0) {
      setErrorMessage("Please enter your phone number!");
      return;
    }
    await checkPhoneNumber();
  };

  return !isFlashSaleActive ? (
    <div>No product</div>
  ) : (
    <div>
      <div>Iphone 15</div>
      <div>Price: 1000 USD</div>
      <input
        type="text"
        maxLength={20}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e?.target?.value)}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <button onClick={handleAddToCart} disabled={numberRemainStock <= 0}>
        {numberRemainStock > 0 ? "Add to card" : "Out of stock"}
      </button>
    </div>
  );
};

export default FlashSale;
