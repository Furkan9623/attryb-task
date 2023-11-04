import React, { useState } from 'react';
import "../addcar.css"


const AddCarForm = () => {
    const initialCarData = {
        kilometer: '',
        majorScratches: '',
        originalPaint: '',
        numOfAccidents: '',
        numOfprevBuyers: '',
        registrationPlace: '',
        image: '',
        price: '',
        title: '',
        mileage: '',
        description: '',
    };
    const [carData, setCarData] = useState(initialCarData);
    const [formError, setFormError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const resetForm = () => {
        setCarData(initialCarData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if any of the fields are empty
        const emptyFields = Object.values(carData).some((value) => value === '');
        if (emptyFields) {
            window.alert('Please fill in all the fields.');
            return;
        }

        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        };

        const requestBody = {
            ...carData,
        };

        try {
            // Making the POST request to the API endpoint
            const response = await fetch('https://lovely-ruby-sarong.cyclic.cloud/inventory/add', {
                method: 'POST',
                headers,
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                // Car added successfully
                window.alert('Car info added successfully!');
                resetForm();
            } else {
                // Error adding the car
                window.alert('Error adding the car. Please try again.');
            }
        } catch (error) {
            window.alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="form-container">
            <h2>Add Car</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Kilometer:
                    <input
                        type="number"
                        name="kilometer"
                        value={carData.kilometer}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Major Scratches:
                    <input
                        type="text"
                        name="majorScratches"
                        value={carData.majorScratches}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Original Paint:
                    <input
                        type="text"
                        name="originalPaint"
                        value={carData.originalPaint}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Number of Accidents:
                    <input
                        type="number"
                        name="numOfAccidents"
                        value={carData.numOfAccidents}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Number of Previous Buyers:
                    <input
                        type="number"
                        name="numOfprevBuyers"
                        value={carData.numOfprevBuyers}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Registration Place:
                    <input
                        type="text"
                        name="registrationPlace"
                        value={carData.registrationPlace}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Image:
                    <input
                        type="text"
                        name="image"
                        value={carData.image}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={carData.price}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={carData.title}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Mileage:
                    <input
                        type="number"
                        name="mileage"
                        value={carData.mileage}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={carData.description}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddCarForm;
