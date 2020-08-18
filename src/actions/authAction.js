import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';

import { types } from "../types/types";
import { startLoading, finishLoading } from './uiAction';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch(e => {
                dispatch(finishLoading());
                Swal.fire('Error', e.message, 'error');
            });
    }
}

// registrar con usuario y contraseña
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                Swal.fire('Error', e.message, 'error');
            });
    }
}

//iniciar Sesion con google
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            });
    }
}

// dispatch para hacer login 
export const login = (uid, displayName) => ({

    type: types.login,
    payload: {
        uid,
        displayName
    }

});

export const startLogout = () => {
    return async (dispatch) => {
        try {
            await firebase.auth().signOut();
            dispatch(logout());
        } catch (error) {
            console.log(error);
        }

    }
}

// dispatch para hacer logout
export const logout = () => ({
    type: types.logout
});