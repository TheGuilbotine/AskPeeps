# AskPeeps by Pierre Guilbault
<p align=center>
  <img src='https://github.com/TheGuilbotine/AskPeeps/blob/main/react-app/src/images/askpeeps-logo.png' alt='A logo of AskPeeps' />
</p>

### A safe place for people to ask any and all questions on their minds, to get answers from other curious and interested people from around the globe.

## <p align=center>App Link</p>
# <p align=center><a href='https://askpeeps.herokuapp.com/'>AskPeeps</a></p>

## Technologies used
- <a href="https://www.python.org/"><img alt="Python" src="https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=Python&logoColor=white&" /></a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/-HTML5-E34F26?logo=HTML5&logoColor=ffffff" /></a>
- <a href="https://flask.palletsprojects.com/en/1.1.x/"><img alt="Flask" src="https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=Flask&logoColor=white" /></a>
- <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL" /></a>
- <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/-React-61DAFB?logo=React&logoColor=333333" /></a>
- <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/-Redux-764ABC?logo=Redux" /></a>
- <a href=https://www.sqlalchemy.org/><img src=https://img.shields.io/badge/-SQLAlchemy-red /></a>

## Brief Site Walkthrough
- Splash page allows users to access login, register, or use a Demo account to check out the app. Along with a biref description of the apps purpose.

<p align=center>
  <img src='https://github.com/TheGuilbotine/AskPeeps/blob/main/splash-ss.png' alt='Splash Page' />
</p>

- All pages have a footer with links to the creators GitHub and Linkedin accounts as well as links to their other projects.

- The Feed Page allows users to view the questions feed, click to see responses to each question and add their own responses. They also have their own questions sidebar where they can see the questions they have asked as well as ask their own question. They can edit or delete any question or response they have asked.

<p align=center>
  <img src='https://github.com/TheGuilbotine/AskPeeps/blob/main/feed-ss.png' alt='Feed Page' />
</p>

- This is essentially a one page app. All of the actual app interaction will happen in the feed page.
 
<p align=center>
  <img src='https://github.com/TheGuilbotine/AskPeeps/blob/main/sidebar-ss.png' alt='Questions Sidebar' />
</p>

- The Responses drop down populates just under each question dynamically.

<p align=center>
  <img src='https://github.com/TheGuilbotine/AskPeeps/blob/main/responses-ss.png' alt='Responses Drop Down' />
</p>

## Installation
To build/run project locally, please follow these steps:

1. Clone this repository

```shell
git clone https://github.com/{github-handle}/{app-name}.git
```

2. Install Pipfile dependencies and create the virtual environment
```shell
pipenv install
```

2. Install npm dependencies for the `/react-app`

```shell
cd react-app
npm install
```

3. In the `/` root directory, create a `.env` based on the `.env.example` with proper settings

4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file

5. Before running any flask commands, confirm you are in the pipenv virtual env. If not, run the command:
```shell
pipenv shell
```

5. In the root folder, create the database by running in the terminal:
```shell
flask db init
```

6. In the root folder, migrate tables to the database by running in the terminal:
```shell
flask db migrate
```

7. In the root folder, seed the database by running in the terminal:
```shell
flask seed all
```

8. Start the flask backend in the `/` root directory
```shell
flask run
```

9. Start the frontend in the `/react-app` directory

```javascript
npm start
```


## Challenges
- Some rerenders were diffiuct to implement smoothly, but eventually were mastered with creating a new slice of state for specifically the users information and related resources because of the nested nature of responses in questions coming from the backend.
- Finding a way to allow only one drop down to open when clicking on a Responses drop down div button. I was breaking my code into many components and did not bring the function to open and close the div into the right component.
- Edit was being difficult for a while beacuse of idx being used for keys instead of the id of the object mapped from the questions and responses arrays.

## Future Features
<li>Search Questions</li>
<li>Flag inappropriate or inaccurate content</li>
<li>Yes vote or No vote content</li>
<li>Tag questions</li>
<li>Chat</li>

## Special Thanks to some great coders
- <a href='https://github.com/nicopierson'>Nico Pierson</a>
- <a href='https://github.com/andru17urdna'>Andru Watkins</a>
- <a href='https://github.com/lemlooma'>Lema El-Sherbiny</a>
- <a href='https://github.com/hnrywltn'>Henry Walton</a>
- <a href='https://github.com/makon57'>Mana Kong</a>
- <a href='https://github.com/meagan13'>Meagan Smith</a>
- <a href='https://github.com/Simonvargas'>Simon Vargas</a>
- <a href='https://github.com/Jubintgh'>Jubin Taghdir</a>
- <a href='https://github.com/tkenned2020'>Torrell Kennedy</a>
- <a href='https://github.com/theflaggship'>Monte Flagg</a>
- <a href='https://github.com/michellekontoff'>Michelle Kontoff</a>
