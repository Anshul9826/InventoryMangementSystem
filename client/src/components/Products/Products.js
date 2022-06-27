import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  CircularProgress,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Product from "./Product/Product";
import useStyles from "./styles";
import { deleteCategory, getCategories } from "../../actions/category";

function Products({ setCurrentId }) {
  const classes = useStyles();

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return !products.length && !categories.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {categories.map((category) => (
        <Grid key={category._id} item xs={12} sm={6}>
          <Card className={classes.card}>
            <Typography variant="h6" style={{ margin: "auto" }}>
              Product Category : {category.name}
            </Typography>
            <div className={classes.cardActions}>
              {user?.result?._id === category?.creator && (
                <div>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => setCurrentId(category._id)}
                  >
                    <MoreHorizIcon fontSize="large" />
                    Edit
                  </Button>
                </div>
              )}
              {user?.result?._id === category?.creator && (
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    dispatch(
                      deleteCategory(
                        category._id,
                        products.map((product) =>
                          product.category === category._id ? product._id : category._id
                        )
                      )
                    )
                  }
                >
                  <DeleteIcon fontSize="small" />
                  Delete
                </Button>
              )}
            </div>
          </Card>
          {products.map((product) => (
            <Grid key={product._id} item xs={12}>
              {product.category === category._id ? (
                <Product product={product} setCurrentId={setCurrentId} />
              ) : (
                <></>
              )}
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

export default Products;
