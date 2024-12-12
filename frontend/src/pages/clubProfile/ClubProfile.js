import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './clubProfile.scss';
import ClubProfileLeft from '../../components/clubProfileLeft/ClubProfileLeft';
import ClubProfileRight from '../../components/clubProfileRight/ClubProfileRight';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api/api';

const ClubProfile = () => {
  const { id } = useParams();
  const [club, setClub] = useState({});

  useEffect(() => {
    const getClub = async () => {
      try {
        const response = await axios.get(`${baseURL}/clubs/club/${id}`);
        setClub(response.data);
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClub();
  }, [id]);

  return (
    <Row className="club-profile g-0">
      <Col md={4} className="mb-3">
        <ClubProfileLeft club={club} setClub={setClub} />
      </Col>
      <Col md={8}>
        <ClubProfileRight club={club} setClub={setClub} />
      </Col>
    </Row>
  );
};

export default ClubProfile;
