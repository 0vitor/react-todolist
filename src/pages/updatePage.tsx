import { useParams } from "react-router-dom";

function UpdatePage() {
  const { id } = useParams<number>();
  return (
    <div className="updatePage">
      <h1>igor, unaldo e pedro {id}</h1>
    </div>
  );
}

export { UpdatePage };
