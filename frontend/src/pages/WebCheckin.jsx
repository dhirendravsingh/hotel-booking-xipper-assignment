import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import BookingCard from "../components/BookingCard";
import hotelsData from "../data/hotels.json"; // Load hotels data

const WebCheckin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/webcheckin");
        const userBookings = response.data.booking; // Extract bookings array

        // Merge bookings with hotel details
        const mergedBookings = userBookings.map((booking) => {
          const hotel = hotelsData.find((hotel) => hotel.id === booking.hotelId);
          return {
            ...booking,
            hotelName: hotel?.name || "Unknown Hotel",
            city: hotel?.location || "Unknown City",
            price: hotel?.price || "N/A",
          };
        });

        setBookings(mergedBookings);
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
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WebCheckin;
