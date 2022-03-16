# Phone-Validation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

Bootstrap 4.1

## Description

This project is mainly for the client-side App for phone-validation application where it connects directly to server side local docker image or just local dev. sever locally on port 8080

## Project Structure

The project stucture is pretty simple N-Tier app in regards to the project structure which consists of the following components

- Angular components for home page & main app.

- Shared directory that contains the following:

    - Models which acts as a replica from entites on the server side including the filter DTO 

    - Directives that are used across app (e.g. Server Side paginated table , App Notifications...etc.)

    - Services for both API & Utilities (HTTP Requests , Error Handlers..etc.)
## Development server

Run `yarn` for adding needed packages.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

