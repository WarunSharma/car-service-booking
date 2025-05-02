import { useEffect, useState } from "react";
import userApi from "../services/userApi";

function Home() {
  const [user, setUser] = useState<{id: number, name: string, email: string, createdAt: string} | null>(null);
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.name}</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mr-4">
        Book Appointment
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}

export default Home;
