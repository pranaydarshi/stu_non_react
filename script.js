console.log("JS")
const getDetails = async (req, res) => {
    try {

        let response = await fetch("http://localhost:2002/getDetails")
        let result = await response.json()
        // result.map(data => {
        //     console.log(data)
        // })
        const details = document.getElementById("getDetails")
        details.innerHTML =
            `
        ${result.map(data => {
                return ` <h1>
                
                ${data.name}
               
               <button id="edit" name=${data._id}   onclick="handleEditClick(event)">Edit</button>
               <button id="edit" name=${data._id} onclick="handleDeleteClick(event)">Delete</button>

                </h1>`

            }).join("")}
        `

        // let edit = document.querySelectorAll('#edit');
        // edit.forEach(button => {

        //     button.addEventListener('click', (e) => {
        //         console.log("Button Clicked", e.target)
        //         let ed = document.getElementById('editdetails')
        //         ed.innerHTML = "Hello"
        //     })
        // })

    } catch (err) {
        console.log(err)
    }

}
getDetails()
function handleDeleteClick(e) {
    console.log("Button Clicked", e.target.name)
    let id = e.target.name
    fetch(`http://localhost:2002/deleteuser/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => { console.log(response) })
        .then(data => { console.log(data) })
    console.log(id)
}
function handleEditClick(e) {
    console.log("Button Clicked", e.target.name);
    let id = e.target.name
    let ed = document.getElementById("main");
    ed.innerHTML = `
    <form action="" onsubmit="updatedetails(event)">
    UserName: <input type="text" name=${id} id="uname" placeholder="Enter Name" required>
    <br>
    RollNo: <input type="text" name="" id="rollno" placeholder="Enter Roll No" required>
    <br>
    Year : <input type="text" name="" id="year" placeholder="Enter Year" / required>
    <br>
    Branch : <input type="text" name="" id="branch" placeholder="Enter Branch" required/ >
    <br>
    Phone Number : <input type="number" name="" id="phno" placeholder="Enter Phone Number" required />
    <br>
    <input type="submit" value="Update">
    <input type="reset" value="Reset">
</form>
    `


}
const updatedetails = (e) => {


    e.preventDefault()
    console.log("update button invoked")
    console.log(e)
    let name = document.getElementById("uname").value;
    let rollno = document.getElementById("rollno").value;
    let year = document.getElementById("year").value;
    let branch = document.getElementById("branch").value;
    let phno = document.getElementById("phno").value;
    let id = e.target[0].name
    fetch(`http://localhost:2002/updateuser/${id}`, {
        method: "PATCH", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
            name, rollno, year, branch, phno
        })
    }).then(response => response.status)

}


function addDetails(e) {
    console.log("Button Clicked", e.target);
    let adddetails = document.getElementById("addDetails")
    adddetails.innerHTML = `
    <form action="" onsubmit="submitdetails(event)">
        UserName: <input type="text" name="" id="uname" placeholder="Enter Name" required>
        <br>
        RollNo: <input type="text" name="" id="rollno" placeholder="Enter Roll No" required>
        <br>
        Year : <input type="text" name="" id="year" placeholder="Enter Year" / required>
        <br>
        Branch : <input type="text" name="" id="branch" placeholder="Enter Branch" /required>
        <br>
        Phone Number : <input type="number" name="" id="phno" placeholder="Enter Phone Number" /required>
        <br>
        <input type="submit" value="Add">
        <input type="reset" value="Reset">
    </form>
    `
}
const submitdetails = (e) => {
    try {
        e.preventDefault();
        console.log("Submit button invoked")
        let name = document.getElementById("uname").value;
        let rollno = document.getElementById("rollno").value;
        let year = document.getElementById("year").value;
        let branch = document.getElementById("branch").value;
        let phno = document.getElementById("phno").value;
        fetch("http://localhost:2002/addDetails", {
            method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, rollno, year, phno, branch })
        }).then((response) => {
            response.json()

        }).then(data => {
            console.log(data)
        }).catch((e) => { console.log(e) })
        alert("Success Submited")
    }
    catch (err) {
        console.error(err)
    }
}