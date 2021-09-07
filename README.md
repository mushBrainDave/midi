## Structure

### Core
Models and interfaces to be used throughout the solution can be included here

### DataAccessHandlers
Anything dealing with Database access or data access from any external resource should go here, with an accompanying interface in the core project.

### Engines
Resuable chunks of business logic should go here, with an accompanying interface in the core project.
> Loading, Saving, Updating are usually good cases

### Managers
Larger workflow management, should make heavy use of the engine functionality you have available.  
Add an accompanying interface in the core project.
> These should probably be 1-to-1 with each Controller method in the web project

### Web
Presentation layer - this contains all of your React code and your API controllers
> Goal is to keep this mostly focused on the client-side of the application, and to keep the controllers as minimal as possible.

---

## Setting up the project
Open the Package Manager Console and target `Midi.DataAccessHandlers`  
Run `Update-Database`  
In a terminal, navigate to the `Midi.Web/client-app` folder, and run `npm install`

## Running the Project
Make sure you're targeting the `Midi.Web` project, and click `IIS Express`  
> If you get a popup to allow self-signed certificates, make sure to allow.

The browser will open to the correct page, with React running.


## Updating the Database Schema
Any time you make changes to the models you have hooked up to entity framework, you will have to create a migration, so that the database knows how to reflect you change.

Open the Package Manager Console and target `Midi.DataAccessHandlers`

Run `Add-Migration {MigrationNameHere}`
> Replace `{MigrationNameHere}` with your own migration name, no spaces. Be sure to give it a good name so that everyone else will know what that migration is trying to do.

If that succeeds, run `Update-Database` and make sure to commit the generated files.
You will have to run `Update-Database` every time you or another team member adds one.

---


## Other Notes
### Dependency Injection
DI is mananged at each level. Look at the `Infrastructure/Configuration.cs` file that exists in each project that will be using DI. This is done to better separate the layers.

### Static
Don't use static methods with DI. It doesn't work. In .NET, it's better to make it an instance class or method, until it needs to be a static one, rather than the other way around.


---


## Troubleshooting

Make sure you are running VS in Admin mode

If everything runs, but you're still unable to connect to the site, try the steps in the following link.

https://stackoverflow.com/a/52281551

- Close Visual Studio
- Delete the `.vs` folder in the project directory
- Open up an admin command prompt and run the following commands, replacing the port with the one Visual Studio is trying to open. Mine was 44383
```
cd "C:\Program Files (x86)\IIS Express"
IisExpressAdminCmd.exe setupsslUrl -url:https://localhost:{PORT}/ -UseSelfSigned

```
- Open Visual Studio as Admin and run.
  - It may ask you to trust a certificate again, make sure to select yes.
