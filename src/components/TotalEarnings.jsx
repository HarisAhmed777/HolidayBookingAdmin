import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { baseUrl } from "../baseUrl";
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "./header";
import Menu from "./Menu";
import { useReactToPrint } from 'react-to-print';

function Earnings() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        email: true,
        mobile: true,
        totalamount: true
    });
    const printing = useRef();

    useEffect(() => {
        fetch(`${baseUrl}/allbookings`)
            .then(res => res.json())
            .then(view => {
                setData(view);
                console.log(view);
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
        booking.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handledownload = () => {
        const headers = ["Name", "Mail ID", "Mobile Number", "Total Amount"];
        const bookingData = data.map(booking => [
            booking.name,
            booking.email,
            booking.mobile,
            booking.totalamount
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
            const bookingData = tableColumn.map(column => booking[column]);
            tableRows.push(bookingData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows
        });

        doc.save('Earnings.pdf');
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
            <Header />
            <Menu />
            <div className="overflow-hidden">
                <div className="container content-wrapper mt-4">
                    <h1 className="text-center mb-4">Bookings</h1>
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
                        <div ref={printing} style={{ width: '100%' }}>
                            <table className="table bg-dark table-striped table-bordered" id="printable-table">
                                <thead>
                                    <tr>
                                        {visibleColumns.name && <th onClick={() => sortData('name')}>Name <FontAwesomeIcon icon={getSortIcon('name')} /></th>}
                                        {visibleColumns.email && <th onClick={() => sortData('email')}>Mail ID <FontAwesomeIcon icon={getSortIcon('email')} /></th>}
                                        {visibleColumns.mobile && <th onClick={() => sortData('mobile')}>Mobile Number <FontAwesomeIcon icon={getSortIcon('mobile')} /></th>}
                                        {visibleColumns.totalamount && <th onClick={() => sortData('totalamount')}>Total Amount <FontAwesomeIcon icon={getSortIcon('totalamount')} /></th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((value, index) => (
                                        <tr key={index}>
                                            {visibleColumns.name && <td>{value.name}</td>}
                                            {visibleColumns.email && <td>{value.email}</td>}
                                            {visibleColumns.mobile && <td>{value.mobile}</td>}
                                            {visibleColumns.totalamount && <td>{value.totalamount}</td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Earnings;
