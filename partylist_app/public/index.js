const server_url = "";
//const server_url = 'https://kidspartydata.netlify.app'
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
            html += `  <span class="item">${item_name}</span>`;
        }
        else {
            html += `  ${item_name}`;
        }


        html += `</div>`;
    }


    if (template_name === "freeItems") {
        html += `<div class="cardFree colored" item-id="0">  <span class="item">מהשהו נוסף</span></div>`;
    }
    return html;
}

function takeCard() {
    const item_id = this.getAttribute('item-id');
    const item_name = this.innerHTML;
    document.querySelector('#form_item_id').value = item_id;
    const qw = document.querySelector('#additional_item_name');
    if (item_id !== '0') {
        
        qw.value = item_name;
        qw.disabled = true;
    } else {
        qw.disabled = false;
    }

    window.location.href = '#takeItemToBring';
}

function SaveToList() {
    const item_id = document.querySelector('#form_item_id').value;
    const item_owner_name = document.querySelector('#form_item_owner_name').value
    if (item_id === '0') {
        const additional_item_name = document.querySelector('#additional_item_name').value;
        let data = { item_name: additional_item_name, owner_name: item_owner_name };
        const url = `${server_url}/list`;
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',//'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then((response) => response.json())
            .then((json) => {
                loadData();
                window.location.href = '#listToBring';
                return;
            });;
    } else {
        const url = `${server_url}/list/${item_id}`;
        let data = { owner_name: item_owner_name };
        fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',//'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then((response) => response.json())
            .then((json) => {
                loadData();
                window.location.href = '#listToBring';
                return;
            });;
    }

}

function loadData() {
    const listLoadData = document.querySelectorAll(".load_data");
    if (listLoadData.length > 0) {
        for (let index = 0; index < listLoadData.length; index++) {
            const elemLoadData = listLoadData[index];

            const data_src_filename = elemLoadData.getAttribute("data-src");
            const url = `${server_url}/${data_src_filename}`;
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