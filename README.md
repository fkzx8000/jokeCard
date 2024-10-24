# Joke Mini Project

![Screenshot](./assets/screenshot.png)

## Project Description

This is a mini-project designed to practice working with external APIs. 
The project displays a random joke every time the "Home" button is clicked. 
The project uses React and the Axios library to make HTTP requests.

## Features

- Display a random joke when the page loads.
- Show a new joke whenever the "Home" button is clicked.
- Additional buttons for "About" and "Contact" (currently not functional).

## Project Structure

```
src/
├── components/      # React components
├── hooks/           # Custom hooks
├── services/        # Services for API requests
├── App.tsx          # Main app component
└── assets/          # Assets folder containing images and styles
```

- `screenshot.png`: A screenshot of the application.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/fkzx8000/jokeCard.git
    cd jokeCard
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the application**:

    ```bash
    npm start
    ```

The app should now be running at `http://localhost:5173/`.

## Usage

- When the page loads, a random joke will be displayed.
- Click the "Home" button to load a new joke.
- The "About" and "Contact" buttons are currently placeholders and do not perform any action.

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests with improvements or fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
