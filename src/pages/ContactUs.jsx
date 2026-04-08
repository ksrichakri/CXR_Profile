import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        reason: "",
        yearOfStudy: "",
        fieldOfStudy: ""
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Submitting...");

        try {
            await addDoc(collection(db, "contact_messages"), {
                ...formData,
                createdAt: new Date()
            });

            setStatus("Message Sent Successfully!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                reason: "",
                yearOfStudy: "",
                fieldOfStudy: ""
            });
            setTimeout(() => setStatus(""), 3000);
        } catch (error) {
            console.error("Error submitting contact form: ", error);
            setStatus("Failed to send message. Try again later.");
        }
    };

    return (
        <div className="portfolio-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            
            <div style={{ flex: 1, padding: "120px 20px", display: "flex", justifyContent: "center" }}>
                <div className="glass-panel" style={{ width: "100%", maxWidth: "600px", padding: "40px" }}>
                    <h2 className="text-gradient" style={{ textAlign: "center", marginBottom: "30px", fontSize: "2.5rem" }}>Contact Us</h2>
                    
                    {status && (
                        <div style={{ 
                            padding: "15px", 
                            marginBottom: "20px", 
                            borderRadius: "8px", 
                            textAlign: "center",
                            backgroundColor: status.includes("Successfully") ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                            color: status.includes("Successfully") ? "#10b981" : "#ef4444"
                        }}>
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        
                        <div>
                            <label style={labelStyle}>Full Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} required className="form-input" style={{ width: "100%" }} />
                        </div>

                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" style={{ width: "100%" }} />
                        </div>

                        <div>
                            <label style={labelStyle}>Phone Number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" style={{ width: "100%" }} />
                        </div>

                        <div>
                            <label style={labelStyle}>Reason of Contact</label>
                            <textarea name="reason" value={formData.reason} onChange={handleChange} required rows="3" className="form-input" style={{ width: "100%" }} />
                        </div>

                        <div>
                            <label style={labelStyle}>Year of Study</label>
                            <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} required className="form-input" style={{ width: "100%" }}>
                                <option value="" disabled>Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>Field of Study (e.g. Btech CSE)</label>
                            <input name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} required className="form-input" style={{ width: "100%" }} />
                        </div>

                        <button type="submit" className="btn-primary" style={{ marginTop: "20px", padding: "15px", fontSize: "1.1rem" }}>
                            Send Message
                        </button>

                    </form>
                </div>
            </div>

            <Footer />

            <style>{`
                .form-input {
                    padding: 12px 15px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    background: rgba(255, 255, 255, 0.05); /* slightly refined background */
                    color: var(--text-main);
                    font-family: var(--font-sans);
                    outline: none;
                    transition: all 0.3s ease;
                }
                .form-input:focus {
                    border-color: var(--accent-color);
                    box-shadow: 0 0 0 2px rgba(0, 115, 103, 0.2);
                }
            `}</style>
        </div>
    );
}

const labelStyle = { 
    fontSize: "0.9rem", 
    color: "var(--text-muted)", 
    marginBottom: "5px", 
    display: "block" 
};
