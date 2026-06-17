import Navbar from "../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
    updateField,
    clearDraft,
} from "../features/events/createEventSlice";

import "../styles/CreateEventPage.css";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createEventApi,
} from "../services/eventService";

function CreateEventPage() {
    const dispatch = useDispatch();

    const queryClient =
        useQueryClient();

    const createEventMutation =
        useMutation({
            mutationFn:
                createEventApi,

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: ["events"],
                });

            },
        });

    const event = useSelector(
        (state) => state.createEvent
    );

    const handleChange = (e) => {
        dispatch(
            updateField({
                field: e.target.name,
                value: e.target.value,
            })
        );
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            const newEvent = {
                id: Date.now().toString(),

                title: event.title,

                description:
                    event.description,

                category:
                    event.category,

                date:
                    event.date,

                time:
                    "10:00 AM",

                location:
                    event.location,

                organizerName:
                    "Community Organizer",

                ticketTypes: [
                    {
                        id: "1",


                        name: "General",

                        price: Number(
                            event.price
                        ),

                        available: 100,
                    },


                ],
            };


            try {

                await createEventMutation.mutateAsync(
                    newEvent
                );

                alert(
                    "Event Created Successfully!"
                );

                dispatch(
                    clearDraft()
                );

            } catch (error) {

                console.error(error);

                alert(
                    "Failed to create event"
                );
            }
        };

    return (<div className="create-event-page"> <Navbar />

        ```
        <section className="create-event-hero">
            <h1>Create Event</h1>

            <p className="create-event-subtitle">
                Organize conferences, workshops,
                meetups and community events.
            </p>
        </section>

        <div className="create-event-container">
            <div className="create-event-card">
                <form onSubmit={handleSubmit}>
                    <div className="create-event-grid">

                        <div className="create-event-field">
                            <label>Event Title</label>

                            <input
                                type="text"
                                name="title"
                                value={event.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="create-event-field">
                            <label>Category</label>

                            <input
                                type="text"
                                name="category"
                                value={event.category}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="create-event-field">
                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={event.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="create-event-field">
                            <label>Date</label>

                            <input
                                type="date"
                                name="date"
                                value={event.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="create-event-field">
                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                value={event.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="create-event-field create-event-field--full">
                            <label>Description</label>

                            <textarea
                                name="description"
                                value={event.description}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="create-event-actions">
                        <button
                            className="create-event-btn"
                            type="submit"
                        >
                            Create Event
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>


    );
}

export default CreateEventPage;
