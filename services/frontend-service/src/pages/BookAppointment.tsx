import React, { useEffect, useState } from "react";
import appointmentApi from "../services/appointmentApi";
import { useParams, useNavigate } from "react-router-dom";

function BookAppointment() {

  const [form, setForm] = useState({date: '', vehicleNumber: ''});
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=> {
    if (id) {
      setIsEdit(true);
      fetchAppointment(id);
    }

    async function fetchAppointment(id: string) {
      try {
        const response = await appointmentApi.get(`/api/appointments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (response.status === 200) {
          setForm({
            date: response.data.date.slice(0, 10), // trim to yyyy-mm-dd
            vehicleNumber: response.data.vehicleNumber,
          });
        }
        else {
          throw new Error('Error while getting response');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await appointmentApi.put(`/api/appointments/${id}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        await appointmentApi.post("/api/appointments", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Appointment" : "Book Car Service Appointment"}
        </h1>
        <input
          type="text"
          placeholder="Vehicle Number"
          required
          value={form.vehicleNumber}
          onChange={(e) => setForm({...form, vehicleNumber: e.target.value})}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="date"
          required
          value={form.date}
          onChange={(e) => setForm({...form, date: e.target.value})}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {isEdit ? "Update Appointment" : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;
