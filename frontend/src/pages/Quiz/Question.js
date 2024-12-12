import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import ListItem from "./ListItem";
import { Button, ProgressBar, Modal } from "react-bootstrap";
import NavbarQuiz from "./NavbarQuiz";
import { connect } from "react-redux";
import { fetchQustions, clearQsState } from "../../actions/QuestionAction";
import { useNavigate } from 'react-router-dom';

let labelValue;

const Question = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { fetchQustions, questions, mark, attempt } = props;
  
  
  
  
  
  useEffect(() => {
   
      fetchQustions();


    return () => {
      // clearQsState();
    };
  }, [fetchQustions, props.history]);

  if (questions && attempt) {
    labelValue = (attempt.length / questions.length) * 100;
  }
  const handleResult = () => {
    console.log("Submitting test...");
    navigate("/result");
  };
  
  return (
    <>
      <NavbarQuiz />
      <div className="qs_container">
        <div className="qs_left">
          <QuestionList data={questions && questions.length ? questions : ""} />
        </div>
        <div className="qs_right">
          <ListItem />
        </div>
        <div className="mark_side">
          {questions && attempt ? (
            <>
              <p>
                {" "}
                <span className="mark_att">{questions.length}</span>{" "}
                <span className="obliege"> /</span>
                <span className="mark_att"> {attempt.length}</span>
              </p>
              <ProgressBar
                variant="warning"
                now={`${labelValue}`}
                label={`${questions.length}/ ${attempt.length} `}
                id="progression"
              />
            </>
          ) : (
            ""
          )}
          {/* <p>mark:{mark}</p> */}
          <div id="attemp_qs">
            <Button variant="outline-danger"></Button> Unattempted question
          </div>
          <div id="unattemp_qs">
            <Button variant="success"></Button> Attempted question
          </div>
          <div>
            <Button variant="primary" onClick={handleShow} id="test_submit">
              Confirm Test
            </Button>
          </div>

          <Modal show={show} onHide={handleClose}>
            <div className="modal_full">
              <h3>Do,You want to submit Your test ? </h3>
              <div id="modal_div">
                <Button variant="primary" onClick={handleResult} id="modal_btn_y">
                  Yes
                </Button>
                <Button variant="danger" onClick={handleClose} id="modal_btn_n">
                  No
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions && state.questions.questions,
    mark: state.questions && state.questions.mark,
    attempt: state.questions && state.questions.attempt_qus,
  };
};

export default connect(mapStateToProps, { fetchQustions, clearQsState })(
  Question
);
