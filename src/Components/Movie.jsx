import React, { Component } from "react";
import {
  Col,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import CommentList from "./CommentList";

class Movie extends Component {
  state = {
    callFetch: false,
    selected: false,
    comments: [],
    newComment: {
      comment: "",
      rate: 0,
      elementId: this.props.data.imdbID,
    },
  };

  submitComment = async (e) => {
    e.preventDefault();
    const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
    const response = await fetch(commentsUrl, {
      method: "POST",
      body: JSON.stringify(this.state.newComment),
      headers: new Headers({
        Authorization: "Basic " + btoa("user27:ZGDWyFCA8umbgpvZ"),
        "Content-Type": "application/json",
      }),
    });
    if (response.ok) {
      alert("Comment added");

      this.setState({
        callFetch: true,
        newComment: {
          comment: "",
          rate: 0,
          elementId: this.props.data.imdbID,
        },
      });
    } else {
      alert("An error has occurred");
    }
  };

  handleRadioChange = (e) => {
    let newComment = this.state.newComment;
    newComment.rate = e.currentTarget.id;
    this.setState({ newComment });
  };

  handleCommentText = (e) => {
    let newComment = this.state.newComment;
    newComment.comment = e.currentTarget.value;
    this.setState({ newComment });
  };

  render() {
    return (
      <Col className="mb-2" key={this.props.data.imdbID}>
        <img
          className="img-fluid"
          src={this.props.data.Poster}
          alt="movie"
          onClick={() => {
            this.setState({ selected: !this.state.selected });
          }}
        />
        <Modal
          show={this.state.selected}
          onHide={() => this.setState({ selected: !this.state.selected })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Movie comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="my-3">
              <CommentList
                movieId={this.state.newComment.elementId}
                callFetch={this.state.callFetch}
              />

              <div className="text-center">
                <h5 className="my-3">Add a comment</h5>
                <Form onSubmit={this.submitComment}>
                  <div className="my-3 text-center">
                    <Form.Check
                      inline
                      label="1"
                      type="radio"
                      id="1"
                      name="rating"
                      onClick={this.handleRadioChange}
                    />
                    <Form.Check
                      inline
                      label="2"
                      type="radio"
                      id="2"
                      name="rating"
                      onClick={this.handleRadioChange}
                    />
                    <Form.Check
                      inline
                      label="3"
                      type="radio"
                      id="3"
                      name="rating"
                      onClick={this.handleRadioChange}
                    />
                    <Form.Check
                      inline
                      label="4"
                      type="radio"
                      id="4"
                      name="rating"
                      onClick={this.handleRadioChange}
                    />
                    <Form.Check
                      inline
                      label="5"
                      type="radio"
                      id="5"
                      name="rating"
                      onClick={this.handleRadioChange}
                    />
                  </div>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Write your comment"
                      aria-label="comment"
                      aria-describedby="basic-addon1"
                      onChange={this.handleCommentText}
                      value={this.state.newComment.comment}
                    />
                  </InputGroup>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Col>
    );
  }
}

export default Movie;

    

