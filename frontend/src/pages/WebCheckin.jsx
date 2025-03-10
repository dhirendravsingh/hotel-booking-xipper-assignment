import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const WebCheckin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/webcheckin");
        setBookings(response.data); // Assuming response.data is an array of bookings
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-lg font-semibold">{booking.hotelName}</h2>
              <p className="text-gray-600">Location: {booking.location}</p>
              <p className="text-gray-600">Date: {booking.date}</p>
              <p className="text-gray-600">People: {booking.people}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebCheckin;
