import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <Link to={`/booking/${hotel.id}`} className="block">
      <div className="border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
        <h2 className="text-lg font-semibold">{hotel.name}</h2>
        <p className="text-gray-600">{hotel.location}</p>
        <p className="text-gray-800 font-bold">₹{hotel.price}/night</p>
      </div>
    </Link>
  );
};

export default HotelCard;
