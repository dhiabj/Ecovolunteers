const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN;
const API_AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const getToken = async () => {
  if (VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API"
    );
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();
    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async ({ token }) => {
  try {
    console.log(token)
    const url = `https://api.videosdk.live/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlZTc1NzNiZi0wMjA3LTQ3NzktYTNjYS1kZTRhYmM5Mzg2MjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4MzQ4MTQ1NywiZXhwIjoxNjg2MDczNDU3fQ.1W4WVv26xTQYVx_WZ4kh4-kVAB9ihsNGG3mK0CkTNZs", "Content-Type": "application/json" },
  };

  const { roomId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("error", error));

  return roomId;
  } catch (error) {console.log(error)
    
  }
};

export const validateMeeting = async ({ roomId, token }) => {
  
  const url = `https://api.videosdk.live/v2/rooms/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlZTc1NzNiZi0wMjA3LTQ3NzktYTNjYS1kZTRhYmM5Mzg2MjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4MzQ4MTQ1NywiZXhwIjoxNjg2MDczNDU3fQ.1W4WVv26xTQYVx_WZ4kh4-kVAB9ihsNGG3mK0CkTNZs", "Content-Type": "application/json" },
  };

  const result = await fetch(url, options)
    .then((response) => response.json()) //result will have meeting id
    .catch((error) => console.error("error", error));
console.log("test")
  return result ? result.roomId === roomId : false;
};
