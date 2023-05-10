<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
   <a href="http://nestjs.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" width="200" alt="Nest Logo" /></a>
</p>



# Github-Oauth-App

Introducing our web app that simplifies the process of creating a GitHub repository. With our user-friendly interface, you can quickly authorize your GitHub account and create a new repository with just a few clicks. Say goodbye to the hassle of navigating GitHub's complex settings and commands. Our app streamlines the process, making it easy for both beginners and experienced developers to create a new repository. Additionally, our app allows you to customize your repository's name, description, and other details. Whether you're working on a personal project or collaborating with a team, our app makes it easy to get started on GitHub. Try it out today and experience the convenience of creating a new repository in seconds!


## Tech Stack

**Client:**  Html , Css , Javascript

**Server:** Nest.js


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in root directory

for getting the bellow credentials please reffer the bellow url 
https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app


```bash
GITHUB_CLIENT_ID= YOUR_CLIENT_ID
GITHUB_SECRET= YOUR_APP_SECRET
PORT= 5100
```
## Installation

Install my-project with npm

```bash
  git clone https://github.com/Kallyan01/github-oauth-nestjs.git
  cd github-oauth-nestjs
  npm install
  npm run start
```
    
## API Reference

#### OAuth login

```http
  GET /auth/user
```
Redirect You to github OAuth Popup , where you have to grant permission to access all the repo read & Write data

#### OAuth callback

```http
  GET /auth/gitoauth-callback
```

| Body | Type     | 
| :-------- | :------- | 
| `code`      | `string` 

Generate the accessToken for you 

#### Create Repository

```http
  POST /user/create_repo
```

| Header | Type     |  Required| 
| :-------- | :------- |  :------- | 
| `authorization`      | `Bearer` | `true` 

| Body | Type     |  Description| 
| :-------- | :------- |  :------- | 
| `name`      | `String` | `Repo Name`
| `description`      | `String` | `Repo Description` 

Generate the accessToken for you 





