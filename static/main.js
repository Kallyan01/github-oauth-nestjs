let form = document.querySelector('form');
const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN =
  URL_PARAMS.get('token') || window.localStorage.getItem('gitoauthtoken');
console.log(TOKEN);
// Show an element
const show = (selector) => {
  document.querySelector(selector).style.display = 'block';
};

// Hide an element
const hide = (selector) => {
  document.querySelector(selector).style.display = 'none';
};

async function getUser(token) {
  console.log('here');
  let headersList = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  let response = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: headersList,
  });

  const user = await response.json();
  document.querySelector('.uname').innerHTML = user?.login;
}

const getRepos = async (token) => {
  let headersList = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  let response = await fetch('https://api.github.com/user/repos', {
    method: 'GET',
    headers: headersList,
  });

  let repos = await response.json();
  return repos;
};

function renderRepo(name, link) {
  hide('.createrepo');
  // create parent element
  const container = document.createElement('div');
  container.className = 'repo';
  const repolist = document.querySelector('.repo_list');
  // create paragraph element with name
  const nameElement = document.createElement('p');
  nameElement.textContent = name;

  // create anchor element with link
  const linkElement = document.createElement('a');
  linkElement.textContent = 'Visit Website';
  linkElement.href = link;

  // append name and link elements to parent element
  container.appendChild(nameElement);
  container.appendChild(linkElement);

  // append parent element to end of body
  repolist.appendChild(container);
}

if (TOKEN) {
  hide('.content.unauthorized');
  show('.content.authorized');
  show('.content-area');
  setTimeout(() => {
    hide('.content.authorized');
  }, 1000);
  window.localStorage.setItem('gitoauthtoken', TOKEN);
  getUser(TOKEN);
  getRepos(TOKEN).then((repos) => {
    // console.log(repo);
    repos.map((repo) => {
      renderRepo(repo.name, repo.clone_url);
    });
  });
} else {
  hide('.navbar');
}

function openCreateRepoForm() {
  show('.createrepo');
}

function closeCreateRepoForm() {
  hide('.createrepo');
}

form?.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  let formData = new FormData(form);
  let data = Object.fromEntries(formData);
  event.preventDefault();
  let headersList = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  };

  let bodyContent = JSON.stringify({
    name: data?.name,
    description: data?.description,
  });

  let response = await fetch('/user/create_repo', {
    method: 'POST',
    body: bodyContent,
    headers: headersList,
  });

  let repo = await response.json();

  const parent = document.querySelector('.repo_list');
  const children = parent?.querySelectorAll('div');
  children?.forEach((child) => child.remove());
  getRepos(TOKEN).then((repos) => {
    // console.log(repo);
    repos.map((repo) => {
      renderRepo(repo.name, repo.clone_url);
    });
  });
  console.log(repo);
}
