import { Measurement } from "../types/responses/measurement";

const MeasurementIndexQuery = (clusterId: string) => {
  return async () => {
    var response = await fetch(
      `${process.env.REACT_APP_APIGATEWAY_URL}/clusters/${clusterId}/measurements`
    );
    var measurement: Measurement[] = await response.json();
    return measurement;
  };
};

export default MeasurementIndexQuery;
