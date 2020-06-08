import React, { Component } from "react";
import { Badge, ListGroup } from "react-bootstrap";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: this.props.movieId,
      comments: [],
    };
  }
  componentDidMount = () => {
    this.fetchComments();
  };

  fetchComments = async () => {
    const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
    const comments = await fetch(commentsUrl + this.state.movieID, {
      headers: new Headers({
        Authorization: "Basic " + btoa("user30:E6tYs6PBzufRfsVP"),
      }),
    }).then((response) => response.json());
    this.setState({ comments: comments });
  };

  componentWillUnmount = () => {
    console.log("bye bye");
  };
  render() {
    if (this.props.callFetch) {
      this.fetchComments();
    }
    return (
      <>
        {this.state.comments.map((comment) => {
          return (
            <ListGroup key={comment._id}>
              <ListGroup.Item>
                <Badge pill variant="info" className="mr-3">
                  {comment.rate}
                </Badge>
                {comment.comment}
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </>
    );
  }
}
export default CommentList;