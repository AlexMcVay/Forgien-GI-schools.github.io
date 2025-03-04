import requests
import pandas as pd
import io
from flask import Flask, render_template_string

app = Flask(__name__)

# URL of the Excel file
url = "https://www.benefits.va.gov/GIBILL/docs/job_aids/ComparisonToolData.xlsx"

# Set headers to mimic a real browser
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
}

# Implement retry logic for a more reliable request
session = requests.Session()
session.mount("https://", requests.adapters.HTTPAdapter(max_retries=3))

# Fetch the Excel file
response = session.get(url, headers=headers)
response.raise_for_status()

# Read the Excel file
df = pd.read_excel(io.BytesIO(response.content), sheet_name="Comparison_Tool_Data_Full")

# Check for required columns
required_columns = {"institution", "country", "bah", "tuition in state", "tuition out of state"}
if not required_columns.issubset(df.columns):
    raise ValueError(f"Missing expected columns in the dataset: {required_columns - set(df.columns)}")

# Filter for foreign schools only (not in the U.S.)
foreign_schools = df[df["country"] != "United States"].copy()

# Convert financial columns to numeric values
foreign_schools["bah"] = pd.to_numeric(foreign_schools["bah"], errors="coerce")
foreign_schools["tuition in state"] = pd.to_numeric(foreign_schools["tuition in state"], errors="coerce")
foreign_schools["tuition out of state"] = pd.to_numeric(foreign_schools["tuition out of state"], errors="coerce")

# Calculate the net balance (BAH - Tuition)
foreign_schools["Net Balance (In-State)"] = foreign_schools["bah"] - foreign_schools["tuition in state"]
foreign_schools["Net Balance (Out-of-State)"] = foreign_schools["bah"] - foreign_schools["tuition out of state"]

# Render the html template
html_template = """
<!DOCTYPE html>
<html>
<head>
    <title>Foreign Schools</title>
</head>
<body>
    <h1>Foreign Schools</h1>
    <table>
        <tr>
            <th>institution</th>
            <th>country</th>
            <th>bah</th>
            <th>tuition </th>
            <th>Net Balance </th>
        </tr>
        {% for index, row in data.iterrows() %}
            <tr>
                <td>{{ row['institution'] }}</td>
                <td>{{ row['country'] }}</td>
                <td>{{ row['bah'] }}</td>
                <td>{{ row['tuition in state'] }}</td>
                <td>{{ row['Net Balance (In-State)'] }}</td>
            </tr>
        {% endfor %}
    </table>
</body>
</html>
"""

# Render the template with the data
html = render_template_string(html_template, data=foreign_schools)

# Save the rendered HTML to a file
with open("foreign_schools.html", "w") as f:
    f.write(html)

print("Foreign schools saved to foreign_schools.html")

if __name__ == "__main__":
    app.run(debug=True)

# TODO: Create a download button to export all to excel
# TODO: Create a dropdown menu to filter by country
# TODO: Create a dropdown menu to filter by net balance
