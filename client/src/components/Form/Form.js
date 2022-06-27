import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../../actions/product";
import { createCategory, updateCategory } from "../../actions/category";

function Form({ currentId, setCurrentId }) {
  const product = useSelector((state) =>
    currentId ? state.products.find((p) => p._id === currentId) : null
  );
  const categories = useSelector((state) =>
    currentId ? state.categories.find((p) => p._id === currentId) : null
  );
  const productCategories = useSelector((state) => state.categories);
  const classes = useStyles();
  const [category, setCategory] = useState({ name: "" });
  const [productData, setproductData] = useState({
    name: "",
    category: "",
    price: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) setproductData(product);
  }, [product]);

  useEffect(() => {
    if (categories) setCategory(categories);
  }, [categories]);

  const handleCategorySubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateCategory(currentId, { ...category }));
    } else {
      dispatch(createCategory({ ...category }));
    }
    clear();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateProduct(currentId, { ...productData }));
    } else {
      dispatch(createProduct({ ...productData }));
    }
    clear();
  };

  const clear = () => {
    setCategory({ name: "" });
    setCurrentId(null);
    setproductData({
      name: "",
      category: "",
      price: "",
    });
  };
  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete='="off'
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleCategorySubmit}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Adding"} a Category
          </Typography>
          <TextField
            name="message"
            variant="outlined"
            label="Category"
            fullWidth
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>

      {!productCategories[0]?.name ? (
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please add atleast one category to add products.
          </Typography>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <form
            autoComplete='="off'
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6">
              {currentId ? "Editing" : "Adding"} a Product
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productData.category}
                label="Age"
                onChange={(e) =>
                  setproductData({ ...productData, category: e.target.value })
                }
              >
                {productCategories?.map((items) => (
                  <MenuItem value={items?._id} key={items._id}>
                    {items?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="title"
              variant="outlined"
              label="Product Name"
              fullWidth
              value={productData.name}
              onChange={(e) =>
                setproductData({ ...productData, name: e.target.value })
              }
            />
            <TextField
              name="tags"
              variant="outlined"
              label="Price"
              fullWidth
              value={productData.price}
              onChange={(e) =>
                setproductData({ ...productData, price: e.target.value })
              }
            />
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Paper>
      )}
    </>
  );
}

export default Form;
