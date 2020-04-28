let searchForm = document.querySelector("form#github-form")
let userList = document.querySelector("ul#user-list")
let userRepo = document.querySelector("ul#repos-list")


searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    userList.innerHTML = ""
    userRepo.innerHTML = ""
    let formName = evt.target.search.value
    fetch(`https://api.github.com/search/users?q=${formName}`, {
        headers: {Accept: "application/vnd.github.v3+json"}
    }).then(r => r.json())
        .then((searchObj) => {
            searchObj.items.forEach((eachObj) => {
                makeUserToLi(eachObj)
                searchForm.reset()
            })
        })
})

function makeUserToLi (obj) {
    let objLi = document.createElement("li")

    let objName = document.createElement("p")
    objName.classList.add("obj-name")
    objName.innerText = obj.login

    let objAvatar = document.createElement("img")
    objAvatar.classList.add("obj-avatar")
    objAvatar.src = obj.avatar_url

    let objLink = document.createElement("a")
    objLink.href = obj.html_url
    objLink.innerText = obj.html_url
    objLink.target = "_blank"

    objLi.append(objName, objAvatar, objLink)
    userList.append(objLi)

    objLi.addEventListener("click", (evt) => {
        fetch(`http://api.github.com/users/${obj.login}/repos`, {
            headers: {Accept: "application/vnd.github.v3+json"}
        }).then(r => r.json()).then((repoArray) => {
                repoArray.forEach ((repo) => {
                    userRepo.innerHTML = ""
                    
                    let repoLi = document.createElement("li")

                    let repoName = document.createElement("div")
                    repoName.classList.add("repo-name")
                    repoName.innerText = repo.name

                    let repoDesc = document.createElement("p")
                    repoDesc.classList.add("repo-desc")
                    repoDesc.innerText = repo.description

                    let repoLink = document.createElement("a")
                    repoLink.href = repo.html_url
                    repoLink.innerText = repo.html_url
                    repoLink.target = "_blank"

                    repoLi.append(repoName, repoDesc, repoLink)
                    userRepo.append(repoLi)

                })
            })
    })

}