const loadStockFromLocalStorage = () => {
  const storedStock = localStorage.getItem("stock");
  return storedStock ? JSON.parse(storedStock) : {};
};

export default loadStockFromLocalStorage;
