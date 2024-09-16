# Itaú Technical Challenge

This project was created to attend Itaú's selection process technical challenge. It showcases various functionalities and best practices in Angular development.

## Installation

To install and run this Angular project, follow these steps:

1. Clone the repository:
```javascript
git clone git@github.com:leomcg/itau-2.git
```
2. Install dependencies:
```javascript
npm install
```


## Running the Project

To run the project, use the following command:
```javascript
ng serve
```


Then, open your browser and navigate to [http://localhost:4200/](http://localhost:4200/).

## Functionalities Implemented

This project includes the following functionalities:

- **Full Dummy CRUD**: Since we are not connected to a backend, the project includes a full dummy CRUD implementation that just updates the UI to simulate data operations.
- **Interceptors**: HTTP interceptors are used for logging requests and responses, just to showcase its usage.
- **Masks**: Input masks are implemented using the `ngx-mask` library to format user inputs.
- **Angular Material**: The project uses Angular Material components for a modern and responsive UI.
- **Error Handling**: Error handling is implemented to provide user feedback and improve the user experience.
- **Services**: Helper functions are encapsulated in services to keep components leaner and more maintainable.
- **Angular Pipes**: Pipes are used along with internationalization to convert numbers to BRL currency format.
- **Internationalization (i18n)**: i18n is implemented for the paginator texts as a showcase of internationalization capabilities.
- **Reactive Forms**: Reactive forms are used in the entire project to provide better validation and a scalable, predictable, and testable approach to form management.
- **RxJS**: Leveraged RxJS operators, subjects, and observables to showcase knowledge of the library and handle asynchronous operations and data flow effectively.
- **Routing**: Implemented routing to navigate between different components and used query parameters to pass data around components.
- **Sass and Sass Variables**: Used Sass for styling and Sass variables to maintain consistent design and easily manage styles across the application.
- **Custom Types (Models)**: Used custom types (models) to catch errors before runtime and ensure type safety.
- **Code Organization and Best Practices**: Ensured best practices and code organization by avoiding code repetition, using services for helper functions, and maintaining a clean and modular codebase.
- **Semantic Commits**: Semantic Commit Messages are used to make it easier to understand the purpose of changes and automate versioning.
- **Code Comments**: In the code you will find the necessary comments to explain anything I forgot to include here.

## Notes

- I couldn't grab the exact measures (like padding, font-size, etc) from the prototype, so I did my best to make it as close as possible.

## Feedback

I really hope that my peer developers evaluating this project like my work. I would love to hear feedback about possible improvements, and I am available to clear any doubts regarding the project.

Feel free to reach out to me with any questions or comments.

---

By following the instructions in this README file, you should be able to install, run, and understand the functionalities implemented in this Angular project.

