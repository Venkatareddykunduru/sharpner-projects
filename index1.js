document.addEventListener("DOMContentLoaded", displayvegdata);

function handle(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;
    const form = document.querySelector("form");

    const vegdata = {
        name: name,
        price: price,
        quantity: quantity
    };

    // Send data to server
    axios
        .post("https://crudcrud.com/api/a57ceb6f5bf546da92a08731e30ecc4a/vegshop", vegdata)
        .then((response) => {
            addtolist(response.data);
        })
        .catch((err) => {
            console.log("err: in posting data to the server: " + err);
        });

    form.reset();
}

function addtolist(vegdata) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(
            `${vegdata.name}  RS:${vegdata.price}  ${vegdata.quantity}KG`
        )
    );

    const inputBtn = document.createElement("input");
    inputBtn.id = "priceupdate";
    inputBtn.placeholder = "0";
    userItem.appendChild(inputBtn);

    const buyBtn = document.createElement("button");
    buyBtn.appendChild(document.createTextNode("Buy"));
    userItem.appendChild(buyBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    buyBtn.addEventListener("click", function () {
        const buyQuantity = inputBtn.value;
        vegdata.quantity -= buyQuantity;

        axios
            .put(`https://crudcrud.com/api/a57ceb6f5bf546da92a08731e30ecc4a/vegshop/${vegdata._id}`, vegdata)
            .then(response => {
                userItem.childNodes[0].nodeValue = `${vegdata.name}  RS:${vegdata.price}  ${vegdata.quantity}KG`;
            })
            .catch(error => console.log(error));
    });

    deleteBtn.addEventListener("click", function () {
        axios
            .delete(`https://crudcrud.com/api/a57ceb6f5bf546da92a08731e30ecc4a/vegshop/${vegdata._id}`)
            .then(() => {
                userList.removeChild(userItem);
            })
            .catch(error => console.log(error));
    });
}

function displayvegdata() {
    axios
        .get("https://crudcrud.com/api/a57ceb6f5bf546da92a08731e30ecc4a/vegshop")
        .then((response) => {
            const data = response.data;
            const userList = document.querySelector("ul");
            userList.innerHTML = "";
            data.forEach(element => {
                addtolist(element);
            });
        })
        .catch(error => console.log(error));
}

//document.querySelector("form").addEventListener("submit", handle);
