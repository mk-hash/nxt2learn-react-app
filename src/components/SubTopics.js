import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";

import Typography from "@material-ui/core/Typography";

import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";

export default function SubTopics(props) {
  function updateTopics(topic_id, status) {
    //console.log("Topic #" + topic_id + "\tStatus: " + status);
    props.onStatusUpdate(topic_id, status);
  }
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={10}>
        {props.topics
          .filter(tt => tt.parent_id === props.topTopic.id)
          .map(topic => (
            <Paper key={topic.id} style={{ marginBottom: "5%" }}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  {topic.status !== "todo" && (
                    <Tooltip title="Mark as todo">
                      <IconButton
                        aria-label="todo"
                        color="secondary"
                        onClick={() => updateTopics(topic.id, "todo")}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  {topic.status !== "done" && (
                    <Tooltip title="Completed">
                      <IconButton
                        aria-label="done"
                        color="primary"
                        onClick={() => updateTopics(topic.id, "done")}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  {!!topic.status && (
                    <Tooltip title="Reset Choice">
                      <IconButton
                        aria-label="reset choice"
                        onClick={() => updateTopics(topic.id, "na")}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1">{topic.title}</Typography>
                </Grid>

                <Grid item xs={2}>
                  {!!topic.status && (
                    <Chip
                      size="small"
                      color={topic.status === "done" ? "primary" : "secondary"}
                      label={topic.status.toUpperCase()}
                    ></Chip>
                  )}
                </Grid>
              </Grid>
            </Paper>
          ))}
      </Grid>
    </Grid>
  );
}
