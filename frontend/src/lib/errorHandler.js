import { toast } from 'react-toastify';

function errorHandler(errorText) {
  console.log('Error: ', errorText);
  toast.error(errorText, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export { errorHandler };
