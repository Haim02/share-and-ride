import React, { useState, useEffect, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getOneProduct,
  updateProduct,
  getProductLastRents,
} from "../../../redux/apiCalls/product";
import "./product.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../components/spinner/Spinner";
import uuid from "react-uuid";
import ReactTimeAgo from "react-time-ago";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const { product, isFetching } = useSelector((state) => state.product);
  const [type, setType] = useState(product?.type);
  const [price, setPrice] = useState(product?.price);
  const [details, setDetails] = useState(product?.details);

  const dispatch = useDispatch();
  useEffect(() => {
    getOneProduct(productId, dispatch);
    getProductLastRents(productId, dispatch);
  }, [dispatch, productId]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      type,
      details,
      price,
    };
    updateProduct(productId, product, dispatch);
  };

  const setTypeString = product?.type === "scooter" ? "קורקינט" : "אופניים";

  if (!product) {
    return (
      <div className="spinnerContainer">
        <Spinner />
      </div>
    );
  }

  if (product) {
    return (
      <div className="product">
        {isFetching ? (
          <div className="spinnerContainer">
            <Spinner />
          </div>
        ) : (
          <Fragment>
            <div className="productTop">
              <div className="productTopLeft">
                {product.images.length === 0 ? (
                  <h3>אין תמונות להצגה</h3>
                ) : (
                  product.images.map((img) => {
                    return (
                      <img
                        key={uuid()}
                        src={img}
                        alt="img"
                        className="productInfoImg"
                      />
                    );
                  })
                )}
              </div>
              <div className="productTopRight">
                <div className="productInfoTop">
                  <span className="productName">{product.details.title}</span>
                </div>
                <div className="productInfoBottom">
                  <div className="productInfoItem">
                    <span className="productInfoValue">{product._id}</span>
                    <span className="productInfoKey">
                      <b>:id</b>
                    </span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoValue">{setTypeString}</span>
                    <span className="productInfoKey">:סוג</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoValue">
                      {product.details.helmet ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{ color: "#66f953" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faXmarkCircle}
                          style={{ color: "#f23636" }}
                        />
                      )}
                    </span>
                    <span className="productInfoKey">:קסדה</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoValue">
                      {product.details.electric ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{ color: "#66f953" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faXmarkCircle}
                          style={{ color: "#f23636" }}
                        />
                      )}
                    </span>
                    <span className="productInfoKey">: חשמלי</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoValue">
                      {product.details.speed}
                    </span>
                    <span className="productInfoKey">: מהירות</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoValue">
                      {product.details.battery}
                    </span>
                    <span className="productInfoKey">: סוללה</span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoValue">{`${product.location.city} ${product.location.street} ${product.location.houseNumber}`}</span>
                    <span className="productInfoKey">: כתובת</span>
                  </div>
                  <div className="productInfoItem">
                    <ReactTimeAgo
                      date={new Date(product.createdAt)}
                      locale="he"
                    />
                    <span className="productInfoKey"> : נוצר ב</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="productBottom">
              <form className="productForm" onSubmit={handleSubmit}>
                <div className="productFormLeft">
                  <label>שם</label>
                  <input
                    type="text"
                    placeholder={product.details.title}
                    onChange={handleDetailsChange}
                    name="title"
                  />
                  <label>תיאור</label>
                  <textarea
                    rows="5"
                    cols="30"
                    name="details.description"
                    onChange={handleDetailsChange}
                    placeholder="תיאור של המוצר..."
                  />
                  <label>מחיר לשעה</label>
                  <input
                    type="number"
                    placeholder={product?.price?.hourPrice}
                    onChange={handlePriceChange}
                    name="hourPrice"
                  />
                  <label>מחיר ליום</label>
                  <input
                    type="number"
                    placeholder={product?.price.dailyPrice}
                    onChange={handlePriceChange}
                    name="dailyPrice"
                  />
                  <label>:מהירות</label>
                  <input
                    type="number"
                    placeholder={product?.details?.speed}
                    onChange={handleDetailsChange}
                    name="speed"
                  />
                  <label>:סוללה</label>
                  <input
                    type="number"
                    placeholder={product?.details?.battery}
                    onChange={handleDetailsChange}
                    name="battery"
                  />
                  <label>:סוג</label>
                  <select
                    defaultValue={product.type}
                    id="idStock"
                    onChange={handleTypeChange}
                    name="type"
                  >
                    <option value="bicycle">אופניים</option>
                    <option value="scooter">קורקינט</option>
                  </select>
                  <label>:קסדה</label>
                  <select
                    defaultValue={product.details?.helmet}
                    id="idStock"
                    onChange={handleDetailsChange}
                    name="helmet"
                  >
                    <option value={false}>אין</option>
                    <option value={true}>יש</option>
                  </select>
                  <label>:חשמלי</label>
                  <select
                    defaultValue={product.details?.electric}
                    id="idStock"
                    onChange={handleDetailsChange}
                    name="electric"
                  >
                    <option value={false}>לא</option>
                    <option value={true}>כן</option>
                  </select>
                </div>
                <div className="productFormRight">
                  <div className="productUpload">
                    <img
                      src={product.img}
                      alt=""
                      className="productUploadImg"
                    />
                  </div>
                  <button className="productButton">עדכן</button>
                </div>
              </form>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
};

export default Product;
