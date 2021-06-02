# Learn-By-Planning
CSC-307 Group Project

Project Description:
Learn By Planning is a website for Cal Poly students to use to help themselves stay organized and on top of their work created by Geezer Bar. Students can add ‘tasks’ which can be really anything assignment or event they have that is associated with a class that they are taking. They can have both target and due dates, Target dates are the dates that they would ideally have the assignment done by while Due dates are the actual deadline assigned. There are three ways that you can view your tasks: In a calendar, a list or just the tasks for today.


UI Prototype: https://www.figma.com/file/QTPp0eC0nJNWPiUfoGGk6D/Learn-by-Planning?node-id=164%3A2&frame-preset-name=Desktop

Development Enviornment Set Up: 
frontend terminal: 
    npm i
    npm start
backend terminal:
     $env:FLASK_ENV = "development"
     $env:FLASK_APP = "app.py"
     python -m flask run
     
Diagrams: https://github.com/peter-phillips/Learn-By-Planning.wiki.git

Travis CI Frontend
[![Build Status](https://travis-ci.com/peter-phillips/Learn-By-Planning.svg?branch=main)](https://travis-ci.com/peter-phillips/Learn-By-Planning)

For the javaScript coding style for the frontend, we will use ESLint. Install it with "npm i eslint --save" and add ESLint as an extension for VSCode. Once installed, run "npx eslint" and pick the corresponding options and use the airbnb coding style that does everything for you. Your eslint config file should be JSON and in it, add "linebreak-style": 0 in rules.

For the python coding style for the backend, we will use PEP8 with Pylint. Install it with "pip install pylint", its already built in to VSCode. In VSCode hit Ctrl+Shift+P and select Python: Select Linter and choose pylint to integret highlighing inside of VSCode.
