const URL_OPEN_DATA_GET =
  "/api/current_package_list_with_resources";

  /**
   * getData("/pendler")
   */

function getData(url) {
  window
    .fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((r) =>r.json())
    .then((data) => alert(JSON.stringify(data)));
}



