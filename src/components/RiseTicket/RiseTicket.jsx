import React, { useContext, useState } from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import styles from './RiseTicket.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../header/header';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CircularProgress from '@mui/material/CircularProgress'; // Spinner component
import axios from 'axios';
import { baseUrl } from '../../baseUrl';

function RiseTickets() {
  const { isSidebarVisible } = useContext(SidebarContext);

  const modules = {
    packagemodule: ['edit', 'update', 'delete'],
    blogmodule: ['edit', 'update', 'delete'],
    offermodule: ['edit', 'update', 'delete'],
  };

  const [selectedModule, setSelectedModule] = useState('');
  const [selectedSubmodule, setSelectedSubmodule] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [issues, setIssues] = useState('');
  const [remarks, setRemarks] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [ticketId, setTicketId] = useState(''); // State to store ticket ID

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
    setSelectedSubmodule('');
  };

  const handleSubmoduleChange = (event) => {
    setSelectedSubmodule(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    setTicketId(''); // Reset ticket ID

    const formData = new FormData();
    formData.append('ticketType', ticketType);
    formData.append('module', selectedModule);
    formData.append('submodule', selectedSubmodule);
    formData.append('issues', issues);
    formData.append('remarks', remarks);
    console.log(formData.ticketType);
    if (pdfFile) {
      formData.append('pdf', pdfFile);
    }
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

    try {
      const response = await axios.post(`${baseUrl}/riseTickets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.ticketID);
      const  uniqueId  = response.data.ticketID; // Assuming backend returns the unique ticket ID
      setTicketId(uniqueId); // Set the unique ticket ID
      alert(`Your ticket is raised.We will fix this issue soon \n Your Ticket ID is : ${uniqueId}.`)
      setLoading(false); // Hide spinner
    } catch (error) {
      console.error('Error raising ticket:', error);
      setLoading(false); // Hide spinner in case of error
      alert('There was an error raising the ticket.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='d-flex'>
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
        <div className='text-dark overflow-hidden'>
          <p className={styles.riseticket}>Rise Tickets</p>

          <FormControl>
            <FormLabel className='ms-3'>Ticket Type</FormLabel>
            <RadioGroup
              row
              className='ms-3'
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
            >
              <FormControlLabel value="Error" control={<Radio />} label="Error" />
              <FormControlLabel value="New Requirement" control={<Radio />} label="New Requirement" />
              <FormControlLabel value="Change Request" control={<Radio />} label="Change Request" />
              <FormControlLabel value="Slowness" control={<Radio />} label="Slowness" />
              <FormControlLabel value="Functional" control={<Radio />} label="Functional" />
            </RadioGroup>
          </FormControl>

          <div className='row mt-3'>
            <div className='col-lg-5 ms-3'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl className={styles.selectmodule}>
                  <InputLabel id="module-select-label">Module</InputLabel>
                  <Select
                    labelId="module-select-label"
                    value={selectedModule}
                    label="Module"
                    onChange={handleModuleChange}
                  >
                    <MenuItem value="packagemodule">Package Module</MenuItem>
                    <MenuItem value="blogmodule">Blog Module</MenuItem>
                    <MenuItem value="offermodule">Offer Module</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className='col-lg-5 ms-3'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl className={styles.selectmodule}>
                  <InputLabel id="submodule-select-label">Submodule</InputLabel>
                  <Select
                    labelId="submodule-select-label"
                    value={selectedSubmodule}
                    label="Submodule"
                    onChange={handleSubmoduleChange}
                    disabled={!selectedModule}
                  >
                    {selectedModule && modules[selectedModule].map((submodule, index) => (
                      <MenuItem key={index} value={submodule}>
                        {submodule}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>

          <div className='row '>
            <div className='col-lg-5 ms-3 '>
              <label className='mb-2 mt-2'>Issues</label><br />
              <textarea
                rows="8"
                cols="50"
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                className={styles.selectmodule}
              />
            </div>
            <div className='col-lg-5 ms-3'>
              <label className='mt-2 mb-2'>Remarks</label><br />
              <textarea
                rows="8"
                cols="50"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className={styles.selectmodule}
              />
            </div>
          </div>
          <div className='row'>
          <div className='col-lg-5 ms-3'>
            <label className='mb-3'>Upload only PDF file (optional)</label><br />
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
          </div>
          </div>

          <div className='mt-3 ms-3'>
            {loading ? (
              <CircularProgress /> // Show spinner while loading
            ) : (
              <button type="submit" className="btn bg-primary text-white fw-bold buttonbg">Submit</button>
            )}
          </div>

          {ticketId && (
            <div className='mt-3 ms-3'>
              <p>Your ticket has been raised successfully. Ticket ID: {ticketId}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default RiseTickets;
