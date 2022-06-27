import React from "react";
import useStyles from "./styles";
import { Card, Button, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { deleteProduct} from "../../../actions/product";

function Product({ product, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <Typography variant="h6">Product Name : {product.name}</Typography>
        <Typography variant="h6">Product Price : Rs. {product.price}</Typography>
      </div>
      <div className={classes.cardActions}>
        {user?.result?._id === product?.creator && (
          <div>
            <Button
              size="small"
              color="primary"
              onClick={() => setCurrentId(product._id)}
            >
              <MoreHorizIcon fontSize="large" />
              Edit
            </Button>
          </div>
        )}
        {user?.result?._id === product?.creator && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deleteProduct(product._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
}

export default Product;
