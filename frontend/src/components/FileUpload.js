import { useState } from "react";
import axios from "axios";
import Menu from "./Menu";
import api from "../axios";
export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        setUploading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await api.post( `${process.env.REACT_APP_API_URL}/transactions/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("Upload successful!");
        } catch (error) {
            setMessage("Upload failed. Please try again.");
        }

        setUploading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Menu />
            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-xl font-semibold mb-4">Upload File</h2>
                <input type="file" onChange={handleFileChange} className="mb-4" />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
                {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    );
}
