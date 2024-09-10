import React, { useEffect, useState } from "react";
import { getHTTPRequestHandler } from "../utils/helper";

const Products: React.FC = () => {
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getHTTPRequestHandler('products', setProducts, setLoading);
    }, []);

    return (
        <div className="row">
          <div className="col-md-12">
            {product.map((item: any, i: any) => {
                return(
                  <div className="response" key={i}>
                    <p className="card-title">{item.title}</p>
                    <table className="table table-borderless table-responsive">
                      <tbody>
                        <tr className="card-heading-1">
                          <td>Product Id</td>
                          <td>Category</td>
                          <td>Price</td>
                          <td>Discount %</td>
                          <td>Rating</td>
                          <td>Stock</td>
                          <td>Status</td>
                          <td>Shipping Info</td>
                        </tr>
                        <tr className="card-heading-2">
                          <td>{item.id}</td>
                          <td>{item.category}</td>
                          <td>{item.price}</td>
                          <td>{item.discountPercentage}</td>
                          <td>{item.rating}</td>
                          <td>{item.stock}</td>
                          <td>{item.availabilityStatus}</td>
                          <td>{item.shippingInformation}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
            })}
          </div>
          {loading ? (
            <div>
                <div className="loader"></div>
                <div id="overlay"></div>
            </div>
          ) : null}
        </div>
      );
};

export default Products;