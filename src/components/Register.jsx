import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { auth } from '../firebase/firebase.init';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(password)) {
            return Swal.fire({
                icon: "error",
                title: "Invalid Password",
                html: `
                Password must have:
                <ul class="text-left mt-2">
                    <li> At least one uppercase letter</li>
                    <li> At least one lowercase letter</li>
                    <li> Minimum length of 6 characters</li>
                </ul>
            `,
            });
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log('after create', user)
                updateProfile(user, {
                    displayName: name,
                    photoURL: photoURL
                });
                // backend
                const newUser = {
                    name: name,
                    email: email,
                    image: photoURL,
                    googleUser: false
                }
                // database save
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after db_user save', data)
                        Swal.fire({
                            icon: "success",
                            title: "Registered Successfully!",
                            text: `Welcome, ${name}!`,
                            showConfirmButton: false,
                        }).then(() => {
                            form.reset();
                            navigate('/login')
                        });
                    })
            })
            .then(error => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: error
                });
            });

    }

    const handleTogglePasswordShow = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div className="card bg-base-300 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-16">
            <h1 className="text-5xl font-bold text-center my-8">Register now!</h1>
            <div className="card-body">
                <form onSubmit={handleRegister}>
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Name" />
                        <label className="label">Photo URL</label>
                        <input type="text" name='photoURL' className="input" placeholder="Photo URL" />
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <div className='relative'>
                            <label className="label">Password</label>
                            <input type={showPassword ? 'text' : 'password'} name='password' className="input" placeholder="Password" />
                            <button
                                onClick={handleTogglePasswordShow}
                                className="btn btn-xs bottom-2 right-6 absolute">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                        </div>
                        <button type='submit' className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                </form>
                <p>Haven't An Account? please <Link to='/login'><span className='text-primary'>Login</span></Link> </p>
            </div>
        </div>
    );
};

export default Register;