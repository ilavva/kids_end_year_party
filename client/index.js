function load_json(list_url, callback) {
    fetch(list_url)
        .then((response) => response.json())
        .then((json) => {
            if (json["status"] == "OK") {
                return callback(json["message"]);
            }
            return callback(json);
        });
}
function loadData() {
    const listLoadData = document.querySelectorAll(".load_data");
    if (listLoadData.length > 0) {
        for (let index = 0; index < listLoadData.length; index++) {
            const elemLoadData = listLoadData[index];
            //<ol class="question load_data" data-src="northwindsqlexer1.json" show-solutions="no">
            const data_src_filename = elemLoadData.getAttribute("data-src");
            const url = `http://localhost:8080/${data_src_filename}`;
            const data_template = elemLoadData.getAttribute("data-template");
            load_json(url, (json) => {
                elemLoadData.innerHTML = create_html(json, data_template);
            });
        }
    }
}
loadData();