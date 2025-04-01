import React, { useState , useEffect} from "react";
import axios from "axios";

const Show_Student = () => {
  const [showModal, setShowModal] = useState(false);
  const [cutrrentStudent, setCurrentStudent] = useState({
    roll_number: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const [student, setStudent] = useState([]);
  const [page,setPage] = useState(1);
  const [total,setTotal] = useState(0);
  const [limit] = useState(3);

  useEffect(() => {
      fetch(`http://localhost:8000/student?page=${page}&limit=${limit}`)
          .then((res) => res.json())
          .then((data) => {
              // console.log(data.students);
              setStudent(data.students);
              // console.log(data.totalStudent)
              setTotal(data.totalStudent);
          })
          .catch((err) => {
              console.log(err);
          });
  });

  const handlePrevPage = () =>{
    if(page>1){
      setPage(page - 1)
    }
  }

  const handleNextPage = () =>{
    if(page <Math.ceil(total/limit)){
      setPage(page+1)
    }
  }

  const handleEdit = (data) => {
    setCurrentStudent(data);
    setShowModal(true);
  };
  const handleUpdate = () => {
    axios
      .put(`http://localhost:8000/update_student/${cutrrentStudent.roll_number}`, cutrrentStudent)
      .then((response) => {
        console.log(response);
        alert("Student Updated Successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Error updating data");
      });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({
      ...cutrrentStudent,
      [name]: value,
    });
  }

  const handleDelete = (roll_number) => {
    console.log(roll_number);
    axios
      .delete(`http://localhost:8000/delete_student/${roll_number}`)
      .then((response) => {
        console.log(response);
        alert("Student Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        alert("Error deleting data");
      });
    window.location.reload();
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="text-center mt-5">Show Student</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {student.map((s) => (
                <tr key={s.roll_number}>
                  <td>{s.roll_number}</td>
                  <td>{s.first_name}</td>
                  <td>{s.last_name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone_number}</td>
                  <td>{s.address}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(s)}
                      className="btn btn-success btn-sm"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(s.roll_number)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handlePrevPage} disabled={page === 1} className="btn btn-primary btn-sm"> Previous</button>
            <span>Page {page} of {Math.ceil(total/limit)}</span>
            <button onClick={handleNextPage} disabled={page === Math.ceil(total/limit)} className="btn btn-primary btn-sm">Next</button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal show fade"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Student</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form>
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
                      value={cutrrentStudent.first_name}
                      onChange={handleChange}
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
                      value={cutrrentStudent.last_name}
                      onChange={handleChange}
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
                      value={cutrrentStudent.email}
                      onChange={handleChange}
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
                      value={cutrrentStudent.phone_number}
                      onChange={handleChange}
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
                      value={cutrrentStudent.address}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary btn-sm w-100"
                  onClick={handleUpdate}
                >
                  Updated
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Show_Student;
