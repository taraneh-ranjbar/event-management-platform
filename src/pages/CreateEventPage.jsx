
import { useState } from "react";
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

    const [errors, setErrors] =
        useState({});

    const [showSuccessModal,
        setShowSuccessModal] =
        useState(false);


    const handleSubmit =
        async (e) => {

            e.preventDefault();

            const validationErrors = {};

            if (!event.title.trim()) {
                validationErrors.title =
                    "Title is required";
            }

            if (!event.category.trim()) {
                validationErrors.category =
                    "Category is required";
            }

            if (!event.location.trim()) {
                validationErrors.location =
                    "Location is required";
            }

            const today =
                new Date()
                    .toISOString()
                    .split("T")[0];

            if (!event.date) {
                validationErrors.date =
                    "Date is required";
            }
            else if (event.date < today) {
                validationErrors.date =
                    "Date cannot be in the past";
            }

            if (
                !event.price ||
                Number(event.price) <= 0
            ) {
                validationErrors.price =
                    "Price must be greater than 0";
            }

            if (
                !event.description.trim()
            ) {
                validationErrors.description =
                    "Description is required";
            }
            else if (
                event.description.trim().length < 10
            ) {
                validationErrors.description =
                    "Description must be at least 10 characters";
            }

            if (
                Object.keys(validationErrors)
                    .length > 0
            ) {
                setErrors(validationErrors);
                return;
            }

            setErrors({});


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

                setShowSuccessModal(true);

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
                            {
                                errors.title && (
                                    <span
                                        className="field-error"
                                    >
                                        {errors.title}
                                    </span>
                                )
                            }
                        </div>

                        <div className="create-event-field">
                            <label>Category</label>

                            <input
                                type="text"
                                name="category"
                                value={event.category}
                                onChange={handleChange}
                            />
                            {
                                errors.category && (
                                    <span
                                        className="field-error"
                                    >
                                        {errors.category}
                                    </span>
                                )
                            }
                        </div>

                        <div className="create-event-field">
                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={event.location}
                                onChange={handleChange}
                            />
                            {
                                errors.location && (
                                    <span
                                        className="field-error"
                                    >
                                        {errors.location}
                                    </span>
                                )
                            }
                        </div>

                        <div className="create-event-field">
                            <label>Date</label>

                            <input
                                type="date"
                                name="date"
                                value={event.date}
                                onChange={handleChange}
                            />
                            {
                                errors.date && (
                                    <span
                                        className="field-error"
                                    >
                                        {errors.date}
                                    </span>
                                )
                            }
                        </div>

                        <div className="create-event-field">
                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                value={event.price}
                                onChange={handleChange}
                            />
                            {
                                errors.price && (
                                    <span
                                        className="field-error"
                                    >
                                        {errors.price}
                                    </span>
                                )
                            }
                        </div>

                        <div className="create-event-field create-event-field--full">
                            <label>Description</label>

                            <textarea
                                name="description"
                                value={event.description}
                                onChange={handleChange}
                            />
                            {
                                errors.description && (
                                    <span
                                        className="field-error"
                                    >
                                        {errors.description}
                                    </span>
                                )
                            }
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

        {
            showSuccessModal && (
                <div className="success-modal-overlay">

                    <div className="success-modal">

                        <div className="success-icon">
                            ✅
                        </div>

                        <h2>
                            Event Created Successfully
                        </h2>

                        <p>
                            Your event has been added
                            successfully.
                        </p>

                        <button
                            onClick={() =>
                                setShowSuccessModal(false)
                            }
                            className="create-event-btn"
                        >
                            Continue
                        </button>

                    </div>

                </div>
            )
        }

    </div>


    );
}

export default CreateEventPage;
