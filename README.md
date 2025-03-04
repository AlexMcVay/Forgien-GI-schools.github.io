# Foreign Schools GI Bill Analysis

## Overview
This project aims to create a simple database of schools outside the USA available to veterans of the US Armed Forces using military benefits.

## Components

### Python Script
- **Description**: The main Python script executed by PyScript.
- **Functions**:
  - `load_excel_file()`: Loads an Excel file from the user's computer and processes its contents.
  - `process_data()`: Processes the data from the Excel file and generates a table.
- **Variables**:
  - `file_input`: The input element for the user to select an Excel file.
  - `file`: The selected Excel file.
  - `df`: The Pandas DataFrame containing the data from the Excel file.
- **Notes**:
  - This script uses PyScript to execute Python code in the browser.
  - It relies on the `pyscript-styles.css` stylesheet for styling.

### HTML File
- **Description**: The main HTML file rendered by the browser.
- **Elements**:
  - `fileInput`: The input element for the user to select an Excel file.
  - `loadData`: The button element that triggers the `load_excel_file()` function.
  - `data-table`: The table element that will display the processed data.
- **Scripts**:
  - `script.py`: The main Python script executed by PyScript.
- **Stylesheets**:
  - `pyscript-styles.css`: The stylesheet for styling the PyScript output.

### Stylesheet
- **Description**: Stylesheet for styling the PyScript output.
- **Classes**:
  - `.pyscript-output`: The class for styling the PyScript output.
- **Notes**:
  - This stylesheet is used by PyScript to style the output of the Python script.
  - It can be customized to change the appearance of the output.
