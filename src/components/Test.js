import React, { useState } from "react";
import "./Portal.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Finish from "./Finish";

function Test() {
  const data = JSON.parse(localStorage.getItem("arr")) || [];
  const option = JSON.parse(localStorage.getItem("option")) || [];

  const Correct = JSON.parse(localStorage.getItem("Correct")) || [];

  const navigate = useNavigate();
  const [value, setValue] = useState(option);

  const [v, setV] = useState([]);
  const [post, setPost] = useState([]);
  const [cnt, setCnt] = useState(0);
  const ls = JSON.parse(localStorage.getItem("score"))
    ? 0
    : JSON.parse(localStorage.getItem("score"));
  const [score, setScore] = useState(ls);
  const [wrong, setWrong] = useState(0);
  let optionIndex = [];
  let CorrectOpt = [];

  const { _id, _id1 } = useParams();
  const params = useParams();
  console.log(params);
  console.log(_id);
  console.log(_id1);

  const url = "https://dip-kaluse.github.io/examport/portal.json";
  useEffect(() => {
    axios.get(`${url}`).then((res) => {
      const data = res.data.tests.filter((i) => i._id === _id);
      console.log(
        res.data.tests.map((i) => i._id),
        _id
      );

      setPost(data);
      const ind =
        data[0] &&
        data[0].questions.filter((obj, index) => {
          if (obj._id === _id1) {
            console.log(index);
            setCnt(index);
            return index;
          }
        });
    });
  }, []);

  const RemoveItem = () => {
    post[0]?.questions.map((ele) => {
      localStorage.removeItem(ele._id);
    });
  };

  console.log(post);
  const NextHandler = (e) => {
    console.log(post[0].questions[cnt]._id);

    setCnt(post[0].questions.length - 1 >= cnt ? cnt + 1 : cnt);

    const ques = post[0]?.questions.findIndex((q) => q._id === params._id1);
    console.log(ques);

    CorrectOpt = post[0]?.questions[cnt].correctOptionIndex;
    console.log(CorrectOpt);
    optionIndex = JSON.parse(localStorage.getItem(post[0]?.questions[cnt]._id));
    console.log(optionIndex);

    if (Array.isArray(CorrectOpt)) {
      CorrectOpt?.map((i) => {
        console.log(optionIndex[i] == i);
        if (optionIndex[i] == i) {
          localStorage.setItem("score", score + 1);
          setScore((prev) => prev + 1);
          console.log(score);
        }
      });
    } else {
      console.log(CorrectOpt === optionIndex);
      if (optionIndex == CorrectOpt) {
        localStorage.setItem("score", score + 1);
        setScore((prev) => prev + 1);
        console.log(score);
      }
    }

    navigate(`/test/${post[0]._id}/${post[0]?.questions[cnt + 1]._id}`);
  };

  // }
  const prevHandler = (e) => {
    setCnt(cnt - 1);

    const opt = JSON.parse(localStorage.getItem("option"));
    console.log(opt);
    setValue(opt);
    navigate(`/test/${post[0]._id}/${post[0]?.questions[cnt - 1]._id}`);
  };

  const CheckHandler = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      const arr1 =
        JSON.parse(localStorage.getItem(post[0]?.questions[cnt]._id)) || [];
      arr1.push(Number(e.target.value));
      console.log(arr1);
      localStorage.setItem(
        post[0]?.questions[cnt]._id,
        JSON.stringify(arr1.sort())
      );
    } else {
      const data = JSON.parse(
        localStorage.getItem(post[0]?.questions[cnt]._id)
      );
      const a = data.filter((i) => i != e.target.value);
      console.log(a);
      localStorage.setItem(post[0]?.questions[cnt]._id, JSON.stringify(a));
    }
  };

  const RadioHandler = (e) => {
    localStorage.setItem(post[0]?.questions[cnt]._id, Number(e.target.value));
  };

  const FinishHandler = () => {
    navigate(`/finish/${post[0]._id}/${post[0].questions.length}`);
    RemoveItem();
    // localStorage.removeItem(post[0].questions[cnt]._id);
  };

  return (
    <>
      <div class="container">
        <div class="row">
          <h1>My Interview Portal</h1>

          <div class="col-md-12">
            <div class="panel panel-default">
              <label>
                {post?.map((posts, i) => {
                  console.log(_id);
                  return (
                    <div class="panel-heading" key={posts._id}>
                      {posts.name}
                    </div>
                  );
                })}
              </label>
              <div class="panel-body">
                {post?.map((a, i) => {
                  console.log(a);
                  return <label>{a.questions[cnt].questionText}</label>;
                })}
              </div>
              <form>
                <div class="radio">
                  {post?.map((o, i) => {
                    return (
                      <ol>
                        {o.questions[cnt]?.options.map((i, index) => {
                          console.log(o.questions[cnt].options);
                          const b = JSON.parse(
                            localStorage.getItem(post[0]?.questions[cnt]._id)
                          );
                          console.log(b);

                          let checked = b === Number(index);
                          return (
                            <div>
                              <label>
                                <input
                                  className="Checked"
                                  key={i}
                                  type={
                                    o.questions[cnt].type ? "checkbox" : "radio"
                                  }
                                  defaultChecked={
                                    o.questions[cnt].type
                                      ? b && b.includes(Number(index))
                                      : checked
                                  }
                                  onChange={
                                    o.questions[cnt].type
                                      ? (e) => CheckHandler(e)
                                      : (e) => RadioHandler(e)
                                  }
                                  name="option"
                                  value={index}
                                />
                                {i}
                              </label>
                            </div>
                          );
                        })}
                      </ol>
                    );
                  })}
                </div>
              </form>

              <div class="panel-footer">
                <button
                  href="test.html"
                  class="btn btn-success"
                  disabled={cnt === 0}
                  name="option"
                  // onChange={ChangeHandler}
                  onClick={prevHandler}
                >
                  Previous
                </button>
                <button
                  href="test.html"
                  class="btn btn-success"
                  disabled={post[0]?.questions.length - 1 === cnt}
                  onClick={NextHandler}
                >
                  Next
                </button>
                <button
                  class="pull-right btn btn-danger"
                  onClick={FinishHandler}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
