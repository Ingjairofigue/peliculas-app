import { useState, useEffect } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';
import { Users, PlusCircle, Save, XCircle, Edit } from 'lucide-react';

const Directores = () => {
    const [directores, setDirectores] = useState([]);
    const [formulario, setFormulario] = useState({ id: null, nombres: '', estado: 'Activo' });
    const [editando, setEditando] = useState(false);

    const cargarDirectores = async () => {
        try {
            const res = await api.get('/directores');
            setDirectores(res.data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los directores', 'error');
        }
    };

    useEffect(() => { cargarDirectores(); }, []);

    const handleChange = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await api.put(`/directores/${formulario.id}`, formulario);
                Swal.fire('¡Actualizado!', 'Director actualizado.', 'success');
                setEditando(false);
            } else {
                await api.post('/directores', formulario);
                Swal.fire('¡Creado!', 'Director registrado.', 'success');
            }
            setFormulario({ id: null, nombres: '', estado: 'Activo' });
            cargarDirectores();
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || 'Hubo un problema', 'error');
        }
    };

    const handleEditar = (d) => { setFormulario(d); setEditando(true); };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-transparent border-bottom border-secondary d-flex align-items-center gap-2 py-3">
                        <Users color="#a78bfa" size={20} />
                        <h5 className="mb-0 text-white">{editando ? 'Editar Director' : 'Nuevo Director'}</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted">Nombres</label>
                                <input type="text" className="form-control" name="nombres" value={formulario.nombres} onChange={handleChange} required />
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
                                <button type="button" className="btn btn-outline-secondary w-100 mt-2 d-flex justify-content-center align-items-center gap-2" onClick={() => { setEditando(false); setFormulario({ id: null, nombres: '', estado: 'Activo' }); }}>
                                    <XCircle size={18} /> Cancelar
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-transparent border-bottom border-secondary py-3">
                        <h5 className="mb-0 text-white">Listado de Directores</h5>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover align-middle">
                            <thead><tr><th>ID</th><th>Nombres</th><th>Estado</th><th>Acciones</th></tr></thead>
                            <tbody>
                                {directores.map((d) => (
                                    <tr key={d.id}>
                                        <td className="text-muted">{d.id}</td>
                                        <td className="fw-bold">{d.nombres}</td>
                                        <td><span className={`badge ${d.estado === 'Activo' ? 'bg-success' : 'bg-danger'} bg-opacity-75`}>{d.estado}</span></td>
                                        <td><button className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1" onClick={() => handleEditar(d)}><Edit size={14} /> Editar</button></td>
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
export default Directores;