import { useState } from "react";
import hotelsData from "../data/hotels.json";
import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";

const Hotels = () => {
  const [search, setSearch] = useState("");

  const filteredHotels =
    search.trim() === ""
      ? hotelsData
      : hotelsData.filter((hotel) =>
          hotel.location.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <Navbar onSearch={setSearch} />
      <div className="grid grid-cols-3 gap-4 p-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No hotels found for "{search}"
          </p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
