import React, { useEffect, useState } from "react";
import axios from "axios";

const calculateNearestPoint = async (centerPoint, otherPoints) => {
  const request = {
    units: "metric",
    origins: centerPoint,
    destinations: otherPoints.join("|"),
    key: "AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ",
  };

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: request,
      }
    );

    const { rows } = response.data;
    const distances = rows[0].elements.map((element) => element.distance.value);
    const minDistance = Math.min(...distances);
    const nearestPointIndex = distances.indexOf(minDistance);
    const nearestPoint = otherPoints[nearestPointIndex];

    return nearestPoint;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const AppDistance = () => {
  const [nearestPoint, setNearestPoint] = useState(null);

  useEffect(() => {
    const centerPoint = "Washington, DC";
    const otherPoints = ["New York City, NY", "Chicago, IL", "Los Angeles, CA"];

    const fetchData = async () => {
      const result = await calculateNearestPoint(centerPoint, otherPoints);
      setNearestPoint(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Nearest Point: {nearestPoint}</h1>
    </div>
  );
};

export default AppDistance;
