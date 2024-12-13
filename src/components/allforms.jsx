import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { baseUrl } from '../baseUrl';
import Header from './header/header';
import Sidebar from './Sidebar/Sidebar';
import { SidebarContext } from '../context/SidebarContext';
function Allforms() {
    const {isSidebarVisible} = useContext(SidebarContext);
    const [forms, setForms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        axios.get(`${baseUrl}/allforms`)
            .then(response => {
                setForms(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching forms');
                setLoading(false);
            });
    }, []);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedData = [...forms].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setForms(sortedData);
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

    const filteredForms = forms.filter(form =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.budget.toString().includes(searchTerm.toLowerCase()) ||
        form.travelDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.numberOfPeople.toString().includes(searchTerm.toLowerCase()) ||
        form.interest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.desiredLocations.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className='text-white'>Loading...</div>;
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
                <h2 className=" mb-4">Forms</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        style={{ width: '20%' }}
                        placeholder="Search Forms"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="table-responsive"
                style={{width:'95%'}}>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th onClick={() => sortData('name')}>
                                    Name <FontAwesomeIcon icon={getSortIcon('name')} />
                                </th>
                                <th onClick={() => sortData('email')}>
                                    Email <FontAwesomeIcon icon={getSortIcon('email')} />
                                </th>
                                <th onClick={() => sortData('mobile')}>
                                    Mobile <FontAwesomeIcon icon={getSortIcon('mobile')} />
                                </th>
                                <th onClick={() => sortData('budget')}>
                                    Budget <FontAwesomeIcon icon={getSortIcon('budget')} />
                                </th>
                                <th onClick={() => sortData('travelDate')}>
                                    Travel Date <FontAwesomeIcon icon={getSortIcon('travelDate')} />
                                </th>
                                <th onClick={() => sortData('numberOfPeople')}>
                                    Number of People <FontAwesomeIcon icon={getSortIcon('numberOfPeople')} />
                                </th>
                                <th onClick={() => sortData('interest')}>
                                    Interest <FontAwesomeIcon icon={getSortIcon('interest')} />
                                </th>
                                <th onClick={() => sortData('desiredLocations')}>
                                    Desired Locations <FontAwesomeIcon icon={getSortIcon('desiredLocations')} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredForms.map((form, index) => (
                                <tr key={index}>
                                    <td>{form.name}</td>
                                    <td>{form.email}</td>
                                    <td>{form.mobile}</td>
                                    <td>{form.budget}</td>
                                    <td>{form.travelDate}</td>
                                    <td>{form.numberOfPeople}</td>
                                    <td>{form.interest}</td>
                                    <td>{form.desiredLocations.join(', ')}</td>
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

export default Allforms;
