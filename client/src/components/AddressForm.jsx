import React, { useState } from "react";

function AddressForm({ onAddAddress }) {
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAddress({ label, address });
    setLabel("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center p-5 align-self-center w-full justify-start  blue-glassmorphism">
        <input
          type="text"
          placeholder="Name"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
          className="w-48 my-2 rounded-sm p-2 mx-1 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full my-2 rounded-sm p-2 mx-1 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
        <button
          type="submit"
          className="text-white m-1 border-[1px] border-[#3d4f7c] hover:bg-[#3d4f7c] cursor-pointer"
          style={{
            borderRadius: "10%",
            paddingTop: "0.35rem",
            paddingBottom: "0.35rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddressForm;
