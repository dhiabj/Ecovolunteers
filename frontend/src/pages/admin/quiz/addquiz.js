import React, { useState } from 'react';
import axios from 'axios';
import "./quiz.css";

function AddQuiz() {
    const [title, setTitle] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
    
        const question = {
            que_title: title,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            ans: answer
        }
    
        console.log(question);
    
        axios.post('http://localhost:5000/question/addQuestion', question)
            .then(res => console.log(res.data));
    
        setTitle('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswer('');
    }
    
    return (
        <div className="question-details">
            <h2>Add New Question</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>A: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>B: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>C: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={option3}
                        onChange={(e) => setOption3(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>D: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={option4}
                        onChange={(e) => setOption4(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Answer: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>
<br></br>
                <div className="form-group">
                    <input type="submit" value="Add Question" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default AddQuiz;
