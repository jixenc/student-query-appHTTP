import React, { useState } from 'react';
import axios from 'axios';

const StudentSearchForm = () => {
  const [carnet, setCarnet] = useState('');
  const [student, setStudent] = useState({ Estudiante: '', Email: '', Seccion: '' });
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('/estudiantes');  // Obtener todo el listado
      console.log(response);
  
      // Limpiar los espacios en blanco del carnet que ingresó el usuario
      const carnetLimpio = carnet.replace(/\s+/g, '');
  
      // Buscar el estudiante por carnet, asegurándose de que 'Carnet' esté definido
      const student = response.data.Alumnos.find(est => 
        est.Carnet && est.Carnet.replace(/\s+/g, '') === carnetLimpio
      );
  
      if (student) {
        setStudent(student);
        setError('');
      } else {
        setStudent({ Estudiante: '', Email: '', Seccion: '' });
        setError('No se encontró un estudiante con el Carnet proporcionado.');
      }
    } catch (err) {
      console.error("Error durante la consulta:", err);
      setError('Se produjo un error al obtener los datos.');
    }
  };


  const handleClear = () => {
    setCarnet('');
    setStudent({ Estudiante: '', Email: '', Seccion: '' });
    setError('');
  };

  return (
    <div style={styles.container}>
      <h2>Consulta de alumnos</h2>
      <div style={styles.inputGroup}>
        <label>Carnet:</label>
        <input
          type="text"
          value={carnet}
          onChange={(e) => setCarnet(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Nombres:</label>
        <input
          type="text"
          value={student.Estudiante}
          readOnly
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Correo Electrónico:</label>
        <input
          type="text"
          value={student.Email}
          readOnly
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Sección:</label>
        <input
          type="text"
          value={student.Seccion}
          readOnly
          style={styles.input}
        />
      </div>
      <div style={styles.buttonGroup}>
        <button onClick={handleSearch} style={styles.button}>Buscar</button>
        <button onClick={handleClear} style={styles.button}>Limpiar</button>
        <button onClick={() => setStudent({ Estudiante: '', Email: '', Seccion: '' })} style={styles.button}>Cancelar</button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  button: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default StudentSearchForm;
