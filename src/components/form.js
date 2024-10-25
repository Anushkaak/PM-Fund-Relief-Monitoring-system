import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Web3 from 'web3';
import { QRCodeCanvas } from 'qrcode.react';
import DonationContractData from './DonationContract.json'; // Ensure proper ABI import
import '../assets/form.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Form = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [donationAmount, setDonationAmount] = useState('');

  const dbref = collection(db, 'userInfo');

  // MetaMask connection and transaction logic
  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('MetaMask account:', accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error('User denied MetaMask access:', error);
        alert('MetaMask connection was denied');
      }
    } else {
      alert('MetaMask not detected! Please install MetaMask.');
    }
  };

  const sendDonation = async () => {
    const account = await connectToMetaMask();
    if (account) {
      const web3 = new Web3(window.ethereum);  // Initialize web3 with MetaMask provider
      const contractAddress = '0xC07B21594e3cFD9a0a9F90908c949ec7294A61C9';  // Replace with your deployed contract address
      const donationContract = new web3.eth.Contract(DonationContractData.abi, contractAddress);  // Use .abi to access the ABI

      try {
        const tx = await donationContract.methods.donate().send({
          from: account,
          value: web3.utils.toWei(donationAmount, 'ether')  // Convert Ether to Wei
        });

        if (tx.status) {
          alert('Donation successful!');
        } else {
          alert('Donation failed!');
        }
      } catch (error) {
        console.error('Transaction failed:', error);
        alert('Transaction failed: ' + error.message);
      }
    }
  };

  const send = async (e) => {
    e.preventDefault();  // Prevent default form submission

    if (!name || !email || !address || !phone || !donationAmount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Add data to Firestore
      await addDoc(dbref, {
        Name: name,
        Email: email,
        Address: address,
        Phone: phone,
        PaymentMethod: paymentMethod,
        DonationAmount: donationAmount
      });
      alert("Data Added successfully");

      // After adding data to Firestore, send the donation via MetaMask
      await sendDonation();

      // Clear the form fields after submission
      setName('');
      setEmail('');
      setAddress('');
      setPhone('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setBankAccountNumber('');
      setIfscCode('');
      setDonationAmount('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding data to database: " + error.message);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className='container'>
      <div className='form'>
        <h2>Donation Form</h2>
        <form onSubmit={send}>
          <div className='box'>
            <input type='text' value={name} placeholder='Name' autoComplete='off' onChange={(e) => setName(e.target.value)} />
            <input type='email' value={email} placeholder='Email' autoComplete='off' onChange={(e) => setEmail(e.target.value)} />
            <input type='text' value={address} placeholder='Address' autoComplete='off' onChange={(e) => setAddress(e.target.value)} />
            <input type='text' value={phone} placeholder='Phone Number' autoComplete='off' onChange={(e) => setPhone(e.target.value)} />
            <input type='text' value={donationAmount} placeholder='Donation Amount (in Ether)' autoComplete='off' onChange={(e) => setDonationAmount(e.target.value)} />

            {/* Payment Method Selection */}
            <div className='payment-method'>
              <label>
                <input type='radio' value='UPI' checked={paymentMethod === 'UPI'} onChange={() => handlePaymentMethodChange('UPI')} />
                UPI
              </label>
              <label>
                <input type='radio' value='Card' checked={paymentMethod === 'Card'} onChange={() => handlePaymentMethodChange('Card')} />
                Credit/Debit Card
              </label>
              <label>
                <input type='radio' value='Bank Transfer' checked={paymentMethod === 'Bank Transfer'} onChange={() => handlePaymentMethodChange('Bank Transfer')} />
                Bank Transfer
              </label>
            </div>

            {/* Conditional Rendering based on Payment Method */}
            {paymentMethod === 'UPI' && (
              <div className='payment-confirmation'>
                <h3>Scan the QR Code for Donation</h3>
                <QRCodeCanvas value="upi://pay?pa=pratikshakhemnar164@oksbi&pn=Pratiksha%20Khemnar&aid=uGICAgMC8oLuEEw" size={128} />
              </div>
            )}

            {paymentMethod === 'Card' && (
              <div className='credit-card-details'>
                <h3>Credit/Debit Card Details</h3>
                <input type='text' value={cardNumber} placeholder='Card Number' autoComplete='off' onChange={(e) => setCardNumber(e.target.value)} />
                <input type='text' value={expiryDate} placeholder='Expiry Date (MM/YY)' autoComplete='off' onChange={(e) => setExpiryDate(e.target.value)} />
                <input type='text' value={cvv} placeholder='CVV' autoComplete='off' onChange={(e) => setCvv(e.target.value)} />
              </div>
            )}

            {paymentMethod === 'Bank Transfer' && (
              <div className='bank-transfer-details'>
                <h3>Bank Transfer Details</h3>
                <input type='text' value={bankAccountNumber} placeholder='Account Number' autoComplete='off' onChange={(e) => setBankAccountNumber(e.target.value)} />
                <input type='text' value={ifscCode} placeholder='IFSC Code' autoComplete='off' onChange={(e) => setIfscCode(e.target.value)} />
              </div>
            )}

            <button type='submit'>Submit</button>
            <button type='button' onClick={() => navigate('/')}>Back to Home</button> {/* Button to go back */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

