function Access({ accessible, fallback, children }) {
  return accessible ? children : fallback || null;
}

export default Access;
