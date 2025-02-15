import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Стили
import "../index.css";
import "../components/loading.css";

const HomePage = ({ searchQuery, sortBy }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const itemsPerPage = 12;
  const totalProducts = 100;
  const pageCount = Math.ceil(totalProducts / itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
            page * itemsPerPage
          }`
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError("Ошибка при загрузке данных");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected);
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "stock") return a.stock - b.stock;
      return 0;
    });

  if (loading)
    return (
      <div className="container loading">
        <div className="loadingio-spinner-spin-2by998twmg8">
          <div className="ldio-yzaezf3dcmj">
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
        
      </div>
    );
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <div className="homepage">
        <div className="container">
          <h1 className="title">🛍 Наши товары</h1>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-img"
                  />
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-desc">{product.description}</p>
                  <p className="product-price">
                    💰{" "}
                    <b>
                      {(
                        product.price -
                        (product.price * product.discountPercentage) / 100
                      ).toFixed(2)}{" "}
                      $
                    </b>{" "}
                    (со скидкой)
                  </p>
                  <p className="product-stock">📦 В наличии: {product.stock}</p>
                  <Link to={`/product/${product.id}`} className="product-btn">
                    Подробнее
                  </Link>
                </div>
              ))
            ) : (
              <p className="no-products">❌ Товаров не найдено</p>
            )}
          </div>

          {!searchQuery && (
            <ReactPaginate
              previousLabel={"← Назад"}
              nextLabel={"Вперед →"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              forcePage={page} // 🟢 Фикс: теперь обновляется номер активной страницы
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousClassName={"prev-button"}
              nextClassName={"next-button"}
              disabledClassName={"disabled"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
