function ResourceList({ title, items, error, empty }) {
  return (
    <section>
      <h1>{title}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {items.length ? (
        <div className="list-group">
          {items.map((item, index) => (
            <div className="list-group-item" key={item._id || item.id || index}>
              {item.name || item.username || item.email || JSON.stringify(item)}
            </div>
          ))}
        </div>
      ) : !error && <p className="text-secondary">{empty}</p>}
    </section>
  )
}

export default ResourceList
