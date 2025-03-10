import { Link } from "react-router-dom";

const BookingCard = ({ booking }) => {
  return (
    <Link to={`/webcheckin/${booking.id}`} className="block">
      <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <h1 className="text-gray-900">Date: {new Date(booking.bookingDate).toDateString()}</h1>
        <p className="text-gray-600">People: {booking.numberOfPeople}</p>
      </div>
    </Link>
  );
};

export default BookingCard;
