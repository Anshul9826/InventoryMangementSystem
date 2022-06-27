import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin:"5px 0",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 20px 0 20px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
});
