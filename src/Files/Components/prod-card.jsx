import "./all-css-1.css";

const ProductCard = ({
  product,
  imageClass,
  imageContainerStyle = "",
  fromDetails = "",
}) => {
  const imagess = product.imgdata.images.filter(
    (iii) => iii.type == "background",
  );
  const imgList = product.imgdata.images;
  console.log(product, "ashsadiuashdsa");

  const fullimg = imagess.length == 0 ? imgList : imagess;

  return (
    <a
      href={`/prod?id=${product.id}&${fromDetails ? "fromDetails=true" : ""}`}
      className="w-full"
    >
      <div className="_2enssu">
        <div
          style={{
            position: "relative",
            minHeight: "110px",
            minWidth: "110px",
          }}
        >
          <div className="_3LXIRu">
            <div
              className="_2GaeWJ"
              style={{ width: "110px", height: "110px" }}
            >
              <img
                className="_2puWtW _3a3qyb lozad"
                src={fullimg[0]?.src}
                alt="Product"
              />
            </div>
          </div>
        </div>

        <div className="_24B_AU _3SexMn">{product.name}</div>

        <div className="_24B_AU _1AQnZC">
          {product.priceObj.discount}% Off{" "}
          <span className="mrp">₹ {product?.priceObj?.mrp?.toFixed(2)}</span>
        </div>

        <div className="_24B_AU _1AQnZC">
          <b className="selling-price">
            ₹ {product?.priceObj?.selling_price?.toFixed(2)}
          </b>
          <img
            src="/assuared.png"
            width="77"
            alt="Offer"
          />
        </div>

        {/* Inline CSS in JSX */}
        <style>{`
          ._3LWZlK {
            line-height: normal;
            display: inline-block;
            color: #fff;
            padding: 2px 4px 2px 6px;
            border-radius: 3px;
            font-weight: 500;
            font-size: 12px;
            vertical-align: middle;
            background-color: #388e3c;
          }
          ._2_R_DZ {
            padding-left: 3px;
            font-weight: 100;
            color: #a1a1a1;
          }
          .starimg {
            width: 14px !important;
            margin: 0 0 0 6px;
          }
        `}</style>

        <div className="_24B_AU _1AQnZC">
          <b className="_3LWZlK">
            4.6
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
              alt="Star"
              className="starimg"
            />
          </b>
          <b className="_2_R_DZ">9729 Ratings</b>
        </div>

        <div className="_3Nxu4r delivery-txt">Free Delivery in Two Days</div>
      </div>
    </a>
  );
};

export default ProductCard;
