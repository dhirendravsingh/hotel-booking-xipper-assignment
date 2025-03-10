import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const CheckingIn = () => {
  const { bookingId } = useParams();
  const [aadhaarNumbers, setAadhaarNumbers] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

  const handleCheckin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
        console.log(bookingId)
      const response = await axiosInstance.post(`/webcheckin/${bookingId}`, {
        aadhaarNumbers: aadhaarNumbers.split(",").map((num) => num.trim()), // Convert string to array
      });

      setSuccess(response.data.message);
      setAadhaarNumbers(""); // Reset input after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete web check-in.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Web Check-in</h1>

      <label className="block text-lg font-semibold mb-2">Enter Aadhaar Numbers (comma separated)</label>
      <input
        type="text"
        value={aadhaarNumbers}
        onChange={(e) => setAadhaarNumbers(e.target.value)}
        placeholder="123456789012, 987654321098"
        className="block w-full p-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleCheckin}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Web Check-in"}
      </button>

      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default CheckingIn;
