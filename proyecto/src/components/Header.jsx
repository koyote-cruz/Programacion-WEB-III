import './Header.css'

function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>
          TIENDA OLGA
        </h1>
        <p>Gestion de productos del puesto de tienda de barrio</p>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  )
}

export default Header