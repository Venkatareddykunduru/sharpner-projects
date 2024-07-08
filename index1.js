document.addEventListener('DOMContentLoaded', getusers);

async function handle(event) {
    event.preventDefault();
    try{
    const name = event.target.name.value;
    const phone=event.target.phone.value;
    const email=event.target.email.value;
    const data = {
        name: name,
        phone:phone,
        email:email
    };

    const response=await axios.post(`http://localhost:3000/adduser`, data)
        
    addtolist(data);
        
        
    }catch(err){
        console.log(err);
    }

    event.target.reset();
}

function addtolist(data) {
    const useritem = document.createElement('li');
    const userlist = document.getElementById('userlist');
    //name
    const textNode = document.createTextNode(`${data.name}  ${data.phone}  ${data.email} `);
    useritem.appendChild(textNode);

    //delete button
    const deletebtn=document.createElement('button');
    deletebtn.textContent='Delete';
    useritem.appendChild(deletebtn);

    userlist.appendChild(useritem);

    deletebtn.addEventListener('click',()=>{
        axios.delete(`http://localhost:3000/deleteuser/${data.name}`)
        .then(()=>{
            userlist.removeChild(useritem);
        })
    });
}

function getusers() {
    axios.get(`http://localhost:3000/`)
        .then(response => {
            const data = response.data;
            data.forEach(element => {
                addtolist(element);
            });
        })
        .catch(err => {
            console.log('Error in fetching data from the server: ', err);
        });
}





