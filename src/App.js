import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // pending -> resolved (success) or rejected (failure)
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    //console.log("Add");
    const obj = {
      title: "This is Shuja Ashraf Shah",
      body: "Software Engineer....",
    };
    const { data: post } = await axios.post(apiEndpoint, obj);
    const posts = [post, ...this.state.posts]; //adding the newly added post at the beginning of the list.
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    console.log("Update", post);
    post.title = "This post is updated now";
    await axios.put(apiEndpoint + "/" + post.id, post);
    const posts = [...this.state.posts]; //cloning the posts array
    const index = posts.indexOf(post); // we need to find the index of the post in this array
    posts[index] = { ...post }; // now we go to the index, create a new object and spread
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await axios.delete(apiEndpoint + "/" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("This post has already been deleted or could not be found");
      } else {
        console.log("logging the error", ex);
        alert("An unexpected error occured...");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
