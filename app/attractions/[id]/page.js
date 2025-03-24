import React from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

export async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/attractions/${id}`
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function page(context) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return <Typography variant="h6">API URL is not set</Typography>;
  }

  const { params } = context;
  const id = params.id;
  const data = await getData(id);

  if (!data) {
    return <Typography variant="h6">Not found</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{ height: 400 }}
          image={data.coverimage}
          title={data.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.detail}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
