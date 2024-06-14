function load_json(list_url, callback) {
    //console.log(list_url);
    fetch(list_url)
        .then((response) => response.json())
        .then((json) => {
            return callback(json);
        });
}


function create_html(json, template_name) {

    let html = "";

    //console.log(json);


    for (let [i, v] of Object.entries(json)) {
        const item_name = v["item_name"];
        const item_id = v["id"];
        const owner_name = v["owner_name"];
        let classname = "card";
        if (template_name === "freeItems") {
            classname = "cardFree";
        }
        html += `<div class="${classname}" item-id="${item_id}">`;

        if (template_name === "takenItems") {
            html += ` <span class="name">${owner_name}</span>`;
        }
        html += `  <span class="item">${item_name}</span>`;

        html += `</div>`;
    }


    if (template_name === "freeItems") {
        html += `<div class="cardFree colored" item-id="0">  <span class="item">מהשהו נוסף</span></div>`;
    }
    return html;
}

function takeCard() {
    const id = this.getAttribute('item-id');
    const item_name = this.innerHTML;
    console.log(id, item_name);
    const cardToTake = document.querySelector(".takeItemToBring");
    cardToTake.style.display = "block";
}

function loadData() {
    const listLoadData = document.querySelectorAll(".load_data");
    if (listLoadData.length > 0) {
        for (let index = 0; index < listLoadData.length; index++) {
            const elemLoadData = listLoadData[index];

            const data_src_filename = elemLoadData.getAttribute("data-src");
            const url = `http://localhost:8080/${data_src_filename}`;
            const data_template = elemLoadData.getAttribute("data-template");
            load_json(url, (json) => {
                elemLoadData.innerHTML = create_html(json, data_template);
                const freeCards = document.querySelectorAll(".cardFree");
                for (item of freeCards) {
                    const id = item.getAttribute("item-id");
                    const name = item.innerText;
                    item.addEventListener("click", takeCard);
                }
            });
        }
    }
}

loadData();