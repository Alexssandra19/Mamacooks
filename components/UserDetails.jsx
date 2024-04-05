import React, { useEffect, useState, Component } from 'react';
import Page from "./NavBar.jsx";
import Footer from './Footer.jsx';
import User from '../models/user.js';

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          isEditMode: false,
          userId: '65cff7edc8629ae342cf24d2'
        };
      }
      
      componentDidMount() {
        this.fetchUserData();
      }

      handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
      };
    
    toggleEditMode = async (event) => {
        event.preventDefault();
        if (!this.state.isEditMode) {
            this.setState(prevState => ({
                isEditMode: !prevState.isEditMode
            }));
        } else {
            // Prepare form data
            const formData = {
                _id: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email
            };

            try {
                // Make HTTP request to your backend API
                const response = await fetch(`/api/user/${this.state.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // Check if request was successful
                if (response.ok) {
                    // Handle success
                    alert('User data updated successfully');
                } else {
                    // Handle failure
                    alert('Failed to update user data');
                    console.error('Failed to update user data');
                }
            } catch (error) {
                alert('Failed to update user data');
                console.error('Failed to update user data:', error);
            }
        }
    };

      fetchUserData = async () => {
        try {
          const response = await fetch(`/api/user/${this.state.userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const userDetails = await response.json();
          console.log(userDetails);
          const userInfo = new User(userDetails.data);
          this.setState({firstName: userInfo.firstName, lastName: userInfo.lastName, phoneNumber: userInfo.phoneNumber, email: userInfo.email})
          console.log(userInfo);
        } catch (error) {
          alert('Failed to get User data');
          console.error('Failed to get User data:', error);
        }
      };

      render() {
        const { firstName, lastName, phoneNumber, email, isEditMode } = this.state;
        return (
          <div>
            <Page />
            <form name="userForm" className="form-box" method="POST" action="/user/edit">
            <div className="form-group">
              <label htmlFor="fname">First Name: </label>
              {isEditMode ? (
                <input type="text" id="firstName" name="firstName" value={firstName} onChange={this.handleInputChange} required />
              ) : (
                <span>{firstName}</span>
              )}
            </div>
    
            <div className="form-group">
              <label htmlFor="lname">Last Name: </label>
              {isEditMode ? (
                <input type="text" id="lastName" name="lastName" value={lastName} onChange={this.handleInputChange} required />
              ) : (
                <span>{lastName}</span>
              )}
            </div>
    
            <div className="form-group">
              <label htmlFor="pnum">Phone Number: </label>
              {isEditMode ? (
                <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={this.handleInputChange} required />
              ) : (
                <span>{phoneNumber}</span>
              )}
            </div>
    
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              {isEditMode ? (
                <input type="email" id="email" name="email" value={email} onChange={this.handleInputChange} required />
              ) : (
                <span>{email}</span>
              )}
            </div>
    
            <button onClick={this.toggleEditMode}>{isEditMode ? 'Save' : 'Edit'}</button>
            </form>
            <footer>
          <Footer />
          </footer>
          </div>
        );
      }
}

export default UserDetails;