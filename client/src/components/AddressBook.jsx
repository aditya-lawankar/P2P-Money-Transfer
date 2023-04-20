import React, { useState, useEffect } from "react";
import AddressForm from "./AddressForm";

function AddressBook() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  const handleAddAddress = (newAddress) => {
    const updatedAddresses = [...addresses, newAddress];
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
  };

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <div className="justify-between mb-4">
          <h2 className="text-white text-3xl text-center my-2 mb-5">
            Address Book
          </h2>
          <AddressForm onAddAddress={handleAddAddress} />
        </div>

        <div className="flex flex-wrap justify-center items-center mt-10">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left font-bold pr-2 py-2">Name</th>
                <th className="text-left font-bold pr-2 py-2">Address</th>
                <th className="text-right font-bold px-2 py-2" scope="col">
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address, index) => (
                <tr key={index} className="border-b border-gray-200 text-white">
                  <td className="text-left pr-2 py-2 text-white">
                    {address.label}
                  </td>
                  <td className="text-left pr-2 py-2 text-white">
                    {address.address}
                  </td>
                  <td className="text-right px-2 py-2">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteAddress(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddressBook;
