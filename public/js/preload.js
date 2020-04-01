axios
  .get("/storeIp")
  .then(response => {
    console.log(response);
  })
  .catch(err => {});
