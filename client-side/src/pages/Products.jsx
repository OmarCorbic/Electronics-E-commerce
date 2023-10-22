import React, { useEffect, useRef, useState } from "react";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { Field, useFormik } from "formik";
import { setHTTPProgress } from "../features/progressSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Spinner from "../components/Spinner";

const Products = () => {
  const filtersRef = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(null);
  const [products, setProducts] = useState([]);
  const [filtersInfo, setFiltersInfo] = useState({
    brands: [],
  });

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
    if (params.search) {
      setFilters((prevState) => {
        return { ...prevState, search: params.search };
      });
    }
    return () => {
      formik.resetForm();
      dispatch(setHTTPProgress(0));
      setFilters(null);
    };
  }, [params]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const loadProducts = async (category, filters) => {
      let apiUrl = `/api/v1/products?category=${category}`;

      if (filters) {
        const filterParams = new URLSearchParams(filters).toString();

        apiUrl += `&${filterParams}`;
      }

      try {
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

  const handleToggleFilters = () => {
    filtersRef.current.classList.toggle("hidden");
  };

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-5">
      <button
        onClick={handleToggleFilters}
        className="cursor-pointer bg-blue-400 p-1 text-white md:hidden"
      >
        Filters
      </button>
      <div
        ref={filtersRef}
        className="row-span-1 hidden justify-center border-b-2 p-2 text-xs md:col-span-1 md:block md:border-none md:p-[8%] lg:text-sm"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex items-center justify-around text-gray-600 md:flex-col md:items-start md:gap-5 lg:items-center"
        >
          <div className="lg: w-[20%] md:w-full lg:w-1/2">
            <label className="flex w-full flex-col" htmlFor="maxPrice">
              Max price:
              <input
                className="my-2"
                max={4000}
                min={0}
                step={1}
                type="range"
                onChange={formik.handleChange}
                name="maxPrice"
                value={formik.values.maxPrice}
              />
              <input
                className="ml-1 inline-block rounded border border-gray-300 p-1 text-center"
                value={formik.values.maxPrice}
                onChange={formik.handleChange}
                name="maxPrice"
              />
            </label>
            <label className="flex flex-col" htmlFor="minPrice">
              Min price:
              <input
                className="my-2"
                max={4000}
                min={0}
                step={1}
                type="range"
                onChange={formik.handleChange}
                name="minPrice"
                value={formik.values.minPrice}
              />
              <input
                className="ml-1 inline-block rounded border border-gray-300 p-1 text-center"
                value={formik.values.minPrice}
                onChange={formik.handleChange}
                name="minPrice"
              />
            </label>
          </div>
          <label className="flex w-[30%] flex-col md:w-full lg:w-[50%]">
            Brands:
            <>
              {filtersInfo.brands.map((item) => (
                <div key={item._id}>
                  <label className="overflow-x-auto text-[90%]">
                    <input
                      className="mr-1"
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
          <div className="flex w-[20%] flex-col md:w-full lg:w-[50%]">
            <button
              className="mb-1 rounded bg-[#0170f0] p-1 text-white"
              type="submit"
            >
              Apply filters
            </button>
            <button
              className="mb-1 rounded bg-[#31acff] p-1 text-white"
              onClick={handleResetFilters}
              type="button"
            >
              Reset filters
            </button>
          </div>
        </form>
      </div>
      {products.length < 1 ? (
        <div className="mt-10 flex items-center justify-center md:col-span-4 md:mt-0">
          <Spinner size={50} />
        </div>
      ) : (
        <div className="product-section row-span-4 pb-10 md:col-span-4">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Products;
