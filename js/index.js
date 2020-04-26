let searchForm = document.querySelector("#github-form")
let userList = document.querySelector("#user-list")
let reposList = document.querySelector("#repos-list")

let searchBySelect = document.createElement("select")
let userOption = document.createElement("option")
userOption.innerText = "User"
let repoOption = document.createElement("option")
repoOption.innerText = "Repo"
searchBySelect.append(userOption, repoOption)

searchForm.prepend(searchBySelect)


searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let searchTerm = evt.target.elements.search.value
    let searchBy = evt.target.elements[0].value
    if (searchBy === "User") {
        userSearch(searchTerm)
    } else {
        repoSearch(searchTerm)
    }
})

function addResult(result) {
    let resultLi = document.createElement("li")
    resultLi.className = "#result-li"
    
    let resultImg = document.createElement("img")
    resultImg.className = "profile-img"
    resultImg.src = result.avatar_url
    
    let resultUsername = document.createElement("div")
    resultUsername.innerText = result.login
    resultUsername.className = "username"
    
    let resultProfile = document.createElement("a")
    resultProfile.href = result.html_url
    resultProfile.target = "_blank"
    resultProfile.innerText = "Profile"
    
    resultLi.append(resultImg, resultUsername, resultProfile)
    userList.append(resultLi)
    
    resultLi.addEventListener("click", (evt) => {
        getUserRepo(result.login)
    })
}

function resetChildren(element) {
    let child = element.lastElementChild
    while (child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}

function userSearch(searchTerm) {
    fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
        headers: {'Accept': 'application/vnd.github.v3+json'}
    })
    .then(r => r.json())
    .then((results) => {
        resetChildren(userList)
        results.items.forEach((result) => {addResult(result)})
    });
}

function getUserRepo(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {'Accept': 'application/vnd.github.v3+json'}
    })
    .then(r => r.json())
    .then((results) => {
        console.log(results)
        resetChildren(reposList)
        results.forEach((result) => {displayRepo(result)})
    });
}

function repoSearch(searchTerm) {
    fetch(`https://api.github.com/search/repositories?q=${searchTerm}`, {
        headers: {'Accept': 'application/vnd.github.v3+json'}
    })
    .then(r => r.json())
    .then((results) => {
        resetChildren(userList)
        results.items.forEach((result) => {displayRepo(result)})
    });
}

function displayRepo(result) {
    let repoLi = document.createElement("li")
    repoLi.className = "#result-li"
    
    let repoName = document.createElement("div")
    repoName.innerText = result.name
    repoName.className = "username"
    
    let repoPage = document.createElement("a")
    repoPage.href = result.html_url
    repoPage.target = "_blank"
    repoPage.innerText = "Repo Page"
    
    repoLi.append(repoName, repoPage)
    reposList.append(repoLi)
}