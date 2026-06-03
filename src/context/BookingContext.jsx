import {
    createContext,
    useState,
    useEffect
} from "react";

export const BookingContext =
    createContext();

export function BookingProvider({
    children,
}) {

    const [bookings, setBookings] =
        useState(() => {

            const savedBookings =
                localStorage.getItem("bookings");

            return savedBookings
                ? JSON.parse(savedBookings)
                : [];
        });

    useEffect(() => {

        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );

    }, [bookings]);

    const deleteBooking = (bookingId) => {

        setBookings((prevBookings) =>
            prevBookings.filter(
                (booking) =>
                    booking.id !== bookingId
            )
        );

    };

    return (
        <BookingContext.Provider
            value={{
                bookings,
                setBookings,
                deleteBooking
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}