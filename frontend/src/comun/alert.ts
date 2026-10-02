import Swal from 'sweetalert2';

// Planilla reutilizable
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});
// Función reutilizable
export const alertWarning = (mensaje: string): void => {
  Toast.fire({
    icon: 'warning',
    title: 'Atención',
    text: mensaje,
    background: '#fff3cd',
    color: '#856404'
  });
};
//
export const alertSuccess = (mensaje: string): void => {
  Toast.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: mensaje,
    background: '#d4edda',
    color: '#155724'
  });
};
//
export const alertError = (mensaje: string): void => {
  Toast.fire({
    icon: 'error',
    title: 'Error',
    text: mensaje,
    background: '#f8d7da',
    color: '#721c24'
  });
};
