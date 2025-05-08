import Swal from "sweetalert2";

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
            sessionStorage.removeItem("token")
            navigate('/')
        }
    })
};