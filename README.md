# M3U Parser and Filter App

This application allows you to parse an M3U file, filter entries by genres, and display the films list for selected genres.

## Setup and Configuration

1.  **Install dependencies**:
    Navigate to the project directory in the terminal and run:
    ```shell
    npm install --yes
    ```
    This command installs all the necessary packages listed in the `package.json` file.

## Starting the App

1.  **Start the development server**:
    Run the following command in the project directory:
    ```shell
    npm run dev
    ```
    This command starts the Vite development server. The application will be accessible at the URL provided in the console (usually `http://localhost:5173`).

## Using the App

1.  **Upload M3U file**:
    -   Open the application in your browser.
    -   You will see "fichier m3u" title and "Choose File" button on the same line.
    -   Click on the "Choose File" button to upload your `.m3u` file.
2.  **Filter by Genre**:
    -   Once the file is loaded, the application will parse the M3U content and display the "Genres" buttons.
    -   Click on some genres to select or unselect them.
3.  **View the list of films for the selected genres**:
    -   As you select the genres, the "Films" section will dynamically update to display the list of file names.
    -   Click on a film to open the corresponding URL.

## Notes

-   The list of films is sorted alphabetically.

Enjoy using the M3U magicien App!
