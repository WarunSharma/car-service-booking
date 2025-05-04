import { useEffect, useState } from "react";
import appointmentApi from "../services/appointmentApi";
import { Link } from "react-router-dom";

type Appointment = {
  id: string;
  name: string;
  date: string;
  vehicleNumber: string;
};

function BookingList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentApi.get("/api/appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        if (response.status === 200) {
          setAppointments(response.data);
        } else {
          throw new Error("Error in getting appointments");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await appointmentApi.delete(`/api/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading</p>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 mt-4">Your Bookings</h2>
      {appointments.length === 0 ? (
        <p>No Bookings</p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="border p-4 rounded shadow">
              <div>
                {/* <p><strong>Name:</strong> {appointment.name}</p> */}
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Vehicle No:</strong> {appointment.vehicleNumber}
                </p>
              </div>
              <Link to={`/book/edit/${appointment.id}`} className="bg-yellow-500 text-white px-3 py-2 rounded mr-2">Edit</Link>
              <button
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(appointment.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingList;
