import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WatchComponent from "./Clock";
import CountryDropdown from "./CountryDropdown";
import PostComponent from "./Post";

const UserProfile = () => {
  const [timezone, setTimezone] = useState("Africa/Abidjan"); // Default timezone
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  return (
    <div>
      <div>
        <p>name: {userData.name || "dummy data"}</p>
        {/* Access address properties individually */}
        <p>street: {userData.address?.street || "dummy data"}</p>
        <p>suite: {userData.address?.suite || "dummy data"}</p>
        <p>city: {userData.address?.city || "dummy data"}</p>
        <p>zipcode: {userData.address?.zipcode || "dummy data"}</p>
        <p>Latitude: {userData.address?.geo?.lat || "dummy data"}</p>
        <p>Longitude: {userData.address?.geo?.lng || "dummy data"}</p>
        {/* Other user details */}
        <p>email: {userData.email || "dummy data"}</p>
        <p>phone: {userData.phone || "dummy data"}</p>
      </div>
      <WatchComponent timezone={timezone} />
      <CountryDropdown setZone={setTimezone} />
      <PostComponent />
    </div>
  );
};

export default UserProfile;
