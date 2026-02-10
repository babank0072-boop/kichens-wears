"use client";
import React, { useEffect, useState } from "react";
import Carousel from "../../Components/rtl_carousel";
import products from "../../Data/products.json";
// import products from "../../Data/kitli.json";
import { ProductCardDetails } from "./prod-det";
import ProductImageGallery from "../../Components/utd_carousel";
import { getRandom10 } from "../../func";
import ProductCard from "../../Components/productCard";
import { useCart } from "../../Context/CartContext";
import { useSearchParams } from "react-router-dom";
import { Constants } from "../../api/env";
// import { ProductCardDetails2 } from "../../Components/productPage";

const ProductPage = ({}) => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const fromDetails = searchParams.get("fromDetails");

  // const id = searchParams.get("id");
  const [productDetails, setProductDetails] = useState();
  const [selectedSize, setSelectedSize] = useState("");
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    setSimilar(getRandom10(products));
  }, [products]);

  function parseProductDetailsString(text) {
    if (!text) return {};

    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    const result = {};
    let isDetailsSection = false;

    for (const line of lines) {
      // Start parsing after "Product details"
      if (line.toLowerCase() === "product details") {
        isDetailsSection = true;
        continue;
      }

      // Stop parsing when "About this item" starts
      if (line.toLowerCase() === "about this item") {
        break;
      }

      if (!isDetailsSection) continue;

      // Match "KeyValue" (Amazon copied text has no space)
      const match = line.match(/^([A-Za-z\s]+?)([A-Z0-9].+)$/);

      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        result[key] = value;
      }
    }

    return result;
  }
  function parseSpecifications(text) {
  if (!text) return {};

  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  const specs = {};

  for (const line of lines) {
    // Stop when About this item starts
    if (line.toLowerCase() === "about this item") break;

    // Skip section headers
    if (line.toLowerCase() === "product details") continue;

    let key = "";
    let value = "";

    // 1️⃣ TAB separated (most important for your case)
    if (line.includes("\t")) {
      [key, value] = line.split("\t").map(s => s.trim());
    }
    // 2️⃣ Colon separated
    else if (line.includes(":")) {
      [key, value] = line.split(":").map(s => s.trim());
    }
    // 3️⃣ Amazon merged text fallback
    else {
      const match = line.match(/^([A-Za-z\s]+?)([A-Z0-9].+)$/);
      if (match) {
        key = match[1].trim();
        value = match[2].trim();
      }
    }

    if (key && value) {
      specs[key] = value;
    }
  }

  return specs;
}


  function parseAboutThisItem(text) {
    if (!text) return [];

    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    const items = [];
    let isAboutSection = false;

    for (const line of lines) {
      // Start after "About this item"
      if (line.toLowerCase() === "about this item") {
        isAboutSection = true;
        continue;
      }

      // Skip everything before About section
      if (!isAboutSection) continue;

      // Push each description line as a bullet item
      items.push(line);
    }

    return items;
  }

  useEffect(() => {
    if (!id) return;

    // 👉 FROM API
    if (fromDetails === "true") {
      fetch(`${Constants.base}/api/products.php?id=${id}`)
        .then((r) => r.json())
        .then((prod) => {
          const images =
            prod?.imgdata?.images?.filter((img) => img.type === "background") ||
            [];

          const finalImages =
            images.length > 0 ? images : prod?.imgdata?.images || [];

          console.log(
            parseProductDetailsString(prod.material_care),
            "adlksjdslj",
          );

          setProductDetails({
            ...prod,
            imagesData: finalImages.map((iit) => ({
              ...iit,
              src: Constants.base + iit.src,
            })),
            specifications: parseSpecifications(prod.material_care),
            product_descriptions: parseAboutThisItem(prod.material_care),
          });
        })
        .catch(console.error);

      // 👉 FROM LOCAL JSON
    } else {
      const prod = products.find((p) => p.id == id);
      if (!prod) return;

      const images =
        prod?.imgdata?.images?.filter((img) => img.type === "background") || [];

      const finalImages =
        images.length > 0 ? images : prod?.imgdata?.images || [];

      setProductDetails({
        ...prod,
        imagesData: finalImages,
      });
    }
  }, [id, fromDetails]);

  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    setSimilar(getRandom10(products));
  }, [products]);
  // console.log(productDetails);
  if (productDetails) {
    const prodincart = cart.find((prod) => prod.id == productDetails.id);
    const cartQty = prodincart?.quantity;

    console.log(productDetails, "productDetails");

    return (
      <div>
        <div className="flex flex-col md:flex-row lg:flex-row gap-4 md:px-10 ">
          <div className="w-[100%] xs:w-full sm:w-full  md:w-[50%] lg:w-[50%] xl:w-[50%] 2xl:w-[50%]">
            <div className="block md:hidden">
              <Carousel
                animate={false}
                images={productDetails?.imagesData?.map((iit) => iit.src)}
                rating={productDetails.rating}
                imageClass={"h-[350px] !object-contain"}
              />
            </div>
            <div className="hidden md:block">
              <ProductImageGallery
                images={productDetails?.imagesData?.map((iit) => iit.src)}
                addToCart={addToCart}
                selectedSize={selectedSize}
                product={productDetails}
                prodincart={prodincart}
                cartQty={cartQty}
                removeFromCart={removeFromCart}
              />
            </div>
          </div>

          <div className="pt-4 max-w-[100%] xs:max-w-full sm:max-w-full lg:max-w-[50%] md:max-w-[50%] xl:max-w-[50%] 2xl:max-w-[50%]">
            <ProductCardDetails
              product={productDetails}
              cartQty={cartQty}
              prodincart={prodincart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              similar={similar}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mt-10 hidden md:block max-w-[90%] mb-8">
            <p className="mx-[16px] text-[#333] text-[19px] inter font-[700] mb-8 mt-8">
              Similar Products
            </p>

            <div className="carousel mt-5 flex flex-nowrap overflow-x-auto gap-4">
              {similar?.map((item, index) => {
                const imagess = item?.imgdata?.images.filter(
                  (iii) => iii.type == "background",
                );

                const pric_e = item.priceObj;

                return (
                  <div key={index} className="min-w-[200px]">
                    <ProductCard
                      product={item}
                      id={item.id}
                      brand={item.brand}
                      title={item.name}
                      price={pric_e.selling_price}
                      oldPrice={pric_e.mrp}
                      discount={pric_e.discount}
                      image={imagess[0]?.src}
                      link={`/prod`}
                      rating={
                        item.rating && item.rating_count
                          ? `${item.rating} | ${item.rating_count}`
                          : ""
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductPage;
