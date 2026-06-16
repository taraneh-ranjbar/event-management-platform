import axios from "axios";

const API_URL =
  "http://localhost:3001/bookings";

export const getAllBookings =
  async () => {

    const response =
      await axios.get(API_URL);

    return response.data;
  };

export const deleteBookingApi =
  async (id) => {

    await axios.delete(
      `${API_URL}/${id}`
    );

    return id;
  };

  export const createBookingApi =
  async (booking) => {

    const response =
      await axios.post(
        API_URL,
        booking
      );

    return response.data;
  };