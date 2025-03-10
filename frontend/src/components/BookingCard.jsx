import { Link } from "react-router-dom";

const BookingCard = ({ booking }) => {
  return (
    <Link to={`/webcheckin/${booking.id}`} className="block">
      <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <h2 className="text-xl font-semibold">{booking.hotelName}</h2>
        <p className="text-gray-600">Location: {booking.city}</p>
        <p className="text-gray-600">Price: ${booking.price}</p>
        <p className="text-gray-600">Date: {new Date(booking.bookingDate).toDateString()}</p>
        <p className="text-gray-600">People: {booking.numberOfPeople}</p>
      </div>
    </Link>
  );
};

export default BookingCard;
