import React, { useContext, useState } from "react";
import Header from "../header/header";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarContext } from "../../context/SidebarContext";
import styles from './package.module.css';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import axios from 'axios'; // Import axios
import { baseUrl } from "../../baseUrl";

function PackageAddPage() {
  const { isSidebarVisible } = useContext(SidebarContext);
  const [selectedDays, setSelectedDays] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    packageName: '',
    packageCategory: '',
    duration: '',
    cost: '',
    city:'',
    dayPlans: {}
  });

  // Handle duration change and set number of days and duration in formData
  const handleDurationChange = (event) => {
    const duration = event.target.value;
    const days = parseInt(duration.split(' ')[0]);
    setSelectedDays(days);
    setFormData((prev) => ({
      ...prev,
      duration: duration // Set the selected duration in formData
    }));
  };

  // Handle input change for dayPlans
  const handleInputChange = (e, day, field) => {
    setFormData(prev => ({
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

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Create FormData object to include image
    const dataToSend = new FormData();
    dataToSend.append('packageName', formData.packageName);
    dataToSend.append('packageCategory', formData.packageCategory);
    dataToSend.append('duration', formData.duration);
    dataToSend.append('cost', formData.cost);
    dataToSend.append('city', formData.city);
    dataToSend.append('image', selectedImage); // Append the image file

    // Append day plans to the FormData object
    const dayPlansToSend = Object.fromEntries(
      Object.entries(formData.dayPlans).slice(0, selectedDays)
    );
    dataToSend.append('dayPlans', JSON.stringify(dayPlansToSend));

    try {
      // Send data to backend using axios with async/await
      const response = await axios.post(`${baseUrl}/addpackages`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      console.log('Success:', response.data);
      // handle success (e.g., reset form, show a success message)
    } catch (error) {
      console.error('Error:', error);
      // handle error (e.g., show an error message)
    }
  };

  return (
    <>
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
            <h2 className="mb-4 ms-2">Add Packages</h2>
            <form className="ms-3" onSubmit={handleSubmit}>
              <div className=" mb-3">
                <div className="">
                  <label htmlFor="" className="me-2 mb-2">Package Name: </label><br/>
                  <input 
                    type="text" 
                    className={`${styles.input} ms-2 mb-2`} 
                    value={formData.packageName} 
                    onChange={(e) => setFormData({ ...formData, packageName: e.target.value })} 
                  />
                </div>
                <div>
                  <label htmlFor="" className="me-2 mb-3">Package Category: </label><br/>
                  <select 
                    name="" 
                    id="" 
                    className={`${styles.input} mb-2`} 
                    value={formData.packageCategory} 
                    onChange={(e) => setFormData({ ...formData, packageCategory: e.target.value })}>
                    <option value="">Select Package Category</option>
                    <option value="School Package">School Package</option>
                    <option value="College Package">College Package</option>
                    <option value="Industrial Visit Package">Industrial Visit Package</option>
                  </select>
                </div>
              </div>
              <div className=" mb-3">
                <div className="mb-3">
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
                <div className="">
                  <label htmlFor="" className="me-2 mb-2">Cost Per Head: </label><br/>
                  <input 
                    type="text" 
                    className={`${styles.input} ms-2 mb-2`} 
                    value={formData.cost} 
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })} 
                  />
                </div>
                <div className="col-lg-12">
                  <label htmlFor="" className="me-2 mb-1 mt-1">City: </label><br/>
                  <input 
                    type="text" 
                    className={`${styles.input} ms-2 mb-2`} 
                    value={formData.city} 
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
                  />
                </div>
              </div>
              <label htmlFor="">Set Content according to duration</label>

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
                    <div className="mt-2 mb-2">
                      <label htmlFor="">Day {index + 1} Trip Content</label>
                      <input 
                        type="text" 
                        value={formData.dayPlans[index + 1]?.content || ''} 
                        onChange={(e) => handleInputChange(e, index + 1, 'content')} 
                        className={`${styles.input} mb-2`} 
                      />
                      <div>
                        <label htmlFor="">Trip Location</label><br/>  
                        <input 
                          type="text" 
                          value={formData.dayPlans[index + 1]?.location || ''} 
                          onChange={(e) => handleInputChange(e, index + 1, 'location')} 
                          className={`${styles.input}`} 
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="mt-2">Day Plan</label><br/>
                        <textarea 
                          type="text" 
                          className={`${styles.tabinput} p-2 mt-2`} 
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
                  onChange={(event) => setSelectedImage(event.target.files[0])}
                />
                {selectedImage && (
                  <div className="mt-3">
                    <img
                      alt="not found"
                      className="ms-3 mb-2"
                      src={URL.createObjectURL(selectedImage)}
                      height="300px"
                      width="500px"
                    />
                    <br />
                    <button className="btn btn-danger ms-3" onClick={() => setSelectedImage(null)}>
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary mt-3 mb-5">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PackageAddPage;
