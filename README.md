# Task Manager

This is a task management application with a React frontend and a .NET Core backend.

## Features

- Add, update, and delete tasks
- View a list of tasks
- Responsive UI using Material-UI

## Prerequisites

- .NET Core SDK 8.x or later
- Visual Studio or Visual Studio Code
- SQL Server (or any other database specified in `appsettings.json`)

## Setup Instructions
## Backend .NET Core 8

This is the backend for the Task Manager application built using .NET Core. Follow the steps below to set up and run the backend on your local machine.


1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/taskmanager.git](https://github.com/raz121991/taskmanager.git
   cd taskmanager/backend

 2. **Restore Dependencies**
enter the command in cmd:
dotnet restore
3. **Configure the Database**
   go to appsetting.json and make sure to update the Connectionstring  under connectionstrings to have your sql server name properly set there.
4. **Apply Database Migrations**
   in cmd type:  dotnet ef database update
   
   Ensure that the Entity Framework Core CLI tools are installed if the command above does not work:
  dotnet tool install --global dotnet-ef
5. **Run the Application**
   dotnet run

   make sure you see swagger open and can execute the different api's via the browser.

   ## Client ReactJS

   1. **Navigate to the Frontend Directory**
   2. **install Dependencies**
      npm install
   start the frontend server:
     npm start
   
