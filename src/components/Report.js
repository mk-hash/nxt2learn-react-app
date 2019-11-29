import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import AddIcon from "@material-ui/icons/AddCircle";
import CheckIcon from "@material-ui/icons/CheckCircle";
import HelpIcon from "@material-ui/icons/Help";

import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import CONCEPTS from "../data/concepts.json";

const nextLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));
export default function Report(props) {
  const { id } = useParams();
  let concept = CONCEPTS.filter(c => c.id === +id);
  if (!concept.length) {
    concept = {};
  } else {
    concept = concept[0];
  }
  const localTopics = JSON.parse(localStorage.getItem("topic-" + id));

  const [topTopics] = useState(concept.sections || []);
  const [topics] = useState(!localTopics ? [] : localTopics.topics);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={10}>
        <br />

        {concept.id === undefined && (
          <Card>
            <CardHeader
              action={[
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  key={1}
                  to={"/"}
                  component={nextLink}
                >
                  Back to Home
                </Button>
              ]}
              title={"No Such Topic Here"}
            />
            <CardContent>
              <Box
                bgcolor="error.main"
                style={{ padding: "2%", color: "white", marginBottom: "2%" }}
              >
                <p>Sorry! Couldn't find the topic you were looking for.</p>
                <p>
                  In the mean time you can try other topics from the home page.
                </p>
              </Box>
            </CardContent>
          </Card>
        )}

        {concept.id !== undefined && !topTopics.length && (
          <Card>
            <CardHeader
              action={[
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  key={1}
                  to={"/"}
                  component={nextLink}
                >
                  Back to Home
                </Button>
              ]}
              title={concept.title}
            />
            <CardContent>
              <Box
                bgcolor="primary.main"
                style={{ padding: "2%", color: "white", marginBottom: "2%" }}
              >
                <p>
                  Sorry! No data is available for this topic at the moment.
                  Please check back later.
                </p>
                <p>
                  In the mean time you can try other topics from the home page.
                </p>
              </Box>
            </CardContent>
          </Card>
        )}

        {!!topTopics.length && !topics.length && (
          <Card>
            <CardHeader
              action={[
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  key={1}
                  to={"/c/" + id}
                  component={nextLink}
                >
                  Back to Topic
                </Button>
              ]}
              title={concept.title}
            />
            <CardContent>
              <br />
              <Box
                bgcolor="primary.main"
                style={{ padding: "2%", color: "white", marginBottom: "2%" }}
              >
                <p>
                  Sorry! Not enough data is available for a report on this topic
                  at the moment.
                </p>
                <p>
                  Please visit the topic page and make some selections, and then
                  you can view the report.
                </p>
              </Box>
            </CardContent>
          </Card>
        )}
        {/* TODO */}
        {!!topTopics.length && !!topics.length && (
          <Card>
            <CardHeader
              action={[
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  key={1}
                  to={"/c/" + id}
                  component={nextLink}
                >
                  Back to Topic
                </Button>
              ]}
              title={concept.title}
            />
            <CardContent>
              <br />
              <Grid container>
                {topTopics.map(tt => (
                  <Grid item xs={12} sm={6} lg={4} key={tt.id}>
                    <Card style={{ margin: "1%" }}>
                      <CardHeader title={tt.title} />
                      <CardContent>
                        {topics
                          .filter(t => t.parent_id === tt.id)
                          .map(topic => (
                            <Grid
                              container
                              alignItems="center"
                              key={topic.id}
                              className={"mb-2"}
                            >
                              <Grid item xs={2}>
                                {topic.status === "todo" && (
                                  <Tooltip title="ToDo">
                                    <AddIcon color="secondary"></AddIcon>
                                  </Tooltip>
                                )}
                                {topic.status === "done" && (
                                  <Tooltip title="Done">
                                    <CheckIcon color="primary"></CheckIcon>
                                  </Tooltip>
                                )}
                                {!topic.status && (
                                  <Tooltip title="No Response">
                                    <HelpIcon color="action"></HelpIcon>
                                  </Tooltip>
                                )}
                              </Grid>
                              <Grid item xs={10}>
                                <Typography
                                  variant="body1"
                                  color={
                                    topic.status === "done"
                                      ? "primary"
                                      : topic.status === "todo"
                                      ? "secondary"
                                      : "textSecondary"
                                  }
                                  style={{
                                    fontStyle: !topic.status
                                      ? "italic"
                                      : "normal",
                                    fontWeight:
                                      topic.status === "todo"
                                        ? "bold"
                                        : "normal"
                                  }}
                                >
                                  {topic.title}
                                </Typography>
                              </Grid>
                            </Grid>
                          ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}
