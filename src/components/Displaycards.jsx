import React, { useState, useEffect } from "react";
import axios from 'axios';
import { baseUrl } from '../baseUrl';

function Displaycards() {
    const [counts, setCounts] = useState({
        bookingsCount: 0,
        usersCount: 0,
        packageRequestsCount: 0,
        totalAmount: 0
    });

    const [displayCounts, setDisplayCounts] = useState({
        bookingsCount: 0,
        usersCount: 0,
        packageRequestsCount: 0,
        totalAmount: 0
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/countsofall`);
                setCounts(response.data);
            } catch (error) {
                console.error("Error fetching counts", error);
            }
        };

        fetchCounts();
    }, []);

    useEffect(() => {
        const incrementCounts = (target, key) => {
            let count = 0;
            const increment = target / 50; // Adjust this value to change the speed of the animation
            const interval = setInterval(() => {
                count += increment;
                if (count >= target) {
                    clearInterval(interval);
                    setDisplayCounts(prev => ({ ...prev, [key]: target }));
                } else {
                    setDisplayCounts(prev => ({ ...prev, [key]: Math.floor(count) }));
                }
            }, 20); // Adjust this value to change the speed of the animation
        };

        incrementCounts(counts.bookingsCount, 'bookingsCount');
        incrementCounts(counts.usersCount, 'usersCount');
        incrementCounts(counts.packageRequestsCount, 'packageRequestsCount');
        incrementCounts(counts.totalAmount, 'totalAmount');
    }, [counts]);

    return (
        <>
            <div className="row">
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{displayCounts.bookingsCount}</h3>
                            <p>Bookings</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag" />
                        </div>
                        <a href="/allbookings" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{displayCounts.packageRequestsCount}<sup style={{ fontSize: 20 }}></sup></h3>
                            <p>Forms</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                        <a href="/allforms" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{displayCounts.usersCount}</h3>
                            <p>User Registrations</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                        <a href="/allusers" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-danger">
                        <div className="inner ">
                            <h3 className="amt">Rs:{displayCounts.totalAmount}</h3>
                            <p>Total Earnings</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                        <a href="/totalearnings" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Displaycards;
