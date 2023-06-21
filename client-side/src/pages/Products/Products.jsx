import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { setHTTPProgress } from "../../features/progress/progressSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Products = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(null);
  const [products, setProducts] = useState([]);
  const [filtersInfo, setFiltersInfo] = useState({
    brands: [],
  });
  console.log("products component rendered");
  const formik = useFormik({
    initialValues: {
      maxPrice: 0,
      minPrice: 0,
      selectedBrands: [],
    },
    onSubmit: (values) => {
      const { selectedBrands, maxPrice, minPrice } = values;
      const filterObject = {};

      if (selectedBrands.length > 0) {
        filterObject.brands = selectedBrands;
      }

      if (maxPrice > 0 || minPrice > 0) {
        filterObject.numericFields = [
          `price<=${maxPrice}`,
          `price>=${minPrice}`,
        ];
      }
      setFilters(filterObject);
    },
  });

  useEffect(() => {
    console.log("search useEffect");
    if (params.search) {
      setFilters((prevState) => {
        return { ...prevState, search: params.search };
      });
    }
    formik.resetForm();
    dispatch(setHTTPProgress(0));
    return () => {
      setFilters(null);
    };
  }, [params]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    console.log("fetch useEffect");
    const loadProducts = async (category, filters) => {
      try {
        let apiUrl = `http://localhost:3000/api/v1/products?category=${category}`;

        if (filters) {
          const filterParams = new URLSearchParams(filters).toString();
          console.log(filterParams);
          apiUrl += `&${filterParams}`;
        }

        const { data } = await axios.get(apiUrl, {
          responseType: "json",
          cancelToken: cancelToken.token,
          onDownloadProgress: (progressEvent) => {
            const progressPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            dispatch(setHTTPProgress(progressPercentage));
          },
        });

        setProducts([...data.products]);
        setFiltersInfo((prevState) => {
          return { ...prevState, brands: data.brands };
        });
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Canceled request");
          return;
        }
        console.log(error);
      }
    };

    loadProducts(params.category, filters);

    return () => {
      console.log("fetch useEffect cleanup");
      cancelToken.cancel();
    };
  }, [params.category, filters]);

  const handleBrandsChange = (e, item) => {
    const checked = e.target.checked;
    let updatedSelectedBrands = [...formik.values.selectedBrands];

    if (checked) {
      updatedSelectedBrands.push(item.brand);
    } else {
      updatedSelectedBrands = updatedSelectedBrands.filter(
        (selectedBrand) => selectedBrand !== item.brand
      );
    }

    formik.setFieldValue("selectedBrands", updatedSelectedBrands);
  };

  const handleResetFilters = () => {
    setFilters(null);
    formik.resetForm();
  };

  const priceSpanStyle = {
    textAlign: "center",
    display: "inline-block",
    marginLeft: "5px",
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "5px",
    width: "55px",
  };

  return (
    <div className="products">
      <div className="filter-section">
        <form onSubmit={formik.handleSubmit} className="filters">
          <label htmlFor="maxPrice">
            Max price:
            <input
              max={4000}
              min={formik.values.minPrice}
              step={1}
              type="range"
              onChange={formik.handleChange}
              name="maxPrice"
              value={formik.values.maxPrice}
            />
            <span style={priceSpanStyle}>{formik.values.maxPrice}</span>
          </label>
          <label htmlFor="minPrice">
            Min price:
            <input
              max={formik.values.maxPrice}
              min={0}
              step={1}
              type="range"
              onChange={formik.handleChange}
              name="minPrice"
              value={formik.values.minPrice}
            />
            <span style={priceSpanStyle}>{formik.values.minPrice}</span>
          </label>
          <label>
            Brands:
            <>
              {filtersInfo.brands.map((item) => (
                <div key={item._id}>
                  <label>
                    <input
                      style={{ marginRight: "5px" }}
                      type="checkbox"
                      name={item.brand}
                      checked={formik.values.selectedBrands.includes(
                        item.brand
                      )}
                      onChange={(e) => handleBrandsChange(e, item)}
                    />
                    {item.brand}
                  </label>
                </div>
              ))}
            </>
          </label>
          <button
            style={{
              color: "white",
              backgroundColor: "#0170f0",
              borderRadius: "5px",
              padding: "5px",
              marginBottom: "5px",
            }}
            type="submit"
          >
            Apply filters
          </button>
          <button
            style={{
              color: "white",
              backgroundColor: "#31acff",
              borderRadius: "5px",
              padding: "5px",
            }}
            onClick={handleResetFilters}
            type="button"
          >
            Reset filters
          </button>

          <div className="bg-black">Hello</div>
          {/* <pre
            style={{
              color: "black",
              fontSize: "1em",
              fontWeight: "300",
            }}
          >
            {JSON.stringify(formik.errors, null, 4)}
          </pre>
          */}
          {/* <pre
            style={{
              color: "black",
              fontSize: "1em",
              fontWeight: "300",
            }}
          >
            {JSON.stringify(formik.values, null, 4)}
          </pre>{" "} */}
        </form>
      </div>
      {products.length < 1 ? null : (
        <div className="product-section">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Products;
