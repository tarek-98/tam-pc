import axios from "axios";

const commentService = {
  async getComments(id) {
    return axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    ); // Assuming your API endpoint for fetching comments is /api/comments
  },
  async addComment(body, id) {
    return fetch("https://jsonplaceholder.typicode.com/posts/1/comments", {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body: body,
        Id: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json)); // Assuming your API endpoint for adding comments is /api/comments
  },
  async removeComment(commentId) {
    return axios.delete(
      `/https://jsonplaceholder.typicode.com/comments/${commentId}`
    ); // Assuming your API endpoint for deleting comments is /api/comments/:id
  },
  async getReplies(commentId) {
    return axios.get(
      `/https://jsonplaceholder.typicode.com/comments/${commentId}/replies`
    );
  },
  async addReply(commentId, reply) {
    return axios.post(
      `/https://jsonplaceholder.typicode.com/comments/${commentId}/replies`,
      reply
    );
  },
};

export default commentService;
