import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function Climb() {
  const [climb, setClimb] = useState(null);
  const { id } = useParams();
  const { user_id } = useParams();

  const getClimb = useCallback((user_id, id) => {
    fetch(`/api/climb/${user_id}/${id}`)
      .then((response) => response.json())
      .then((climb) => {
        setClimb(climb);
      })
      .catch((error) => {
        console.error("Error fetching climb:", error);
      });
  }, []);

  useEffect(() => {
    getClimb(user_id, id);
  }, [user_id, getClimb]);
  return (
    <div>
      {climb && (
        <h4>
          This is the climb from {climb.date} at {climb.location}
        </h4>
      )}
    </div>
  );
}