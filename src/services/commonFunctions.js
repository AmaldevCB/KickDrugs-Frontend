import axios from "axios";
import Swal from "sweetalert2";
import { serverUrl } from "./serverUrl";

export const logout = (navigate) => {

    Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'No, Cancel',
        background: 'white',
        confirmButtonColor: 'red',
        cancelButtonColor: 'green'
    }).then((result) => {
        if (result.isConfirmed) {
           axios.get(`${serverUrl}/logout`, { withCredentials: true })
                .then(() => {
                    sessionStorage.removeItem("token");
                    navigate('/');
                })
                .catch(() => {
                    Swal.fire('Error', 'Logout failed', 'error');
                })
        }
    })
};