import React from 'react';
import './voucherStyles.css';

// Utility function to get correct image path for GitHub Pages
const getImagePath = (imageName) => {
  return `/cinepax-booking-system/images/${imageName}`;
};

const MembershipVoucher = ({ userData, onClose }) => {
  const voucherNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
  const currentDate = new Date().toLocaleDateString();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // Voucher valid for 7 days

  return (
    <div className="voucher-overlay">
      <div className="voucher-container">
        <button className="voucher-close" onClick={onClose}>×</button>
        <div className="voucher-content">
          <div className="voucher-header">
            <img src={getImagePath('image1.jpg')} alt="The Arena Logo" className="voucher-logo" />
            <h2>Membership Registration Voucher</h2>
          </div>
          
          <div className="voucher-details">
            <div className="voucher-info">
              <p><strong>Voucher Number:</strong> {voucherNumber}</p>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Issue Date:</strong> {currentDate}</p>
              <p><strong>Valid Until:</strong> {expiryDate.toLocaleDateString()}</p>
            </div>

            <div className="membership-fee">
              <h3>Membership Fee</h3>
              <div className="fee-amount">Rs. 2,500</div>
              <p className="fee-note">* Valid for one year from activation</p>
            </div>

            <div className="voucher-instructions">
              <h4>Instructions:</h4>
              <ol>
                <li>Present this voucher at any Arena Cinema location</li>
                <li>Pay the membership fee at the counter</li>
                <li>Receive your official membership card</li>
                <li>This voucher is valid for 7 days from the issue date</li>
              </ol>
            </div>
          </div>

          <div className="voucher-footer">
            <div className="barcode">
              {voucherNumber}
            </div>
            <button className="print-button" onClick={() => window.print()}>
              Print Voucher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipVoucher; 