import React, { useState, useEffect, useRef,useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SidebarContext } from "../context/SidebarContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { baseUrl } from "../baseUrl";
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "./header/header";
import Sidebar from "./Sidebar/Sidebar";
import { useReactToPrint } from 'react-to-print';

// Import Material-UI components
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination
} from '@mui/material';

function Bookings() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    age: true,
    persons: true,
    email: true,
    city: true,
    mobile: true,
    startdate: true,
    enddate: true
  });
  const printing = useRef();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {isSidebarVisible} = useContext(SidebarContext)
  useEffect(() => {
    fetch(`${baseUrl}/allbookings`)
      .then(res => res.json())
      .then(view => {
        setData(view);
      })
      .catch(error => {
        console.error("Error occurred", error);
      });
  }, []);

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
    }
    return null;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(booking =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.age.toString().includes(searchTerm.toLowerCase()) ||
    booking.persons.toString().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.startdate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.enddate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handledownload = () => {
    const headers = ["Name", "Age", "Persons", "Mail ID", "City", "Mobile Number", "Start Date", "End Date"];
    const bookingData = data.map(booking => [
      booking.name,
      booking.age,
      booking.persons,
      booking.email,
      booking.city,
      booking.mobile,
      new Date(booking.startdate).toLocaleDateString(),
      new Date(booking.enddate).toLocaleDateString()
    ]);

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([headers, ...bookingData]);

    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    const blob = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileBlob = new Blob([blob], { type: 'application/octet-stream' });
    saveAs(fileBlob, 'bookings.xlsx');
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    const tableColumn = Object.keys(visibleColumns).filter(key => visibleColumns[key]);
    const tableRows = [];

    data.forEach(booking => {
      const bookingData = tableColumn.map(column => {
        if (column === 'startdate' || column === 'enddate') {
          return new Date(booking[column]).toLocaleDateString();
        }
        return booking[column];
      });
      tableRows.push(bookingData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows
    });

    doc.save('bookings.pdf');
  };

  const handlePrint = useReactToPrint({
    content: () => printing.current,
    documentTitle: "Booking Data"
  });

  const handleColumnVisibility = (column) => {
    setVisibleColumns(prevState => ({
      ...prevState,
      [column]: !prevState[column]
    }));
  };

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
            <div className="">
        <div className="ms-3 ">
          <h2 className="pt-2 mb-4 ">Bookings</h2>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              style={{ width: '20%' }}
              placeholder="Search Bookings"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="table-responsive">
            <div className="d-flex gap-2">
              <button onClick={handledownload} className="btn btn-primary mb-4">CSV</button>
              <button onClick={handlePDFDownload} className="btn btn-primary mb-4">PDF</button>
              <button onClick={handlePrint} className="btn btn-primary mb-4">Print</button>
            </div>
            <div ref={printing} style={{ width: '98%' }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {visibleColumns.name && (
                        <TableCell onClick={() => sortData('name')}>
                          Name <FontAwesomeIcon icon={getSortIcon('name')} />
                        </TableCell>
                      )}
                      {visibleColumns.age && (
                        <TableCell onClick={() => sortData('age')}>
                          Age <FontAwesomeIcon icon={getSortIcon('age')} />
                        </TableCell>
                      )}
                      {visibleColumns.persons && (
                        <TableCell onClick={() => sortData('persons')}>
                          Persons <FontAwesomeIcon icon={getSortIcon('persons')} />
                        </TableCell>
                      )}
                      {visibleColumns.email && (
                        <TableCell onClick={() => sortData('email')}>
                          Mail ID <FontAwesomeIcon icon={getSortIcon('email')} />
                        </TableCell>
                      )}
                      {visibleColumns.city && (
                        <TableCell onClick={() => sortData('city')}>
                          City <FontAwesomeIcon icon={getSortIcon('city')} />
                        </TableCell>
                      )}
                      {visibleColumns.mobile && (
                        <TableCell onClick={() => sortData('mobile')}>
                          Mobile Number <FontAwesomeIcon icon={getSortIcon('mobile')} />
                        </TableCell>
                      )}
                      {visibleColumns.startdate && (
                        <TableCell onClick={() => sortData('startdate')}>
                          Start Date <FontAwesomeIcon icon={getSortIcon('startdate')} />
                        </TableCell>
                      )}
                      {visibleColumns.enddate && (
                        <TableCell onClick={() => sortData('enddate')}>
                          End Date <FontAwesomeIcon icon={getSortIcon('enddate')} />
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => (
                      <TableRow className="tablebody" key={index}>
                        {visibleColumns.name && <TableCell>{value.name}</TableCell>}
                        {visibleColumns.age && <TableCell>{value.age}</TableCell>}
                        {visibleColumns.persons && <TableCell>{value.persons}</TableCell>}
                        {visibleColumns.email && <TableCell>{value.email}</TableCell>}
                        {visibleColumns.city && <TableCell>{value.city}</TableCell>}
                        {visibleColumns.mobile && <TableCell>{value.mobile}</TableCell>}
                        {visibleColumns.startdate && (
                          <TableCell>{new Date(value.startdate).toLocaleDateString()}</TableCell>
                        )}
                        {visibleColumns.enddate && (
                          <TableCell>{new Date(value.enddate).toLocaleDateString()}</TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
            
        </div>
   
      
      </div>
    </>
  );
}

export default Bookings;
