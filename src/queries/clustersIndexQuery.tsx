const clusterIndexQuery = async () => {
  const response = await fetch(process.env.REACT_APP_CLUSTERS_INDEX_URL!);
  return await response.json();
};

export default clusterIndexQuery;
