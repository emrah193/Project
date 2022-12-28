import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterPage";
import {Logo, FormRow} from "../components";
import {loginUser, registerUser} from "../features/user/userSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const {user, isLoading} = useSelector((store) => store.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prev) => {
      return {...prev, [e.target.name]: e.target.value};
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({email, password}));
      return;
    }
    dispatch(registerUser({name, email, password}));
  };

  const toggleMember = () => {
    setValues((prev) => {
      return {...prev, isMember: !prev.isMember};
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button disabled={isLoading} type="submit" className="btn btn-block">
          {isLoading ? "Loading..." : "submit"}
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            dispatch(
              loginUser({email: "testUser@test.com", password: "secret"})
            );
          }}
          className="btn btn-block btn-hipster"
        >
          {isLoading ? "Loading..." : "Demo app"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already have an account?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
