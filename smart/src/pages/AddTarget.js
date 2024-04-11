import React, { useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
export default function AddTarget(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.post('http://127.0.0.1:5000/addtarget', inputs).then(function(response){
            console.log(response.data);
            navigate('/targets');
        });
          
    }
     
    return (
    <div>
        <div className="container h-100">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                <h1>Add Target</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>Quarter</label>
                      <input type="number" className="form-control" name="trimestre" min = '1' max = '4' onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label>Year</label>
                      <input type="number" className="form-control" name="year" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label>Target</label>
                      <input type="number" className="form-control" name="target" onChange={handleChange} />
                    </div>   
                    <button type="submit" name="add" className="btn btn-primary">Save</button>
                </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    </div>
  );
}