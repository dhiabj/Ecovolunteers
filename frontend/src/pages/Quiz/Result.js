import React, { useState } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';

const Result = ({ mark, totalQuestions }) => {
  const [show, setShow] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const percentage = Math.round((mark / totalQuestions) * 100);
  useEffect(() => {
    const assignPoints = async () => {
      try {
        const response = await axios.put(
          `http://localhost:5000/Question/assignPoints/${auth._id}`,
          { score: percentage }
        );
        setAuth(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    assignPoints();
    swal('', 'You successfully submitted You test', 'success');
  }, []);
  const handleDownloadCertificate = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = 'italic 90px Garamond';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      const textY = canvas.height / 2;
      const lineHeight = 50;
      const textPadding = 50;
      ctx.fillText(
        `${auth.firstname}  ${auth.lastname}`,
        canvas.width / 2,
        textY - lineHeight - textPadding
      );
      ctx.font = 'bold 90px Georgia';
      ctx.fillText(
        `You have achieved a score of ${percentage}%`,
        canvas.width / 2,
        textY + textPadding
      );
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'certificate.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    img.src = 'imgs/certificate.png';
  };

  const sendEmail = async () => {
    try {
      const email = auth.email;
      const subject = 'Your Quiz Results';
      let message = `Hello ${auth.username}, your quiz results are: ${mark} out of ${totalQuestions} (${percentage}%)`;

      const response = await axios.post(
        'http://localhost:5000/api/sendresultttt',
        {
          email,
          subject,
          message,
        }
      );

      if (response.data.success) {
        swal('Success', 'Results sent to your email', 'success');
      } else {
        swal('Error', 'Failed to send email', 'error');
      }
    } catch (error) {
      console.error(error);
      swal('Error', 'Failed to send email', 'error');
    }
  };

  return (
    <div className="login_container">
      <Button
        variant="primary"
        onClick={() => {
          handleShow();
          sendEmail();
        }}
        id="check_score">
        Check Result
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="modal_full">
          <img
            src={`http://localhost:5000/uploads/${auth.img}`}
            srcset=""
            id="result_img"
          />
          <p>{auth.username}</p>
          <p id="mark">
            Your score: {mark && `${mark} / ${totalQuestions}`} ({percentage}%)
          </p>
          {percentage > 25 && (
            <Button
              variant="success"
              onClick={handleDownloadCertificate}
              id="quiz_certificat">
              Download Certificate
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.questions.mark);
  return {
    mark: state.questions.mark,
    totalQuestions: state.questions.questions.length,
  };
};

export default connect(mapStateToProps)(Result);
