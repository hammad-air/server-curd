const getUsers = () => {
    axios.get('https://hello-world-crud.herokuapp.com/users')
        .then(response => {
            showData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
const showData = data => {
    let renderData = document.querySelector("#renderData")
    renderData.innerHTML = "";
    data.map(userData => {
        if (userData.index != undefined) {
            renderData.innerHTML += `<tr><td>${userData.index}</td><td>${userData.name}</td><td>${userData.email}</td><td>${userData.address}</td></tr>`
        }
    });
}
const setUser = () => {
    let userName = document.querySelector("#userName"), email = document.querySelector("#email"), address = document.querySelector("#address");
    submitData(userName.value, email.value, address.value);
    userName.value = "", email.value = "", address.value = "";
}
const getUser = () => {
    let userID = document.querySelector("#id");
    (userID.value == "") ? getUsers() : getUserFromDB(userID.value);
    userID.value = "";
}

const getUserFromDB = userID => {
    axios.get(`https://hello-world-crud.herokuapp.com/user/${userID}`)
        .then(response => {
            const makeArr = [response.data];
            showData(makeArr);
        })
        .catch(function (error) {
            console.log(error);
        })
}
const editUser = () => {
    let userID = document.querySelector("#id"), userName = document.querySelector("#editUserName"), userEmail = document.querySelector("#editEmail"), userAddress = document.querySelector("#editAddress");
    if (userID.value) { editUserDB(userID.value, userName.value, userEmail.value, userAddress.value); }
    userID.value = "", userName.value = "", userEmail.value = "", userAddress.value = "";
}
const editUserDB = (id, name, email, address) => {
    if (name) { axios.put(`https://hello-world-crud.herokuapp.com/user/${id}`, { name }).then(res => getUsers()); }
    if (email) { axios.put(`https://hello-world-crud.herokuapp.com/user/${id}`, { email }).then(res => getUsers()); }
    if (address) { axios.put(`https://hello-world-crud.herokuapp.com/user/${id}`, { address }).then(res => getUsers()); }
}
const deleteUser = () => {
    let userID = document.querySelector("#id");
    if (userID.value) { axios.delete(`https://hello-world-crud.herokuapp.com/user/${userID.value}`).then(() => getUsers()); }
    userID.value = "";
}
const submitData = (name, email, address) => {
    axios.post('https://hello-world-crud.herokuapp.com/user', { name, email, address })
        .then(response => {
            getUser();
        })
        .catch(err => {
            console.log(err);
        })
}