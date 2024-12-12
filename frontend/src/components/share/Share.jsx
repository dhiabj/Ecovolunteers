import './share.scss';
import Image from '../../assets/imgs/img.png';
import Map from '../../assets/imgs/map.png';
import Friend from '../../assets/imgs/friend.png';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Button } from '@mui/material';

const Share = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={`http://localhost:5000/uploads/${auth.img}`} alt="" />
          <input
            type="text"
            placeholder={`${auth.firstname}, share your volunteering experiences!`}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: 'none' }} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <Button variant="contained">Share</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
