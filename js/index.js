let gitForm = document.querySelector("#github-form")
let userList = document.querySelector('#user-list')

gitForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    input = evt.target.search.value
    searchApi(input)
    evt.target.reset()
})

function searchApi(input){
    fetch(`https://api.github.com/search/users?q=${input}`)
    .then(r => r.json())
    .then(obj => {
        listResults(obj)
    })
}

function listResults(results){

    results.items.forEach((result) => {
        let username = result.login
        let avatar = result.avatar_url
        let url = result.html_url
        createLi(username, avatar, url)
    })
}

function createLi(username, avatar, url){
    let blankLi = document.createElement('li')
    blankLi.className = 'result-li'
    
    let blankImg = document.createElement('img')
    blankImg.className = 'avatar'
    blankImg.src = avatar

    let blankDiv = document.createElement('div')
    blankDiv.className = 'username'
    blankDiv.innerText = username

    let blankA = document.createElement('a')
    blankA.className = 'url'
    blankA.href = url
    blankA.innerText = "View Profile"
    blankA.target = '_blank'

    blankLi.append(blankImg, blankDiv, blankA)
    userList.append(blankLi)

    blankDiv.addEventListener("click", () => getRepos(username))
}

function getRepos(user) {
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(r => r.json())
    .then(obj => {
        userList.innerText = ""
        obj.forEach(repo => {
            let name = repo.name
            let url = repo.html_url
            displayRepos(name, url)
        })
    })
}


function displayRepos(name, url) {
    let blankLi = document.createElement('li')

    let blankA = document.createElement('a')
    blankA.class = 'repo'
    blankA.innerText = name
    blankA.href = url

    blankLi.append(blankA)
    userList.append(blankLi)
    
}