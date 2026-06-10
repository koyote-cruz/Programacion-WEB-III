import "./Header.css";

function Header({ searchTerm, setSearchTerm }) {
  return (
    <div className="header">

      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </div>
  );
}

export default Header;