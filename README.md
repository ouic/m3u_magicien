# M3U Parser and Filter App

This application allows you to parse an M3U file, filter entries by group titles, and display the URLs for selected groups.

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
2.  **Filter by Group Title**:
    -   Once the file is loaded, the application will parse the M3U content and display the group titles in a grid of buttons under "Genres" title.
    -   Click on the group title buttons to select or unselect them. Selected buttons will have a different background color.
3.  **View URLs for Selected Groups**:
    -   As you select group titles, the "Films" section will dynamically update to display the list of file names (with clickable links to the URLs) for the selected groups in a grid layout.
    -   Click on a file name to open the corresponding URL in a new tab.

## Notes

-   The application filters group titles to only include those starting with "VOD" and containing "FRENCH" or ending with "[FR]".
-   Group titles starting with "VOD - " and ending with " [FR]" are renamed for better readability in the filter buttons.
-   File names in the URL list starting with "FR - " are also renamed for better readability.
-   The list of group titles is sorted alphabetically.
-   The list of URLs for selected groups is also sorted by file name.
-   "fichier m3u" title and "Choose File" button are now displayed on the same line.

Enjoy using the M3U Parser and Filter App!
