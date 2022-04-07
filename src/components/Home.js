import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Home() {
  const data = JSON.parse(localStorage.getItem("arr"));
  const [value, setValue] = useState(data);
  const [post, setPost] = useState([]);

  //localStorage.setItem("option",[])
  const url = "https://dip-kaluse.github.io/examport/portal.json";

  useEffect(() => {
    axios.get(`${url}`).then((res) => {
      console.log(res.data.tests);
      setPost(res.data.tests);
      setValue(localStorage.setItem("arr", JSON.stringify(res.data)));
    });
  }, []);

  console.log(post);

  return (
    // getData()

    <>
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>

          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ paddimg: "5px", margin: "5px" }}>Test</th>
                  <th>No of Questions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {post &&
                  post.map((posts) => {
                    console.log(posts?.questions[0]._id);
                    return (
                      <tr>
                        <td>{posts.name}</td>
                        <td>{posts.questions.length}</td>
                        <td>
                          <Link
                            to={`/test/${posts._id}/${posts?.questions[0]._id}`}
                            class="btn btn-warning"
                          >
                            Start Test
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
