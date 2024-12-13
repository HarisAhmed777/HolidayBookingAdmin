import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../header/header';
import Sidebar from '../Sidebar/Sidebar';
import { SidebarContext } from '../../context/SidebarContext';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { baseUrl } from '../../baseUrl';
import styles from './package.module.css';

function EditPackage() {
  const { isSidebarVisible } = useContext(SidebarContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const packageData = location.state?.packageData || {};
  const imageBaseUrl = `${baseUrl}/uploads/`;

  const [selectedDays, setSelectedDays] = useState(packageData.duration.split(' ')[0]); // Pre-set the number of days
  const [selectedImage, setSelectedImage] = useState(null);
  const [packageImage, setPackageImage] = useState(packageData.imageUrl);

  const [formData, setFormData] = useState({
    packageName: packageData.packageName || '',
    packageCategory: packageData.packageCategory || '',
    duration: packageData.duration || '',
    cost: packageData.cost || '',
    city: packageData.city || '',
    dayPlans: packageData.dayPlans || {},
    imageUrl: packageImage ? `${imageBaseUrl}${packageImage}` : ''
  });


  const handleDurationChange = (event) => {
    const duration = event.target.value;
    const days = parseInt(duration.split(' ')[0]);
    setSelectedDays(days);
    setFormData(prev => ({
      ...prev,
      duration: duration
    }));
  };

  const handleInputChange = (e, day, field) => {
    setFormData((prev) => ({
      ...prev,
      dayPlans: {
        ...prev.dayPlans,
        [day]: {
          ...prev.dayPlans[day],
          [field]: e.target.value
        }
      }
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPackageImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const dataToSend = new FormData();
    dataToSend.append('packageName', formData.packageName);
    dataToSend.append('packageCategory', formData.packageCategory);
    dataToSend.append('duration', formData.duration);
    dataToSend.append('cost', formData.cost);
    dataToSend.append('city', formData.city);

    if (selectedImage) {
      dataToSend.append('image', selectedImage);
    }

    const dayPlansToSend = Object.fromEntries(
      Object.entries(formData.dayPlans).slice(0, selectedDays)
    );
    dataToSend.append('dayPlans', JSON.stringify(dayPlansToSend));

    try {
      const response = await axios.put(`${baseUrl}/packages/${packageData._id}`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
      navigate('/starholadmin/allpackages');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='d-flex'>
      <Sidebar />
      <div
        className='flex-grow-1'
        style={{
          marginLeft: isSidebarVisible ? '0px' : '-165px',
          transition: 'margin-left 0.3s ease',
          width: '100%',
        }}
      >
        <Header />
        <div>
          <h2 className="mb-4">Edit Package</h2>
          <form className="ms-3" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="" className="me-2 mb-2">Package Name: </label>
                <input 
                  type="text" 
                  className={`${styles.input} ms-2 mb-2`} 
                  value={formData.packageName} 
                  onChange={(e) => setFormData({ ...formData, packageName: e.target.value })} 
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="" className="me-2 mb-3">Package Category: </label>
                <select 
                  className={`${styles.input} mb-2`} 
                  value={formData.packageCategory} 
                  onChange={(e) => setFormData({ ...formData, packageCategory: e.target.value })}
                >
                  <option value="">Select Package Category</option>
                  <option value="School Package">School Package</option>
                  <option value="College Package">College Package</option>
                  <option value="Industrial Visit Package">Industrial Visit Package</option>
                </select>
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="" className="me-2 mb-2">Package Duration: </label>
                <select 
                    name="" 
                    id="" 
                    className={`${styles.input} mb-2`} 
                    value={formData.duration} 
                    onChange={handleDurationChange}>
                    <option value="">Select Duration</option>
                    <option value="1 day 1 night">1 day 1 night</option>
                    <option value="2 day 1 night">2 day 1 night</option>
                    <option value="3 day 2 night">3 day 2 night</option>
                    <option value="4 day 3 night">4 day 3 night</option>
                  </select>
              </div>
              <div className="col-lg-6">
                <label htmlFor="" className="me-2 mb-2">Cost Per Head: </label>
                <input 
                  type="text" 
                  className={`${styles.input} ms-2 mb-2`} 
                  value={formData.cost} 
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                />
              </div>
            </div>

            <label htmlFor="">Day Plans</label>
            <Tabs defaultValue={1}>
              <TabsList>
                {Array.from({ length: selectedDays }).map((_, index) => (
                  <Tab key={index} className={`${styles.tablist} mt-2 mb-2 ms-2`} value={index + 1}>
                    Day {index + 1}
                  </Tab>
                ))}
              </TabsList>

              {Array.from({ length: selectedDays }).map((_, index) => (
                <TabPanel key={index} value={index + 1}>
                  <div>
                    <label htmlFor="">Day {index + 1} Trip Content</label>
                    <input 
                      type="text" 
                      value={formData.dayPlans[index + 1]?.content || ''} 
                      onChange={(e) => handleInputChange(e, index + 1, 'content')} 
                      className={`${styles.input}`} 
                    />
                    <div>
                      <label htmlFor="">Trip Location</label>
                      <input 
                        type="text" 
                        value={formData.dayPlans[index + 1]?.location || ''} 
                        onChange={(e) => handleInputChange(e, index + 1, 'location')} 
                        className={`${styles.input}`} 
                      />
                    </div>
                    <div>
                      <label htmlFor="">Day Plan</label>
                      <input 
                        type="text" 
                        className={`${styles.tabinput}`} 
                        value={formData.dayPlans[index + 1]?.plan || ''} 
                        onChange={(e) => handleInputChange(e, index + 1, 'plan')} 
                      />
                    </div>
                  </div>
                </TabPanel>
              ))}
            </Tabs>

            <div className="form-group">
              <label className={`${styles.label} d-block fw-bold ms-3 mb-2`}>Upload Image</label>
              <input
                type="file"
                className="form-control-file ms-3 mb-2"
                onChange={handleImageChange}
              />
              {(selectedImage || packageImage) && (
                <div className="mt-3">
                  <img
                    alt="Preview not available"
                    className="ms-3 mb-2"
                    src={selectedImage ? URL.createObjectURL(selectedImage) : formData.imageUrl}
                    height="300px"
                    width="500px"
                  />
                  <button className="btn btn-danger ms-3" onClick={() => setSelectedImage(null)}>
                    Remove
                  </button>
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary mt-3">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPackage;
