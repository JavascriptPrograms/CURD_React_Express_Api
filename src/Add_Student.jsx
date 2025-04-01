import { useState  } from "react";
import axios from 'axios';

const Add_Student = () => {
  const [roll_number, setRollNumber] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      roll_number: roll_number,
      first_name: first_name,
      last_name: last_name,
      email : email,
      phone_number: phone_number,
      address: address,
    }
    // console.log(data);
    try{
      const response = axios.post('http://localhost:8000/add_student', data);
      console.log(response);
      setRollNumber("");
      setFirstName("");
      setLastName(""); 
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      alert("Student Added Successfully");
      window.location.reload();
    }
    catch(error){
      console.error('Error posting data:', error);
      alert('Error saving data');
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h3 className="text-danger text-center mt-5">Add Student</h3>
          <form method="post" onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
              <label forhtml="email" className="form-label">
                Roll Number:
              </label>
              <input
                type="text"
                className="form-control"
                id="roll_number"
                placeholder="Enter Roll Number"
                name="roll_number"
                value={roll_number}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label forhtml="email" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                placeholder="Enter First Name"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label forhtml="last_name" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Enter Last Name"
                name="last_name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label forhtml="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label forhtml="phone_number" className="form-label">
                Phone Number:
              </label>
              <input
                type="number"
                className="form-control"
                id="phone_number"
                placeholder="Enter Phone Number"
                name="phone_number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label forhtml="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter the Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </div>
          </form>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
};
export default Add_Student;
