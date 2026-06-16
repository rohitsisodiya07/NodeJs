import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QueryData = () => {
  const navigate = useNavigate();
  const { city, age } = useParams();
  const [data, setData] = useState([]);

  log

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/greaterAgeCity/${city}/${age}`,
      );

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city, age]);

  console.log(">>>>>>>query", data);

  return <div>Query Data</div>;
};

export default QueryData;
