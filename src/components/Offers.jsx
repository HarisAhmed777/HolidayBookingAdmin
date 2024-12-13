import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import Header from './header/header';
import Sidebar from './Sidebar/Sidebar';
import { SidebarContext } from '../context/SidebarContext';

function AdminOffers() {
  const {isSidebarVisible} = useContext(SidebarContext);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/offers`)
      .then(response => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching offers');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (index, field, value) => {
    const newOffers = [...offers];
    newOffers[index][field] = value;
    setOffers(newOffers);
  };

  const handleUpdate = (index) => {
    const offer = offers[index];
    axios.put(`${baseUrl}/offers/${offer._id}`, offer)
      .then(response => {
        alert('Offer updated successfully');
        setOffers(prevOffers => prevOffers.map(o => (o._id === offer._id ? response.data : o)));
      })
      .catch(error => {
        console.error('Error updating offer', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className='d-flex'>
        <Sidebar/>
        <div
        className='flex-grow-1'
        style={{
          marginLeft: isSidebarVisible ? '0px' : '-165px',
          transition: 'margin-left 0.3s ease',
          width: '100%',
        }}
        >
            <Header/>
            <div>
      <div className='ms-3'>
        <h2 className=" mb-4 ">Manage Offers</h2>
        <div className="table-responsive">
          <table className="table bg-dark table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={offer._id}>
                  <td>
                    <input
                      type="text"
                      value={offer.code}
                      onChange={(e) => handleInputChange(index, 'code', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={offer.discount}
                      onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleUpdate(index)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
          </div>
        </div>
    </div>
      

    
    </>
  );
}

export default AdminOffers;
