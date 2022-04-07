import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { navigate } from "react-router-dom";
import Test from "./Test";

function Finish() {
  const data = JSON.parse(localStorage.getItem("arr"));
  const score = JSON.parse(localStorage.getItem("score"));
  const wrong = JSON.parse(localStorage.getItem("wrong"));

  console.log(wrong);
  console.log(score);

  const [value, setValue] = useState(data);
  const [post, setPost] = useState([]);
  const [cnt, setcnt] = useState(0);

  const { _id, question_length } = useParams();
  // localStorage.removeItem(_id);
  console.log(question_length);

  const navigate = useNavigate();
  console.log(_id);

  const url = "https://dip-kaluse.github.io/examport/portal.json";
  useEffect(() => {
    axios.get(`${url}`).then((res) => {
      console.log(res.data.tests);
      const val = res.data.tests.filter((each) => each._id === _id);
      setPost(val);
    });
    return () => {
      navigate("/");
    };
  }, []);
  console.log(post);

  const ClickHandler = () => {
    navigate("/");
    localStorage.clear();
  };
  return (
    <>
      <div class="container">
        <div class="row">
          <h1>My Interview Portal</h1>

          <div class="col-md-12">
            <div class="panel panel-default">
              {post &&
                post.map((posts, i) => {
                  return (
                    <div class="panel-heading" key={posts._id}>
                      {posts.name} - Result
                    </div>
                  );
                })}
              <div class="panel-body">
                <center>
                  {post?.map((a, i) => {
                    return (
                      <>
                        <h2 class="">
                          Total no of Questions:{a.questions.length}
                        </h2>
                        <h3 class="text-success">Correct Answers:{score}</h3>
                        <h3>
                          <span class="text-danger">
                            Wrong Answers:{question_length - score}
                          </span>
                        </h3>
                      </>
                    );
                  })}

                  <button
                    href="test.html"
                    class="btn btn-success"
                    onClick={ClickHandler}
                  >
                    {" "}
                    Home
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Finish;
