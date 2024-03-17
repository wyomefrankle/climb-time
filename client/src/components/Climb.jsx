import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Climb() {
  const [climb, setClimb] = useState(null);
  const { id } = useParams();
  const { user_id } = useParams();

  const getClimb = async () => {
    try {
      const response = await fetch(`/api/climbs/wyomefrankle/${id}`);
      const climb = await response.json();
      setClimb(climb);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getClimb(user_id);
  }, [id]);
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