import React, { useState } from 'react';
import './components/styles.css';
import './components/membershipStyles.css';
import MembershipVoucher from './components/MembershipVoucher';

const Membership = () => {
  // State to manage form inputs and errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showVoucher, setShowVoucher] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  // Validate email
  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    if (!email.includes('@')) {
      return 'Email must contain @';
    }
    if (!email.endsWith('@gmail.com')) {
      return 'Email must end with @gmail.com';
    }
    return '';
  };

  // Validate name
  const validateName = (name) => {
    if (!name) {
      return 'Name is required';
    }
    if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
    return '';
  };

  // Validate password
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('register', '').toLowerCase();
    
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Validate field
    let error = '';
    switch (field) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'name':
        error = validateName(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistrationError('');
    setShowVoucher(false);
    
    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError
    });

    // If no errors, proceed with registration
    if (!nameError && !emailError && !passwordError) {
      try {
        const response = await fetch('http://localhost:5050/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log('Registration response:', data);

        if (data.success) {
          // Show voucher only after successful registration
          setShowVoucher(true);
          console.log('User registration successful:', data);
        } else {
          setRegistrationError(data.message || 'Registration failed. Please try again.');
          console.error('Registration failed:', data);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setRegistrationError('Registration failed. Please try again later.');
      }
    }
  };

  return (
    <div>
      <section className="auth-section container">
        <div className="row">
          <div className="col-md-8 col-lg-6 mb-4 mx-auto">
            <h3>Register For Membership</h3>
            {registrationError && (
              <div className="alert alert-danger" role="alert">
                {registrationError}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="registerName" className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="registerName"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="registerEmail"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="registerPassword"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </section>

      {showVoucher && (
        <MembershipVoucher 
          userData={formData}
          onClose={() => {
            setShowVoucher(false);
            setFormData({ name: '', email: '', password: '' });
          }}
        />
      )}

      <section className="membership container">
        <h2>Join the Arena Membership</h2>
        <p>The Arena also facilitates its valued customers with The Arena Exclusive membership. The Arena exclusive members can avail following benefits.</p>

        <h3>Join Arena Membership</h3>
        <ul>
          <li>Free Gift Vouchers</li>
          <li>Save big on Movie Tickets</li>
          <li>Discount at Concession Stand</li>
          <li>Discount on VIP Box</li>
          <li>Free Ticket Wednesday</li>
          <li>Exclusive Membership Counter</li>
          <li>Exclusive Red Carpet & Premiere Passes</li>
        </ul>

        <h3>Offers & Points</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>OFFERS</th>
                <th>POINTS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1 Free Ticket</td>
                <td>300</td>
              </tr>
              <tr>
                <td>2 Free Tickets</td>
                <td>400</td>
              </tr>
              <tr>
                <td>1 Free VIP Box</td>
                <td>800</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>Member Privilege</h4>
        <p>The Arena also provides Membership for their customers. Membership card holders will avail a number of benefits from The Arena. Members get discount offers at The Arena Cinema. Members can avail benefits like free ticket every Wednesday on buying a ticket by a friend or family, on-line ticket purchase, queue-free Members ticketing counter, weekly movie schedule via email and daily movie schedule via SMS, renewal reward, invitations on special screening, prepaid system-pay, and get special discounts on our international and national branding partners which includes:</p>
      </section>
    </div>
  );
};

export default Membership;