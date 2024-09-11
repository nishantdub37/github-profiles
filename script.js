//DOM Elements
let form = document.querySelector('form');
let input = document.querySelector('.search');
let userInfo = document.querySelector('.user-info');
let userImage = document.querySelector('.user-img');
let userName = document.querySelector('.user-name');
let userDesc = document.querySelector('.user-desc');
let Followers = document.querySelector('.followers');
let Following = document.querySelector('.following');
let numOfRepos = document.querySelector('.public-repos');
let repos = document.querySelectorAll('.repo');
let emptyEl = document.querySelector('.empty');


//API links
const API_USER = 'https://api.github.com/users/';


form.addEventListener('submit',(e) => {
    e.preventDefault();
    getInfo();
})

async function getInfo()
{
    const res = await fetch(API_USER + input.value);
    const data = await res.json();
    const res_repo = await fetch(`https://api.github.com/users/${input.value}/repos?per_page=5`);
    const data_repo = await res_repo.json();
    showUserInfo(data,data_repo);
}

function showUserInfo(userData,repoData)
{
    input.value = '';
    if(userData.status == '404')
    {
        userInfo.classList.remove('active');
        emptyEl.classList.add("active");
    }
    else
    {
        emptyEl.classList.remove('active');
        userInfo.classList.add('active');
        const {id,name,bio,public_repos,followers,following} = userData;
        console.log(followers);
        userImage.setAttribute("src",`https://avatars.githubusercontent.com/u/${id}?v=4`);
        userName.innerText = name;
        userDesc.innerText = bio;
        Followers.innerText = `${followers} Followers`;
        Following.innerText = `${following} Following`;
        numOfRepos.innerText = `${public_repos} Repos`;
        repos.forEach((repo,index) => {
            repo.innerText = repoData[index].name;
        })
    }
   
}



