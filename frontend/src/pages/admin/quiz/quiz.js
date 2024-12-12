import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./quiz.css"
function Quiz() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/question/question/${id}`)
      .then(response => response.json())
      .then(data => setQuestion(data))
      .catch(error => console.error(error));
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    
    const confirmed = window.confirm('Are you sure you want to delete this question?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/question/deleteQuestion/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data.message);
      toast.success('deleted successfully!');
      // Redirect to another page after successful deletion
    } catch (error) {
      console.error(error);
    }
  }


  

  const handleSaveClick = () => {
    const { que_title, option1, option2, option3, option4, ans } = question;
    fetch(`http://localhost:5000/question/updateQuestion/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ que_title, option1, option2, option3, option4, ans }),
    })
      .then(response => response.json())
      .then(data => {
        setQuestion(data);
        setIsEditing(false);
      })
      .catch(error => console.log(error));
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setQuestion(prevQuestion => ({ ...prevQuestion, [name]: value }));
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  if (isEditing) {
    return (
        
        <div className="question-details">
        <h2>Edit Question</h2>
        <form>
          <label>
            Title:
            <input type="text" name="que_title" value={question.que_title} className="title-input" onChange={handleInputChange} />

          </label>
          <label>
            A
            <input type="text" name="option1" value={question.option1} onChange={handleInputChange} />
          </label>
          <label>
            B
            <input type="text" name="option2" value={question.option2} onChange={handleInputChange} />
          </label>
          <label>
            C
            <input type="text" name="option3" value={question.option3} onChange={handleInputChange} />
          </label>
          <label>
            D
            <input type="text" name="option4" value={question.option4} onChange={handleInputChange} />
          </label>
          <label>
            Answer:
            <input type="text" name="ans" value={question.ans} onChange={handleInputChange} />
          </label>
          <button type="button" onClick={handleSaveClick}>Save</button>
          </form>
              </div>
            );
          }
          
          return (
            <div className="question-details">
              <h2>Question Details</h2>
              <form>
                <label>
                  Title:
                  <input type="text" name="que_title" value={question.que_title} readOnly />
                </label>
                <label>
                  A
                  <input type="text" name="option1" value={question.option1} readOnly />
                </label>
                <label>
                  B
                  <input type="text" name="option2" value={question.option2} readOnly />
                </label>
                <label>
                  C
                  <input type="text" name="option3" value={question.option3} readOnly />
                </label>
                <label>
                  D
                  <input type="text" name="option4" value={question.option4} readOnly />
                </label>
                <label>
                  Answer:
                  <input type="text" name="ans" value={question.ans} readOnly />
                </label>
                <button type="button" onClick={handleEdit}>Edit</button>
      <button type="button"className='question-details-delete-button' onClick={handleDelete}>Delete</button>
              </form>
            </div>
          );
        }
    
    export default Quiz;