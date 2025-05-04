import { useEffect, useState } from "react";
import userApi from "../services/userApi";
import { useNavigate } from "react-router-dom";
import BookingList from "../components/BookingList";

function Home() {
  const [user, setUser] = useState<{id: number, name: string, email: string, createdAt: string} | null>(null);
  const navigate = useNavigate();
  console.log('User API URL:', import.meta.env.VITE_USER_API_URL);
  console.log('Appointement API URL:', import.meta.env.VITE_APPOINTMENT_API_URL);
  
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await userApi.get("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          setUser(res.data);
        }
      };

      fetchUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const bookAppointment = () => {
    navigate('/book');
  }

  const logout = () => {
    localStorage.removeItem('token');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.name}</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mr-4" onClick={bookAppointment}>
        Book Appointment
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>
        Logout
      </button>
      <BookingList />
    </div>
  );
}

export default Home;
