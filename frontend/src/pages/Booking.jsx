import { useState } from "react";
import { useParams } from "react-router-dom";
import hotelsData from "../data/hotels.json";

const Booking = () => {
  const { id } = useParams();
  const hotel = hotelsData.find((hotel) => hotel.id.toString() === id);

  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);
  const [error, setError] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    setError("");

    if (!date) {
      setError("Please select a booking date.");
      return;
    }

    if (people < 1) {
      setError("Number of people must be at least 1.");
      return;
    }

    alert(`Booking confirmed for ${hotel.name} on ${date} for ${people} people!`);
  };

  if (!hotel) {
    return <p className="text-center text-red-500">Hotel not found</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold">{hotel.name}</h1>
      <p className="text-gray-600">{hotel.location}</p>
      <p className="text-lg font-semibold">₹{hotel.price} / night</p>

      {/* Booking Form */}
      <form onSubmit={handleBooking} className="mt-4">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Booking Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of People</label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(parseInt(e.target.value))}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
