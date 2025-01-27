function display() {
    fetch("http://localhost:3000/data")
    .then((res) => res.json())
    .then((data) => {
        const table = document.querySelector("table");
        table.innerHTML = "";
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>ROLL NO</th>
            <th>NAME</th>
            <th>BRANCH</th>
            <th>CGPA</th>
            <th>OPERATIONS</th>
        `;
        table.appendChild(headerRow);
        data.forEach((element) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${element.rollno}</td>
                <td>${element.name}</td>
                <td>${element.branch}</td>
                <td>${element.cgpa}</td>
                <td>
                    <button class="fa fa-trash" onclick="Delete(${element.id})"></button>
                    <button class="fa fa-edit" onclick="Update(${element.id})"></button>
                </td>
            `;
            table.appendChild(row);
        });
    });
}

function Delete(id){
    fetch(`http://localhost:3000/data/${id}`,{method:"DELETE"})
    .then((response)=>{
        console.log("DELETED SUCCESSFULLY")
        display()
    })
    .catch((err)=>console.log('error'))
}   

function insert(){
    var id1=Math.round(Math.random()*1000).toString()
    var rollno1 = document.getElementById('rollno').value
    var name1 = document.getElementById('name').value
    var branch1 = document.getElementById('branch').value
    var cgpa1 = document.getElementById('cgpa').value
    fetch(`http://localhost:3000/data`,{method:"POST", body:JSON.stringify({
        "id":`${id1}`,
        "rollno":`${rollno1}`,
        "name":`${name1}`,
        "branch":`${branch1}`,
        "cgpa":`${cgpa1}`
    })})
    .then((response)=>{
        console.log("INSERTED SUCCESSFULLY")
        display()
    })
    .catch((err)=>console.log('error'))
}   

function Update(idx){
    var cgpa1 = document.getElementById('cgpa').value
    fetch(`http://localhost:3000/data/${idx}`,{method:"PATCH", body:JSON.stringify({
        "cgpa":`${cgpa1}`
    })})
    .then((response)=>{
        console.log("UPDATED SUCCESSFULLY")
        display()
    })
    .catch((err)=>console.log('error'))
}   
