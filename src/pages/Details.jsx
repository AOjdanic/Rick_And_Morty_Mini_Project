import { useParams } from "react-router-dom";

function Details() {
  const params = useParams();
  const { id } = params;
  return <div>{id}</div>;
}

export default Details;
