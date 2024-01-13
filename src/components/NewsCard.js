import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

export default function NewsCard({ item }) {
  return (
    <>
      <div style={{ padding: 10 }}>
        <Card sx={{ maxWidth: 345, height: 450 }}>
          <Link style={{ color: "black" }} to={item.link}>
            <CardActionArea>
              <CardMedia component="img" height="140" image={item.image_url} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
