import useFetch from "../../hooks/useFetch";
import axios from 'axios';
import { useContext, useEffect,useState } from "react";

const Featured = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        axios.get('http://localhost:5000/events')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
  const { data, loading, error } = useFetch(
    `http://localhost:5000/events/countByType?types=""}`
    
  );
console.log(data);
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
                 {currentItems.map(user => (
                                        <tr key={user.username} className="alert" role="alert">
                                            <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{user.type}</h1>

              <h2>{`http://localhost:5000/events/countByType?types=${user.type}`} properties</h2>
            </div>
          </div>
                           

                                            
                                        </tr>
                                    ))}
          

          
          
        </>
      )}
    </div>
  );
};

export default Featured;