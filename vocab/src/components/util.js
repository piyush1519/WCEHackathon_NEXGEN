import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: "bottom-center",
        
    });
}

export const handleFailure = (msg) => {
    toast.error(msg, {
        position: "bottom-center",
        
    });
}
