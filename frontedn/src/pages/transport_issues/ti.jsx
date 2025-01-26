import React, { useState } from 'react';
import './ti.css';
import axios from 'axios';

const TransportIssues = () => {
    const [formData, setFormData] = useState({
        date: '',
        busno: '',
        rollNumber: '',
        issueType: '',  
        issue: '',
        status : false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    window.onbeforeunload = () => true;
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({
            date: '',
            busno: '',
            rollNumber: '',
            issueType: '',  
            issue: '',
            status : false,
        });
        axios.post("http://localhost:9000/feedback",formData)
        .then(res=>{
            console.log("data sent to DB")
        })
        .catch(err=>{
            console.log(err)
        })

    };

    return (
        <div className="pf_container">
            <div className="pf_feedback-form-container">
                <h2 className="pf_h2">Feedback Form</h2>
                <h4 className="pf_h4">Let us know how we can improve our service</h4>

                <form onSubmit={handleSubmit} className="pf_feedback-form">
                    <div className="pf_form-group">
                        <label htmlFor="name">Date:</label>
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            placeholder='Enter today date'
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="pf_form-group">
                        <label htmlFor="rollNumber">College ID:</label>
                        <input
                            type="text"
                            id="rollNumber"
                            name="rollNumber"
                            placeholder='Enter Your Roll Number/Employee ID'
                            value={formData.rollNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="pf_form-group">
                        <label htmlFor="busno">Bus Number:</label>
                        <input
                            type="number"
                            id="busno"
                            name="busno"
                            placeholder='Enter Your Bus Number (Ex: 495)'
                            value={formData.busno}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="pf_form-group">
                        <label htmlFor="issueType">Type of Issue:</label>
                        <select
                            id="issueType"
                            name="issueType"
                            value={formData.issueType}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Your Issue Type</option>
                            <option value="Bus_Issue">Bus Issue</option>
                            <option value="Driver_Issue">Driver Issue</option>
                            <option value="Students_Issue">Students Issue</option>
                            <option value="Staff_Issue">Staff Issue</option>
                        </select>
                    </div>
                    <div className="pf_form-group">
                        <label htmlFor="issue">Explain your issue:</label>
                        <textarea
                            id="issue"
                            name="issue"
                            placeholder='Explain Your Issue not less than 10 Words...'
                            value={formData.issue}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="pf_submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransportIssues;
