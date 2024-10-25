import React, { useState } from 'react';
import '../assets/donation.css'; // Make sure to import the CSS file

function Donate() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pan: '',
        aadhaar: '',
        amount: '',
        address: '',
        pincode: '',
        state: '',
        mobile: ''
    });

    const [otpSent, setOtpSent] = useState(false); // Track OTP status

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Function to simulate sending OTP
    const sendOtp = () => {
        console.log(`Sending OTP to ${formData.mobile}`);
        setOtpSent(true);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // After form submission, send OTP
        sendOtp();
    };

    return (
        <div className="donation-container">
            <h2>Donation Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>PAN Number:</label>
                    <input type="text" name="pan" value={formData.pan} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Aadhaar Number:</label>
                    <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Amount:</label>
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Address:</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
                </div>
                <div className="form-section">
                    <label>Pincode:</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>State:</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="form-section">
                    <label>Mobile Number:</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                </div>
                <button type="submit">Submit and Send OTP</button>
            </form>

            {otpSent && <p className="otp-message">OTP has been sent to your mobile number!</p>}
        </div>
    );
}

export default Donate;

