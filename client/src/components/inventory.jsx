import React, { useState, useEffect } from 'react';
import "../inventory.css";

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [filterColor, setFilterColor] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // To control the visibility of the modal
    const [editedItem, setEditedItem] = useState(null); // To store the edited item details

    useEffect(() => {
        fetchInventory();
    }, [sortOption]);


    const fetchInventory = async () => {
        const url = `https://lovely-ruby-sarong.cyclic.cloud/inventory?sort=${sortOption}&filterByColor=${filterColor}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setInventory(data);
            } else {
                console.error('Failed to fetch inventory');
            }
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterColor(e.target.value);
    };


    const handleEdit = async (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(`https://lovely-ruby-sarong.cyclic.cloud/inventory/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                const data = await response.json();
                setEditedItem(data);
                setIsModalOpen(true);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            alert('User not logged in');
        }
    };

    function EditModal({ item, isOpen, onClose, onSubmit }) {
        const [editedTitle, setEditedTitle] = useState(item[0]?.title || '');
        const [editedDescription, setEditedDescription] = useState(item[0]?.description || '');
        const [editedKilometers, setEditedKilometers] = useState(item[0]?.kilometer || '');
        const [editedMajorScratches, setEditedMajorScratches] = useState(item[0]?.majorScratches || '');
        const [editedNumOfPrevBuyers, setEditedNumOfPrevBuyers] = useState(item[0]?.numOfprevBuyers || '');
        const [editedRegistrationPlace, setEditedRegistrationPlace] = useState(item[0]?.registrationPlace || '');
        const [editedMileage, setEditedMileage] = useState(item[0]?.mileage || '');
        const [editedPrice, setEditedPrice] = useState(item[0]?.price || '');
        const [editedImage, setEditedImage] = useState(item[0]?.image || '');

        const handleSubmit = () => {
            const updatedData = {
                title: editedTitle,
                description: editedDescription,
                kilometer: editedKilometers,
                majorScratches: editedMajorScratches,
                numOfprevBuyers: editedNumOfPrevBuyers,
                registrationPlace: editedRegistrationPlace,
                mileage: editedMileage,
                price: editedPrice,
                image: editedImage,
            };
            onSubmit(updatedData);
        };

        return (
            <div className={`modal ${isOpen ? 'open' : ''}`}>
                <div className="modal__content">
                    <h3>Edit Item</h3>
                    <label htmlFor="">Title:</label>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    /> <br />
                    <label htmlFor="">Description:</label>
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    ></textarea><br />
                    <label htmlFor="">Kilometers:</label>
                    <input
                        type="text"
                        value={editedKilometers}
                        onChange={(e) => setEditedKilometers(e.target.value)}
                    /><br />
                    <label htmlFor="">MajorScratches:</label>
                    <input
                        type="text"
                        value={editedMajorScratches}
                        onChange={(e) => setEditedMajorScratches(e.target.value)}
                    /><br />
                    <label htmlFor="">NumOfPrevBuyers:</label>
                    <input
                        type="text"
                        value={editedNumOfPrevBuyers}
                        onChange={(e) => setEditedNumOfPrevBuyers(e.target.value)}
                    /><br />
                    <label htmlFor="">RegistrationPlace:</label>
                    <input
                        type="text"
                        value={editedRegistrationPlace}
                        onChange={(e) => setEditedRegistrationPlace(e.target.value)}
                    /><br />
                    <label htmlFor="">Mileage:</label>
                    <input
                        type="text"
                        value={editedMileage}
                        onChange={(e) => setEditedMileage(e.target.value)}
                    /><br />
                    <label htmlFor="">Price:</label>
                    <input
                        type="text"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                    /><br />
                    <label htmlFor="">Image:</label>
                    <input
                        type="text"
                        value={editedImage}
                        onChange={(e) => setEditedImage(e.target.value)}
                    /><br />

                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        );
    }



    const handleUpdate = async (id, updatedData) => {
        const token = localStorage.getItem('token');
        if (token && id) {
            try {
                const response = await fetch(`https://lovely-ruby-sarong.cyclic.cloud/inventory/update/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(updatedData),
                });
                if (response.ok) {
                    // Handle successful update
                    console.log('Item updated successfully');
                    // Close the modal
                    setIsModalOpen(false);
                    // Fetch inventory to reflect the changes
                    fetchInventory();
                } else {
                    console.error('Failed to update item');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            alert('User not logged in');
        }
    };

    const handleQuickRefresh = () => {
        fetchInventory();
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(`https://lovely-ruby-sarong.cyclic.cloud/inventory/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: token,
                    },
                });
                if (response.ok) {
                    window.alert('Car info DELETED successfully!');
                } else {
                    // Error adding the car
                    window.alert('Not Authorised to delete the car');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            // Handling the case when the user is not logged in
            alert('User not logged in');
        }
    };
    return (
        <div>
            <div>
                <label htmlFor="sortSelect">Sort by:</label>
                <select id="sortSelect" value={sortOption} onChange={handleSortChange}>
                    <option value="">None</option>
                    <option value="price_desc">Price (High to Low)</option>
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="mileage_desc">Mileage (High to Low)</option>
                    <option value="mileage_asc">Mileage (Low to High)</option>
                </select>
            </div>
            <div>
                <label htmlFor="colorSelect">Filter by color:</label>
                <select id="colorSelect" value={filterColor} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>
            </div>
            <br /><br />

            <button onClick={handleQuickRefresh} className="quick-refresh-btn">Quick Refresh</button>

            <div className="inventory__container">
                {inventory.map((item) => (
                    <div key={item.id} className="inventory__card">
                        <img src={item.image} alt={item.name} className="inventory__image" width="600" height="400" />
                        <div className="inventory__details">
                            <h3 className="inventory__name">Title: {item.title}</h3>
                            <p className="inventory__description">{item.description}</p>
                            <p className="inventory__kilometers">Kilometers: {item.kilometer}</p>
                            <p className="inventory__scratches">Major Scratches: {item.majorScratches}</p>
                            <p className="inventory__buyers">Previous Buyers: {item.numOfprevBuyers}</p>
                            <p className="inventory__registration">Registration Place: {item.registrationPlace}</p>
                            <p className="inventory__mileage">Mileage: {item.mileage}</p>
                            <p className="inventory__price">Price: {item.price}</p>
                            <div className="inventory__actions">
                                <button className="inventory__edit-button" onClick={() => handleEdit(item._id)}>Edit</button>
                                <button className="inventory__delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <EditModal
                    item={editedItem}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={(updatedData) => handleUpdate(editedItem._id, updatedData)}
                />
            )}
        </div>
    );
};

export default Inventory;

