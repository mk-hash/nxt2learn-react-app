import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import Tooltip from "@material-ui/core/Tooltip";

import SubTopics from "./SubTopics";

import CONCEPTS from "../data/concepts.json";

const nextLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

export default function Topics(props) {
  const { id } = useParams();

  const [concept, setConcept] = useState({});
  const [topTopics, setTopTopics] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicNow, setTN] = useState(0);

  useEffect(() => {
    const tconcept = CONCEPTS.filter(c => c.id === +id);
    if (!tconcept.length) {
      setConcept({});
    } else {
      setConcept(tconcept[0]);
      setTopTopics(tconcept[0].sections || []);
    }
  }, [id]);

  useEffect(() => {
    if (!!topTopics.length && !topics.length) {
      let localTopics = JSON.parse(localStorage.getItem("topic-" + id));

      if (!localTopics) {
        setTopics(concept.topics);
      } else {
        setTopics(localTopics.topics);
      }
    }
  }, [concept, topTopics, topics, id]);

  function gotoTopic(pos) {
    if (pos < 0 || pos >= topTopics.length) {
      //console.log("Can't go there ...");
      return;
    } else {
      //console.log("POS: " + pos);
      setTN(pos);
    }
  }

  function onStatusUpdate(topicsId, status) {
    const ttopics = topics.map(t => {
      if (t.id === topicsId) {
        if (status === "na") {
          delete t["status"];
          return Object.assign({}, t);
        } else {
          return Object.assign({}, t, { status });
        }
      }
      return t;
    });
    localStorage.setItem("topic-" + id, JSON.stringify({ topics: ttopics }));
    setTopics(ttopics);
  }

  function startOver() {
    //@TODO: show notification about clearing
    localStorage.removeItem("topic-" + id);
    setTopics(concept.topics);
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
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

        {concept.id !== undefined && !!topTopics.length && (
          <Card>
            <CardHeader
              action={[
                <Tooltip title="Erase existing status and start fresh" key={1}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={startOver}
                  >
                    Start Over
                  </Button>
                </Tooltip>
              ]}
              title={concept.title}
              subheader="Check your understanding"
            />
            <CardContent>
              <Stepper alternativeLabel activeStep={topicNow}>
                {topTopics.map(t => (
                  <Step key={t.id}>
                    <StepLabel>{t.title}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <br />

              {!!topTopics.length && (
                <SubTopics
                  topTopic={topTopics[topicNow]}
                  topics={topics}
                  onStatusUpdate={onStatusUpdate}
                ></SubTopics>
              )}

              <br />
              <Grid container justify="center">
                <Grid container item justify="space-around">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => gotoTopic(topicNow - 1)}
                    disabled={topicNow === 0}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    to={"/c/" + id + "/report"}
                    component={nextLink}
                  >
                    View Report
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => gotoTopic(topicNow + 1)}
                    disabled={
                      !topTopics.length || topicNow === topTopics.length - 1
                    }
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}
