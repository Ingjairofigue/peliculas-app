import { useState, useEffect } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';
import { Tags, PlusCircle, Edit, Save, XCircle, Trash2 } from 'lucide-react'; // <--- Iconos

const Generos = () => {
    const [generos, setGeneros] = useState([]);
    const [formulario, setFormulario] = useState({ id: null, nombre: '', descripcion: '', estado: 'Activo' });
    const [editando, setEditando] = useState(false);

    const cargarGeneros = async () => {
        try {
            const res = await api.get('/generos');
            setGeneros(res.data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los géneros', 'error');
        }
    };

    useEffect(() => { cargarGeneros(); }, []);

    const handleChange = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await api.put(`/generos/${formulario.id}`, formulario);
                Swal.fire('¡Actualizado!', 'El género ha sido actualizado.', 'success');
                setEditando(false);
            } else {
                await api.post('/generos', formulario);
                Swal.fire('¡Creado!', 'El género ha sido registrado.', 'success');
            }
            setFormulario({ id: null, nombre: '', descripcion: '', estado: 'Activo' });
            cargarGeneros();
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || 'Hubo un problema', 'error');
        }
    };

    const handleEditar = (genero) => { setFormulario(genero); setEditando(true); };

    const handleEliminar = async (genero) => {
        const confirmacion = await Swal.fire({
            title: '¿Eliminar género?',
            text: `Se eliminará "${genero.nombre}". Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        if (!confirmacion.isConfirmed) return;
        try {
            await api.delete(`/generos/${genero.id}`);
            Swal.fire('¡Eliminado!', 'El género ha sido eliminado.', 'success');
            if (formulario.id === genero.id) {
                setEditando(false);
                setFormulario({ id: null, nombre: '', descripcion: '', estado: 'Activo' });
            }
            cargarGeneros();
        } catch (error) {
            Swal.fire('No se pudo eliminar', error.response?.data?.error || 'Puede que esté en uso por una producción.', 'error');
        }
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card border-0 shadow-sm"> {/* Ya no usamos bg-primary en el header para un look más limpio */}
                    <div className="card-header bg-transparent border-bottom border-secondary d-flex align-items-center gap-2 py-3">
                        <Tags color="#38bdf8" size={20} />
                        <h5 className="mb-0 text-white">{editando ? 'Editar Género' : 'Nuevo Género'}</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted">Nombre</label>
                                <input type="text" className="form-control" name="nombre" value={formulario.nombre} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-muted">Descripción</label>
                                <textarea className="form-control" name="descripcion" value={formulario.descripcion} onChange={handleChange}></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-muted">Estado</label>
                                <select className="form-select" name="estado" value={formulario.estado} onChange={handleChange}>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                            <button type="submit" className={`btn w-100 d-flex justify-content-center align-items-center gap-2 ${editando ? 'btn-warning' : 'btn-success'}`}>
                                {editando ? <><Save size={18} /> Actualizar</> : <><PlusCircle size={18} /> Guardar</>}
                            </button>
                            {editando && (
                                <button type="button" className="btn btn-outline-secondary w-100 mt-2 d-flex justify-content-center align-items-center gap-2" onClick={() => { setEditando(false); setFormulario({ id: null, nombre: '', descripcion: '', estado: 'Activo' }); }}>
                                    <XCircle size={18} /> Cancelar Edición
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <div className="col-md-8">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-transparent border-bottom border-secondary py-3">
                        <h5 className="mb-0 text-white">Listado de Géneros</h5>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generos.map((g) => (
                                    <tr key={g.id}>
                                        <td className="text-muted">{g.id}</td>
                                        <td className="fw-bold">{g.nombre}</td>
                                        <td>{g.descripcion}</td>
                                        <td>
                                            <span className={`badge ${g.estado === 'Activo' ? 'bg-success' : 'bg-danger'} bg-opacity-75`}>
                                                {g.estado}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <button className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1" onClick={() => handleEditar(g)}>
                                                    <Edit size={14} /> Editar
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1" onClick={() => handleEliminar(g)}>
                                                    <Trash2 size={14} /> Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Generos;