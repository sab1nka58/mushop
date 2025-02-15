import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./ProductsPage.css"; // Подключаем стили

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Ошибка при загрузке данных");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="loading">
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
          .
        </div>
        ;
      </div>
    );
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <div className="product-page">
        <div className="container">
          <h1 className="product-title"> {product.title}</h1>

          <div className="product-content">
            {/* 🟢 СЛАЙДЕР С КАРТИНКАМИ */}
            <div className="product-slider">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="swiper-container"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`product-${index}`}
                      className="swiper-img"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="product-info">
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
              <button className="buy-btn">🛒 Купить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
