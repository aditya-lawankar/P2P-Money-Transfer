import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GasPrice() {
  const [gasPrice, setGasPrice] = useState(null);

  useEffect(() => {
    const fetchGasPrice = async () => {
      const response = await axios.get(
        "https://api.etherscan.io/api?module=gastracker&action=gasoracle"
      );
      setGasPrice(response.data.result.ProposeGasPrice);
    };
    fetchGasPrice();
  }, []);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {gasPrice && (
          <p className='text-white text-3xl text-center my-2 mb-5'>
            Current gas price: {gasPrice / 10 ** 9} Gwei
          </p>
        )}
      </div>
    </div>
  );
}

export default GasPrice;
