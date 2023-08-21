import React, { useState } from 'react';
import "./style.css"
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';
import { useNavigate } from 'react-router-dom';


function Register({onToggle}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigate();



    const handleUserCreation = async (event) => {
        event.preventDefault();

        if (!name || !confirmPassword || !password || !email) {
            setError('All fields are required');
            return;
        }

        try {
            if (password === confirmPassword) {
                const response = await sendRequest({
                    route: "/guest/register",
                    method: requestMethods.POST,
                    body:{
                        name,
                        email,
                        password,
                    }
                });
                console.log(response)
                setName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                navigation("/");

            }
        } catch (error) {
            console.error('failed:', error);
        }
    };

    return (
            <div className="create-form-container">
                <div className="form-header">
                    <h1>
                        Create Account
                    </h1>
                </div>

                <form className="create-form ">

                        <div className="label-input">
                            <label htmlFor="name">Name </label>
                            <input id="name" name="name" type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>


                        <div className="label-input">
                            <label htmlFor="email">Email </label>
                            <input id="email" name="email" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="password">Password </label>
                            <input id="password" name="password" type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="check-password">Confirm</label>
                            <input id="check-password" name="check-password" type="password" required placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) }/>
                        </div> 

                        {error && <p className="error-message">{error}</p>}


                    <button className='black-button' type="submit" onClick={handleUserCreation}>Create</button>
                </form>


                <div className="bottom-form">
                    <p>Already have an account?</p>
                    <span className='create-toggle' onClick={() => onToggle(false)}>Login</span>
                </div>
            </div>
    )
}

export default Register