import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './VehDet.css'; // Import the CSS file for styling
import { useLocation } from 'react-router-dom';

const VehDet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginId } = location.state; // Retrieve the loginId from the location state
  //Vehicle Aspects
  const [categoryId, setCategoryId] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleEngineNumber, setVehicleEngineNumber] = useState('');
  const [vehicleChasisNumber, setVehicleChasisNumber] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [dateOfRegistration, setDateOfRegistration] = useState('');
  const [registrationValidity, setRegistrationValidity] = useState('');
  const [dateOfPurchase, setDateOfPurchase] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  // Price Aspects
  const [initialAmount, setInitialAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [totalYears, setTotalYears] = useState('');
  const [dateOfEMI, setDateOfEMI] = useState('');
  const [emiAmount, setEmiAmount] = useState('');
  // Insurance Aspects
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [insuranceNo, setInsuranceNo] = useState('');
  const [dateOfInsurance, setDateOfInsurance] = useState('');
  const [insuranceAmount, setInsuranceAmount] = useState('');

  const [userData, setUserData] = useState({
    loginId: '',
    login_user_name: '',
    login_short_name: '',
    login_email: '',
    login_mno: '',
    login_dob: '',
    login_address: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/sdetuser/${loginId}`);
        const userData = response.data;
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [loginId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission logic here
    const response = await fetch('http://localhost:8080/api/vehdet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login_id: loginId, // Use 'password' for login_password
        category_id: categoryId, // Use 'userShortName' for login_password
        veh_brand: vehicleBrand, // Use 'email' for login_password
        veh_model: vehicleModel, // Use 'mobileNumber' for login_password
        veh_engno: vehicleEngineNumber, // Use 'address' for login_password
        veh_chasisno: vehicleChasisNumber, // Use 'address' for login_password
        fuel_type_id: fuelType, // Use 'address' for login_password
        regis_no: registrationNumber, // Use 'address' for login_password
        regis_date: dateOfRegistration, // Use 'address' for login_password
        regis_validity: registrationValidity, // Use 'address' for login_password
        purchase_date: dateOfPurchase, // Use 'address' for login_password
        purchase_amt: purchaseAmount, // Use 'address' for login_password
        initial_amount: initialAmount,
        loan_amount: loanAmount,
        total_years: totalYears,
        date_of_emi: dateOfEMI,
        emi_amount: emiAmount,
        insurance_company: insuranceCompany,
        insurance_no: insuranceNo,
        date_of_insurance: dateOfInsurance,
        insurance_amount: insuranceAmount,
      }),
    });
    console.log(response)
    if (response.ok) {
      console.log("Inside reponseLogin)")
  
      const data = await response.json();
      const { veh_id } = data;
      
      // Display an alert with the login_id
      alert(`Vehicle Registered successful! Your Vehicle ID is: ${veh_id}`);
      //alert(`Vehicle Registered successful! Your Vehicle ID is: ${veh_id} having Loan Amount of ${loan_amt} with EMI amount of ${emi_amt} `);
    navigate('/');
    } else {
      console.log("Inside ELSE)")

      // If login fails, display an error message
      alert('Vehicle Details already exists!');
    }
  } catch (error) {
    console.error('Error entering Vehicle Details:', error);
  }
};

  return (
    <div>
      <div className="vehicle-management-container">
      <h2 className="vehicle-management-header">Customer Aspects</h2>
      <form className="vehicle-management-form" onSubmit={handleSubmit}>
        {/* Login ID */}
        <div className="form-group">
          <label className="submit-label" htmlFor="loginId">Login ID:</label>
          <input className="submit-input" 
            type="text"
            id="loginId"
            value={loginId}
            readOnly
          />
        </div>

        {/* Username */}
        <div className="form-group">
          <label className="submit-label" htmlFor="username">Username:</label>
          <input className="submit-input" 
            type="text"
            id="username"
            value={userData.login_user_name}
            readOnly
          />
        </div>

        <div className="form-group">
          <label className="submit-label" htmlFor="shortName">Short Name:</label>
          <input className="submit-input" 
            type="text"
            id="shortName"
            value={userData.login_short_name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="email">Email:</label>
          <input className="submit-input" 
            type="email"
            id="email"
            value={userData.login_email}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="mobileNumber">Mobile Number:</label>
          <input className="submit-input" 
            type="tel"
            id="mobileNumber"
            value={userData.login_mno}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="dob">Date of Birth:</label>
          <input className="submit-input" 
            type="text"
            id="dob"
            value={userData.login_dob}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={userData.login_address}
            readOnly
            style={{ width: '70%', minHeight: '100px' }}
          />
        </div>

        <h2 className="vehicle-management-header">Vehicle Aspects</h2>
        {/* Category of Vehicle */}
        <div className="form-group">
          <label className="submit-label" htmlFor="categoryId">Category of Vehicle:</label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="1">Car</option>
            <option value="2">Bus</option>
            <option value="3">Auto</option>
            <option value="4">Bike</option>
            <option value="5">Tempo</option>
            <option value="6">Lorry</option>
          </select>
        </div>

        {/* Vehicle Brand */}
        <div className="form-group">
          <label className="submit-label" htmlFor="vehicleBrand">Vehicle Brand:</label>
          <input className="submit-input" 
            type="text"
            id="vehicleBrand"
            value={vehicleBrand}
            onChange={(e) => setVehicleBrand(e.target.value)}
            required
          />
        </div>

        {/* Vehicle Model */}
        <div className="form-group">
          <label className="submit-label" htmlFor="vehicleModel">Vehicle Model:</label>
          <input className="submit-input" 
            type="text"
            id="vehicleModel"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
          />
        </div>

        {/* Vehicle Engine Number */}
        <div className="form-group">
          <label className="submit-label" htmlFor="vehicleEngineNumber">Vehicle Engine Number:</label>
          <input className="submit-input" 
            type="text"
            id="vehicleEngineNumber"
            value={vehicleEngineNumber}
            onChange={(e) => setVehicleEngineNumber(e.target.value)}
            required
          />
        </div>

        {/* Vehicle Chassis Number */}
        <div className="form-group">
          <label className="submit-label" htmlFor="vehicleChasisNumber">Vehicle Chassis Number:</label>
          <input className="submit-input" 
            type="text"
            id="vehicleChasisNumber"
            value={vehicleChasisNumber}
            onChange={(e) => setVehicleChasisNumber(e.target.value)}
            required
          />
        </div>

        {/* Fuel Type */}
        <div className="form-group">
          <label className="submit-label" htmlFor="fuelType">Fuel Type:</label>
          <select
            id="fuelType"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            required
          >
            <option value="">Select Fuel Type</option>
            <option value="1">Petrol</option>
            <option value="2">Diesel</option>
            <option value="3">EV (Electric Vehicle)</option>
          </select>
        </div>
        
        {/* Vehicle Registration Number */}
        <div className="form-group">
          <label className="submit-label" htmlFor="registrationNumber">Vehicle Registration Number:</label>
          <input className="submit-input" 
            type="text"
            id="registrationNumber"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
          />
        </div>

        {/* Date of Registration */}
        <div className="form-group">
          <label className="submit-label" htmlFor="dateOfRegistration">Date of Registration:</label>
          <input className="submit-input" 
            type="date"
            id="dateOfRegistration"
            value={dateOfRegistration}
            onChange={(e) => setDateOfRegistration(e.target.value)}
            required
          />
        </div>

        {/* Registration Validity */}
        <div className="form-group">
          <label className="submit-label" htmlFor="registrationValidity">Registration Validity:</label>
          <input className="submit-input" 
            type="date"
            id="registrationValidity"
            value={registrationValidity}
            onChange={(e) => setRegistrationValidity(e.target.value)}
            required
          />
        </div>

        {/* Date of Purchase */}
        <div className="form-group">
          <label className="submit-label" htmlFor="dateOfPurchase">Date of Purchase:</label>
          <input className="submit-input" 
            type="date"
            id="dateOfPurchase"
            value={dateOfPurchase}
            onChange={(e) => setDateOfPurchase(e.target.value)}
            required
          />
        </div>

        {/* Purchase Amount */}
        <div className="form-group">
          <label className="submit-label" htmlFor="purchaseAmount">Purchase Amount:</label>
          <input className="submit-input" 
            type="text"
            id="purchaseAmount"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            required
          />
        </div>

      {/* Price Aspects */}
      <h2 className="vehicle-management-header">Price Aspects</h2>
        <div className="form-group">
          <label className="submit-label" htmlFor="initialAmount">Initial Amount:</label>
          <input
            type="text"
            id="initialAmount"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="loanAmount">Loan Amount:</label>
          <input
            type="text"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="totalYears">Total Years:</label>
          <select
            id="totalYears"
            value={totalYears}
            onChange={(e) => setTotalYears(e.target.value)}
            required
          >
            <option value="">Select Total Years</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
          </select>
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="dateOfEMI">Date of EMI:</label>
          <input
            type="date"
            id="dateOfEMI"
            value={dateOfEMI}
            onChange={(e) => setDateOfEMI(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="emiAmount">EMI Amount:</label>
          <input
            type="text"
            id="emiAmount"
            value={emiAmount}
            onChange={(e) => setEmiAmount(e.target.value)}
            required
          />
        </div>

        {/* Insurance Aspects */}
        <h2 className="vehicle-management-header">Insurance Aspects</h2>
        <div className="form-group">
          <label className="submit-label" htmlFor="insuranceCompany">Insurance Company:</label>
          <input
            type="text"
            id="insuranceCompany"
            value={insuranceCompany}
            onChange={(e) => setInsuranceCompany(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="insuranceNo">Insurance No:</label>
          <input
            type="text"
            id="insuranceNo"
            value={insuranceNo}
            onChange={(e) => setInsuranceNo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="dateOfInsurance">Date of Insurance:</label>
          <input
            type="date"
            id="dateOfInsurance"
            value={dateOfInsurance}
            onChange={(e) => setDateOfInsurance(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="submit-label" htmlFor="insuranceAmount">Insurance Amount:</label>
          <input
            type="text"
            id="insuranceAmount"
            value={insuranceAmount}
            onChange={(e) => setInsuranceAmount(e.target.value)}
            required
          />
        </div>
        
        {/* Submit button */}
        <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
    </div>
  );
};

export default VehDet;
