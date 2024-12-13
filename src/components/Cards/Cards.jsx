import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import styles from './Cards.Module.css';
function Cards() {
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
const [totalamout,setTotalamunt] = useState();

// console.log(totalamout); 
useEffect(() => {
    const fetchCounts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/countsofall`);
            setTotalamunt(response.data.totalAmount);
            setCounts(response.data);
            console.log(counts.totalAmount);
            // setTotalamunt(counts.totalAmount);

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
    // incrementCounts(totalamout, 'totalAmount');
}, [counts]);

  return (
    <div className="row ms-3 me-3">
          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 s">
            <div className={`${styles.card} ${styles.blue}`}>
              <div className={styles.title}>Total Bookings</div>
              <i className="zmdi zmdi-upload"></i>
              <div className={styles.value}>{displayCounts.bookingsCount}</div>
              <div className={styles.stat}>
              <a href="/starholadmin/allbookings" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className={`${styles.card} ${styles.green}`}>
              <div className={styles.title}>Package Request</div>
              <i className="zmdi zmdi-upload"></i>
              <div className={styles.value}>{displayCounts.packageRequestsCount}</div>
              <div className={styles.stat}>
              <a href="/starholadmin/allpackages" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className={`${styles.card} ${styles.orange}`}>
              <div className={styles.title}>Total Users</div>
              <i className="zmdi zmdi-download"></i>
              <div className={styles.value}>{displayCounts.usersCount}</div>
              <div className={styles.stat}>
              <a href="/starholadmin/allusers" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className={`${styles.card} ${styles.red}`}>
              <div className={styles.title}>Booking amount </div>
              <i className="zmdi zmdi-download"></i>
              <div className={styles.value}>Rs : {totalamout.toLocaleString('en-IN')}</div>
              <div className={styles.stat}>
              <a href="" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Cards