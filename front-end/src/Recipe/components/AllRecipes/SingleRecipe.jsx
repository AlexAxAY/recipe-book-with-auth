import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const SingleRecipe = ({ recipe }) => {
  return (
    <div
      style={{
        display: "inline-block",
        justifyContent: "center",
        marginBottom: "10px",
        marginRight: "10px",
        marginLeft: "10px",
      }}
    >
      <Card sx={{ maxWidth: 345, minWidth: 345, textAlign: "center" }}>
        <CardActionArea component={Link} to={`/recipes/${recipe._id}`}>
          <CardMedia
            component="img"
            height="140"
            image={recipe.image}
            alt="food"
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Created by {recipe.createdBy?.name || "Unknown"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default SingleRecipe;
