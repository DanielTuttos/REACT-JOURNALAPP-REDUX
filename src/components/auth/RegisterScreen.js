import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { setError, RemoveError } from '../../actions/uiAction';
import { startRegisterWithEmailPasswordName } from '../../actions/authAction';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);


    const initialState = {
        name: 'Daniel',
        email: 'romerito@gmail.com',
        password: '123456',
        password2: '123456'
    }


    const [formValues, handleChange] = useForm(initialState);

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }
        dispatch(RemoveError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form
                class="animate__animated animate__fadeIn animate__faster"
                onSubmit={handleRegister}

            >

                {msgError &&
                    (<div className="auth__alert-error">{msgError}</div>)
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    className="auth__input"
                    autoComplete="off"
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="auth__input"
                    autoComplete="off"
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="auth__input"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={handleChange}
                    className="auth__input"
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>

            </form>
        </>
    )
}
