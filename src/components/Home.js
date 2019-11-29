import React from "react";
import Concepts from "./Concepts";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import lightBlue from "@material-ui/core/colors/lightBlue";
import orange from "@material-ui/core/colors/orange";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <Box bgcolor="primary.main" className="box">
        <Typography variant="h2" className="text-white">
          nxt2learn React App
        </Typography>
        <div className="mb-4"></div>
        <Typography variant="h4" className="text-white">
          Welcome to nxt2learn React App!
        </Typography>
        <div className="mb-4"></div>
        <Typography variant="h6" className="text-white">
          This app is a simple tool to help you track your progress on some of
          the given topics. You can use it as a review tool to test your
          understanding. The app uses a very simple json schema, if you are
          interested you can even add new topics.
        </Typography>
        <div className="mb-2"></div>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          href="https://github.com/mk-hash/nxt2learn-react-app"
        >
          View on GitHub
        </Button>
      </Box>
      <Box className="box">
        <Typography variant="h3" color="primary">
          Pick a topic to get started
        </Typography>

        <div className="mb-4"></div>
        <Concepts></Concepts>
      </Box>
      <Box bgcolor={orange[200]} className="box">
        <Typography variant="h3">How it works?</Typography>
        <div className="mb-2"></div>
        <Grid container justify="space-evenly" alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Card style={{ textAlign: "center", margin: "2%" }}>
              <CardContent>
                <Grid container justify="center" alignItems="center">
                  <Avatar
                    variant="circle"
                    style={{ fontSize: "2em", backgroundColor: lightBlue[500] }}
                  >
                    1
                  </Avatar>
                </Grid>
                <br />
                <Typography variant="h6">
                  Begin by clicking on a topic from the list above. This will
                  take you to the topic's page where you have a number of
                  sections.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ textAlign: "center", margin: "2%" }}>
              <CardContent>
                <Grid container justify="center" alignItems="center">
                  <Avatar
                    variant="circle"
                    style={{ fontSize: "2em", backgroundColor: lightBlue[500] }}
                  >
                    2
                  </Avatar>
                </Grid>
                <br />
                <Typography variant="h6">
                  Each section has a number of sub-topics. Use the icons to mark
                  sub-topics as todo(to read/review), or done(completed).
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ textAlign: "center", margin: "2%" }}>
              <CardContent>
                <Grid container justify="center" alignItems="center">
                  <Avatar
                    variant="circle"
                    style={{ fontSize: "2em", backgroundColor: lightBlue[500] }}
                  >
                    3
                  </Avatar>
                </Grid>
                <br />
                <Typography variant="h6">
                  Once you are done reviewing topics click on View Report to go
                  to the report page where you can view your choices at a
                  glance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
