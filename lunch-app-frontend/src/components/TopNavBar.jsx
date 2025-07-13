import { useNavigate } from 'react-router-dom';

const TopNavBar = ({ children, setUser }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // 🔁 borra el usuario de estado React
    navigate('/', { replace: true }); // redirige al login (React Router usa el basename)
  };

  const handleHome = () => {
    if (!user) return navigate('/');

    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'oficina') navigate('/oficina');
    else if (user.role === 'cocina') navigate('/cocina');
    else navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f0f0f0',
      borderBottom: '1px solid #ccc'
    }}>
      <div>
        <button onClick={handleHome} style={{ marginRight: '1rem' }}>
          Inicio
        </button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default TopNavBar;
