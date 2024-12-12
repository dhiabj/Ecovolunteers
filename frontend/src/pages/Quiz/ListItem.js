import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchQustion,
  addMark,
  attempQues,
} from '../../actions/QuestionAction';
import { Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';

const ListItem = (props) => {
  const [select, setSelect] = useState(false);
  const [ans, setAns] = useState('');
  // const[bgColor,setbgColor]=useState("green");

  useEffect(() => {
    setSelect('');
  }, [props, ans]);

  const handleRadio = (e) => {
    setSelect(e.target.value);
  };
  const handleSubmit = (correct, id) => {
    console.log('Correct answer for current question:', correct);
    console.log(ans, correct);
    if (ans === '') {
      console.log(select);
      return;
    }
    props.attempQues(id);
    if (correct === ans) {
      props.addMark();
    }

    setAns('');
    setSelect(true);
  };
  const handleInputState = (item) => {
    setAns(item);
    // return setAns("");
  };
  const { item, attempt, timeout } = props;

  if (timeout < 0) {
    return <Navigate to="/result" />;
  }

  return (
    <div>
      <>
        {item && attempt && attempt.includes(item._id) ? (
          <p class="attempted-text">Attempted</p>
        ) : (
          ''
        )}
        <h2>{item && item.que_title}</h2>
        {item && (
          <div onChange={handleRadio} className="qs_list">
            <div
              onClick={() => handleInputState('a')}
              style={{
                backgroundColor: ans === 'a' ? 'red' : 'green',
                height: '30px',
                width: '30px',
                borderRadius: '50%',
              }}
              className="child_left_list">
              {' '}
              A
            </div>
            <div className="child_right_list">
              <p>{item && item.option1}</p>
            </div>
            {/* <input type="radio" value="a" name="a" />  */}
          </div>
        )}
        {item && (
          <div onChange={handleRadio} className="qs_list">
            <div
              onClick={() => handleInputState('b')}
              style={{
                backgroundColor: ans === 'b' ? 'red' : 'green',
                height: '30px',
                width: '30px',
                borderRadius: '50%',
              }}
              className="child_left_list">
              {' '}
              B
            </div>
            <div className="child_right_list">
              <p> {item && item.option2}</p>
            </div>

            {/* <input type="radio" value="b" name="a" /> */}
          </div>
        )}
        {item && (
          <div onChange={handleRadio} className="qs_list">
            <div
              onClick={() => handleInputState('c')}
              style={{
                backgroundColor: ans === 'c' ? 'red' : 'green',
                height: '30px',
                width: '30px',
                borderRadius: '50%',
              }}
              className="child_left_list">
              {' '}
              C
            </div>
            <div className="child_right_list">
              <p> {item && item.option3}</p>
            </div>

            {/* <input type="radio" value="c" name="a" /> */}
          </div>
        )}

        {item && (
          <div onChange={handleRadio} className="qs_list">
            <div
              onClick={() => handleInputState('d')}
              style={{
                backgroundColor: ans === 'd' ? 'red' : 'green',
                height: '30px',
                width: '30px',
                borderRadius: '50%',
              }}
              className="child_left_list">
              {' '}
              D
            </div>
            <div className="child_right_list">
              <p>{item && item.option4}</p>
            </div>

            {/* <input type="radio" value="d" name="a" />  */}
          </div>
        )}

        <hr />
        {item &&
          (!(attempt && attempt.includes(item._id)) ? (
            <>
              {ans === '' ? (
                <Button variant="secondary" size="lg" disabled>
                  Block
                </Button>
              ) : (
                <Button
                  variant="success"
                  style={{ backgroundColor: '#3aaf9f' }}
                  onClick={() => handleSubmit(item.ans, item._id)}>
                  Confirm
                </Button>
              )}
            </>
          ) : (
            <Button variant="secondary" size="lg" disabled>
              LOCKED
            </Button>
          ))}
      </>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    item: state.questions.getQuestion,
    attempt: state.questions.attempt_qus,
    timeout: state.questions.timeOut,
  };
};
export default connect(mapStateToProps, { fetchQustion, addMark, attempQues })(
  ListItem
);
