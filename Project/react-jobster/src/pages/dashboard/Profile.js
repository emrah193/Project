import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {FormRow} from "../../components";
import {updateUser} from "../../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const {isLoading, user} = useSelector((store) => store.user);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, lastName, email, location} = userData;
    if (!name || !lastName || !email || !location) {
      toast.error("please fill out all fields");
      return;
    }
    dispatch(updateUser(userData));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]: value});
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
