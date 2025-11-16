import React, { use, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const { signInWithGoogle, signInUser } = use(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        signInUser(email, password)
            .then(result => {
                const loggedUser = {
                    name: result.user.displayName || '',
                    email: result.user.email || '',
                    image: result.user.photoURL || '',

                }

                // save db
                fetch("http://localhost:3000/users", {
                    method: 'POST',
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify(loggedUser)
                })
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                });
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Login Failed!",
                    text: "Incorrect email or password!",
                });
            });

    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                    googleUser: true
                }

                //create  user in the database
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Google Login Successful!",
                        });
                    })


            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Google Login Failed!",
                });
            })
    }

    const handleTogglePasswordShow = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (

        <div className="card bg-base-200 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-16">
            <h1 className="text-5xl font-bold text-center my-8">Login now!</h1>
            <div className="card-body">
                <form onSubmit={handleLogin}>
                    <fieldset className="fieldset">
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
                        <button type='submit' className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>
                <p>Haven't Any Account? please <Link to='/register'><span className='text-primary'>Register</span></Link> </p>
                {/* Google */}
                <button
                    onClick={handleGoogleSignIn}
                    className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>
        </div>

    );
};

export default Login;