import React, { useEffect, useState } from "react";
import "./form.scss";

const API_URL = "http://localhost:4000/products";

const Form = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [reload, setReload] = useState(false);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Error fetching products:", err));
  }, [reload]);

  const handleCreate = (e) => {
    e.preventDefault();
    const product = { title, price, category, img, count, desc };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((newProduct) => {
        setData((prevData) => [...prevData, newProduct]);
        setTitle("");
        setPrice("");
        setDesc("");
        setCategory("");
        setCount("");
        setImg("");
      })
      .catch((err) => console.error("Error creating product:", err));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setData((prevData) =>
            prevData.filter((product) => product.id !== id)
          );
        } else {
          throw new Error("Failed to delete product");
        }
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/${edit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    });
    setReload((p) => !p);
    setEdit(null);
  };

  const productItem = data?.map((product) => (
    <div key={product.id} className="product__card">
      <div className="product__img">
        <img src={product.img} alt={product.title} />
      </div>
      <div className="product__info">
        <h3>{product.title}</h3>
        <h3>{product.category}</h3>
        <p>{product.price}</p>
        <p>{product.desc}</p>
        <p>{product.count}</p>
        <div className="product__btns">
          <button
            className="product__delete__btn"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
          <button
            className="product__edit__btn"
            onClick={() => setEdit(product)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="product__form container">
      <h2>Form inputs</h2>
      <form onSubmit={handleCreate} className="product__form__inputs">
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <input
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type="text"
          placeholder="Description"
        />
        <input
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price"
        />
        <input
          name="img"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          type="text"
          placeholder="Image URL"
        />
        <input
          name="count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          type="number"
          placeholder="Count"
        />
        <input
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Category"
        />
        <button type="submit">Submit</button>
      </form>
      {edit ? (
        <form className="form__edit__modal" onSubmit={handleEdit} action="">
          <input
            value={edit.img}
            onChange={(e) => setEdit((p) => ({ ...p, img: e.target.value }))}
            type="url"
          />
          <input
            value={edit.title}
            onChange={(e) => setEdit((p) => ({ ...p, title: e.target.value }))}
            type="text"
          />
          <input
            value={edit.category}
            onChange={(e) =>
              setEdit((p) => ({ ...p, category: e.target.value }))
            }
            type="text"
          />
          <input
            value={edit.price}
            onChange={(e) => setEdit((p) => ({ ...p, price: e.target.value }))}
            type="number"
          />
          <input
            value={edit.count}
            onChange={(e) => setEdit((p) => ({ ...p, count: e.target.value }))}
            type="number"
          />
          <input
            value={edit.desc}
            onChange={(e) => setEdit((p) => ({ ...p, desc: e.target.value }))}
            type="number"
          />
          <button className="edit__save__btn">Save</button>
          <button
            type="button"
            onClick={() => setEdit(null)}
            className="edit__cancel__btn"
          >
            Cancel
          </button>
        </form>
      ) : (
        <></>
      )}
      <div className="product__cards container">{productItem}</div>
    </div>
  );
};

export default Form;
