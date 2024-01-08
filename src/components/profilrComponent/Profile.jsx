import axios from "axios";
import { useEffect, useState } from "react";
import { useParams ,Link} from "react-router-dom";
//import { useHistory} from "react-router";
import WatchComponent from "./Clock";
import CountryDropdown from "./CountryDropdown";
import PostComponent from "./Post";
import "./styles/profile.css";

const UserProfile = () => {
  //const { pathname } = useLocation();
  //const history = useHistory();
  const [timezone, setTimezone] = useState("Africa/Abidjan"); // Default timezone
  const { id } = useParams();
  const [userData, setUserData] = useState({});


  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

//   const goToListingPage = () => {
//     /* go back to listing page */
//     history.push({
//         pathname: pathname.replace(/\/profile.*/, ""),
//     });
// };

  return (
    <div className="detail-page">
      <div className="user-detail-header">
        <Link to={`/`}>Back</Link> 
        <div className="counter-watch-wrapper">
            <CountryDropdown setZone={setTimezone} />
            <WatchComponent timezone={timezone} />
        </div>
        
        
      </div>
      
      <div className="user-profile">
        <div className="user-info">
          <div>Name: {userData.name || "dummy data"}</div>

          <div >
              <div>Address: {userData.address?.street || "dummy data"},{userData.address?.suite || "dummy data"},{userData.address?.city || "dummy data"},{userData.address?.zipcode || "dummy data"}</div>
          </div> 
        </div>
        <div>
          <div className="user-info">
              <div >
                <div>UserName: {userData.username || "dummy data"}</div>
                <div>CatchPhrase: {userData.company?.catchPhrase || "dummy data"}</div>
              </div>
              <div>
                <div>email: {userData.email || "dummy data"}</div>
                <div>phone: {userData.phone || "dummy data"}</div>
              </div>
          </div>
        </div>
      </div>
      <PostComponent />
    </div>
  );
};

export default UserProfile;
