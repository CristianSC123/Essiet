import React from 'react';
import Swal from 'sweetalert2';

function EliminarTecnico({ handleDeleteTecnico, tecnicoId }) {
  const handleDeleteWithConfirmation = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteTecnico(tecnicoId);
        Swal.fire('Eliminado!', 'El técnico ha sido eliminado.', 'success');
      }
    });
  };

  return (
    <button
      className="btn bg-red-500"
      onClick={handleDeleteWithConfirmation}
    >
      Eliminar
    </button>
  );
}

export default EliminarTecnico;
