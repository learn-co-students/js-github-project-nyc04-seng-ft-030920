const githubForm = document.getElementById('github-form')
const githubContainer = document.getElementById('')
const usersList = document.getElementById('user-list')
const userRepoList = document.getElementById('repos-list')



githubForm.addEventListener("submit" , function(evt){
    evt.preventDefault()
    let userInput = evt.target["search"].value
    console.log(userInput)
    fetch(`https://api.github.com/search/users?q=${userInput}`)
    .then(r => r.json())
    .then(userContent => {
        userContent.items.forEach(element => {
            render(element)
        })
    })
    




})

function render(userContent) {
     
     let header = document.createElement('h2')
     header.innerText = userContent.login
     let a = document.createElement('a')
     a.href = userContent.url 
     a.innerText = "link to page"
     let img = document.createElement('img')
     img.src = userContent.avatar_url
     img.alt = "githubb pictures"
     usersList.append(header , a, img )

     header.addEventListener('click' , function(evt){
        let repo = evt.target.innerText
      fetch(`https://api.github.com/users/${repo}/repos`)
      .then(r => r.json())
      .then(userRepo => {
         
          
           userRepo.forEach(repo => {
               usersList.remove()
               renderRepo(repo)
           })
      })




     })


}

function renderRepo(userData){
   

  let header = document.createElement('h2')
   header.innerText = userData.name
   let li = document.createElement('li')
   li.innerText = userData.html_url
   userRepoList.append(header, li)



}