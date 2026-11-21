import { useState, useEffect } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';
import { Film, PlusCircle, Save, XCircle, Edit, Image as ImageIcon, PlayCircle, Calendar, Tag, Clapperboard } from 'lucide-react';

const Media = () => {
    const [medias, setMedias] = useState([]);
    const [editando, setEditando] = useState(false);
    const [formulario, setFormulario] = useState({
        id: null, serial: '', titulo: '', sinopsis: '', url_pelicula: '', imagen_portada: '',
        anio_estreno: new Date().getFullYear(), genero_id: '', director_id: '', productora_id: '', tipo_id: ''
    });

    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    const cargarDatos = async () => {
        try {
            const resMedia = await api.get('/media');
            setMedias(resMedia.data);

            const [resGen, resDir, resPro, resTip] = await Promise.all([
                api.get('/generos?estado=Activo'),
                api.get('/directores?estado=Activo'),
                api.get('/productoras?estado=Activo'),
                api.get('/tipos')
            ]);

            setGeneros(resGen.data);
            setDirectores(resDir.data);
            setProductoras(resPro.data);
            setTipos(resTip.data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
        }
    };

    useEffect(() => { cargarDatos(); }, []);

    const handleChange = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await api.put(`/media/${formulario.id}`, formulario);
                Swal.fire('¡Actualizado!', 'La producción ha sido actualizada.', 'success');
                setEditando(false);
            } else {
                await api.post('/media', formulario);
                Swal.fire('¡Creado!', 'La producción ha sido registrada.', 'success');
            }
            setFormulario({ id: null, serial: '', titulo: '', sinopsis: '', url_pelicula: '', imagen_portada: '', anio_estreno: new Date().getFullYear(), genero_id: '', director_id: '', productora_id: '', tipo_id: '' });
            cargarDatos();
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || 'Verifica los campos', 'error');
        }
    };

    const handleEditar = (m) => { setFormulario(m); setEditando(true); };

    return (
        <div className="row">
            {/* Formulario (Columna Izquierda) */}
            <div className="col-xl-4 col-lg-5 mb-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-transparent border-bottom border-secondary d-flex align-items-center gap-2 py-3">
                        <Film color="#38bdf8" size={20} />
                        <h5 className="mb-0 text-white">{editando ? 'Editar Producción' : 'Nueva Producción'}</h5>
                    </div>
                    <div className="card-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label className="form-label text-muted">Serial Único</label>
                                <input type="text" className="form-control form-control-sm" name="serial" value={formulario.serial} onChange={handleChange} required />
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted">Título</label>
                                <input type="text" className="form-control form-control-sm" name="titulo" value={formulario.titulo} onChange={handleChange} required />
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted">Sinopsis</label>
                                <textarea className="form-control form-control-sm" name="sinopsis" value={formulario.sinopsis} onChange={handleChange} rows="2"></textarea>
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted">URL del Video</label>
                                <input type="url" className="form-control form-control-sm" name="url_pelicula" value={formulario.url_pelicula} onChange={handleChange} required />
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted">URL de Portada (Imagen)</label>
                                <input type="url" className="form-control form-control-sm" name="imagen_portada" value={formulario.imagen_portada} onChange={handleChange} placeholder="https://..." />
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted">Año de Estreno</label>
                                <input type="number" className="form-control form-control-sm" name="anio_estreno" value={formulario.anio_estreno} onChange={handleChange} required />
                            </div>
                            
                            <hr className="border-secondary" />
                            <h6 className="text-white mb-3">Relaciones</h6>
                            
                            <div className="mb-2">
                                <label className="form-label text-muted">Género</label>
                                <select className="form-select form-select-sm" name="genero_id" value={formulario.genero_id} onChange={handleChange} required>
                                    <option value="">Seleccione...</option>
                                    {generos.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted">Director</label>
                                <select className="form-select form-select-sm" name="director_id" value={formulario.director_id} onChange={handleChange} required>
                                    <option value="">Seleccione...</option>
                                    {directores.map(d => <option key={d.id} value={d.id}>{d.nombres}</option>)}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted">Productora</label>
                                <select className="form-select form-select-sm" name="productora_id" value={formulario.productora_id} onChange={handleChange} required>
                                    <option value="">Seleccione...</option>
                                    {productoras.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-muted">Tipo</label>
                                <select className="form-select form-select-sm" name="tipo_id" value={formulario.tipo_id} onChange={handleChange} required>
                                    <option value="">Seleccione...</option>
                                    {tipos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                                </select>
                            </div>

                            <button type="submit" className={`btn w-100 d-flex justify-content-center align-items-center gap-2 ${editando ? 'btn-warning' : 'btn-success'}`}>
                                {editando ? <><Save size={18} /> Actualizar</> : <><PlusCircle size={18} /> Guardar</>}
                            </button>
                            {editando && (
                                <button type="button" className="btn btn-outline-secondary w-100 mt-2 d-flex justify-content-center align-items-center gap-2" onClick={() => { setEditando(false); setFormulario({ id: null, serial: '', titulo: '', sinopsis: '', url_pelicula: '', imagen_portada: '', anio_estreno: new Date().getFullYear(), genero_id: '', director_id: '', productora_id: '', tipo_id: '' }); }}>
                                    <XCircle size={18} /> Cancelar
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Catálogo Visual - Tarjetas (Columna Derecha) */}
            <div className="col-xl-8 col-lg-7">
                <div className="d-flex align-items-center mb-3">
                    <h4 className="text-white mb-0 me-2">Catálogo</h4>
                    <span className="badge bg-secondary">{medias.length} producciones</span>
                </div>
                
                <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
                    {medias.map((m) => (
                        <div className="col" key={m.id}>
                            <div className="card h-100 border-0 shadow-sm" style={{ overflow: 'hidden' }}>
                                
                                {/* Imagen y botón de Play */}
                                <div className="position-relative">
                                    {m.imagen_portada ? (
                                        <img 
                                            src={m.imagen_portada} 
                                            alt={m.titulo} 
                                            style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center bg-secondary" style={{ height: '220px' }}>
                                            <ImageIcon size={48} color="#94a3b8" />
                                        </div>
                                    )}
                                    
                                    {/* Overlay del Play */}
                                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                                         style={{ backgroundColor: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.3s' }}
                                         onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                         onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                                        <PlayCircle size={50} color="white" style={{ cursor: 'pointer' }} />
                                    </div>

                                    {/* Etiqueta del Tipo (Película o Serie) */}
                                    <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                                        {m.tipo?.nombre}
                                    </span>
                                </div>

                                {/* Información de la película */}
                                <div className="card-body">
                                    <h5 className="card-title text-white mb-1 text-truncate" title={m.titulo}>{m.titulo}</h5>
                                    
                                    <div className="d-flex align-items-center text-muted small mb-2">
                                        <Calendar size={14} className="me-1" /> {m.anio_estreno}
                                        <span className="mx-2">•</span>
                                        <Tag size={14} className="me-1" /> {m.genero?.nombre}
                                    </div>
                                    
                                    <p className="card-text text-muted small" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {m.sinopsis}
                                    </p>
                                </div>

                                {/* Botones de acción */}
                                <div className="card-footer bg-transparent border-top border-secondary d-flex justify-content-between align-items-center">
                                    <small className="text-muted d-flex align-items-center gap-1">
                                        <Clapperboard size={14} /> {m.director?.nombres}
                                    </small>
                                    <button className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1" onClick={() => handleEditar(m)}>
                                        <Edit size={14} /> Editar
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                
                {medias.length === 0 && (
                    <div className="text-center text-muted mt-5">
                        <Film size={60} className="mb-3 opacity-50" />
                        <h5>No hay películas registradas</h5>
                        <p>Utiliza el formulario de la izquierda para agregar tu primera producción.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Media;