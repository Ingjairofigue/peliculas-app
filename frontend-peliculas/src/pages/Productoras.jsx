import { useState, useEffect } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';
import { Building2, PlusCircle, Save, XCircle, Edit } from 'lucide-react';

const Productoras = () => {
    const [productoras, setProductoras] = useState([]);
    const [formulario, setFormulario] = useState({ id: null, nombre: '', slogan: '', descripcion: '', estado: 'Activo' });
    const [editando, setEditando] = useState(false);

    const cargarProductoras = async () => {
        try {
            const res = await api.get('/productoras');
            setProductoras(res.data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las productoras', 'error');
        }
    };

    useEffect(() => { cargarProductoras(); }, []);

    const handleChange = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await api.put(`/productoras/${formulario.id}`, formulario);
                Swal.fire('¡Actualizado!', 'Productora actualizada.', 'success');
                setEditando(false);
            } else {
                await api.post('/productoras', formulario);
                Swal.fire('¡Creado!', 'Productora registrada.', 'success');
            }
            setFormulario({ id: null, nombre: '', slogan: '', descripcion: '', estado: 'Activo' });
            cargarProductoras();
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || 'Hubo un problema', 'error');
        }
    };

    const handleEditar = (p) => { setFormulario(p); setEditando(true); };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-transparent border-bottom border-secondary d-flex align-items-center gap-2 py-3">
                        <Building2 color="#fbbf24" size={20} />
                        <h5 className="mb-0 text-white">{editando ? 'Editar Productora' : 'Nueva Productora'}</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted">Nombre</label>
                                <input type="text" className="form-control" name="nombre" value={formulario.nombre} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-muted">Slogan</label>
                                <input type="text" className="form-control" name="slogan" value={formulario.slogan} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-muted">Descripción</label>
                                <textarea className="form-control" name="descripcion" value={formulario.descripcion} onChange={handleChange} rows="2"></textarea>
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
                                <button type="button" className="btn btn-outline-secondary w-100 mt-2 d-flex justify-content-center align-items-center gap-2" onClick={() => { setEditando(false); setFormulario({ id: null, nombre: '', slogan: '', descripcion: '', estado: 'Activo' }); }}>
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
                        <h5 className="mb-0 text-white">Listado de Productoras</h5>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover align-middle">
                            <thead><tr><th>ID</th><th>Nombre</th><th>Slogan</th><th>Estado</th><th>Acciones</th></tr></thead>
                            <tbody>
                                {productoras.map((p) => (
                                    <tr key={p.id}>
                                        <td className="text-muted">{p.id}</td>
                                        <td className="fw-bold">{p.nombre}</td>
                                        <td>{p.slogan}</td>
                                        <td><span className={`badge ${p.estado === 'Activo' ? 'bg-success' : 'bg-danger'} bg-opacity-75`}>{p.estado}</span></td>
                                        <td><button className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1" onClick={() => handleEditar(p)}><Edit size={14} /> Editar</button></td>
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
export default Productoras;