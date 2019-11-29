import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

// Concepts Data File
import CONCEPTS from "../data/concepts.json";

export default function Concepts() {
  const data = CONCEPTS;

  const [concepts, setConcepts] = useState([]);

  useEffect(() => {
    async function getData() {
      setConcepts(data);
    }
    if (!concepts.length) {
      getData();
    }
  }, [concepts, data]);

  return (
    <Grid container>
      {concepts.map(concept => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={concept.id}>
          <Box
            bgcolor="secondary.main"
            style={{
              padding: "5%",
              margin: "2%",
              textAlign: "center"
            }}
          >
            <Link
              to={"/c/" + concept.id}
              style={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="h3">{concept.title}</Typography>
            </Link>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
