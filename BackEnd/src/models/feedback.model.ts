import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);