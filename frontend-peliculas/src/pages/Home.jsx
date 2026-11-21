import { useState, useEffect } from 'react';
import { Film, Tags, Users, Building2, Clapperboard } from 'lucide-react';
import api from '../services/api';

const Home = () => {
    const [stats, setStats] = useState({ media: 0, generos: 0, directores: 0, productoras: 0, tipos: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [media, generos, directores, productoras, tipos] = await Promise.all([
                    api.get('/media'), api.get('/generos'), api.get('/directores'), api.get('/productoras'), api.get('/tipos')
                ]);
                setStats({
                    media: media.data.length,
                    generos: generos.data.length,
                    directores: directores.data.length,
                    productoras: productoras.data.length,
                    tipos: tipos.data.length
                });
            } catch (error) {
                console.log("Error cargando stats");
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Películas y Series', value: stats.media, icon: <Film size={32} color="#38bdf8" />, color: 'rgba(56, 189, 248, 0.1)' },
        { title: 'Géneros', value: stats.generos, icon: <Tags size={32} color="#a78bfa" />, color: 'rgba(167, 139, 250, 0.1)' },
        { title: 'Directores', value: stats.directores, icon: <Users size={32} color="#34d399" />, color: 'rgba(52, 211, 153, 0.1)' },
        { title: 'Productoras', value: stats.productoras, icon: <Building2 size={32} color="#fbbf24" />, color: 'rgba(251, 191, 36, 0.1)' },
        { title: 'Tipos', value: stats.tipos, icon: <Clapperboard size={32} color="#f472b6" />, color: 'rgba(244, 114, 182, 0.1)' },
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4" style={{ fontWeight: '600', color: '#f8fafc' }}>Panel de Control</h2>
            <div className="row g-4">
                {cards.map((card, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card border-0" style={{ backgroundColor: card.color, borderLeft: `4px solid ${card.icon.props.color}` }}>
                            <div className="card-body d-flex align-items-center justify-content-between p-4">
                                <div>
                                    <h6 className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>{card.title}</h6>
                                    <h2 className="mb-0" style={{ fontWeight: 'bold', color: '#f8fafc' }}>{card.value}</h2>
                                </div>
                                <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;