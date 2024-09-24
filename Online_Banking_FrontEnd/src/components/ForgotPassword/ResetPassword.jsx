
//------------------------------------------------------
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const location = useLocation();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // Extract the token from the URL
    const token = new URLSearchParams(location.search).get('token');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords don't match.");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:9090/api/reset-password?token=${token}`, {
                newPassword,
            });
            setMessage('Password reset successfully.');
        } catch (error) {
            setMessage('Error resetting password.');
        }
    };

    return (
        <div className="reset-password-container">
            <form onSubmit={handleResetPassword}>
                <h2>Reset Password</h2>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
