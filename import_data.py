import pandas as pd
import requests
import supabase
from io import BytesIO

# Supabase Credentials
SUPABASE_URL = "https://your-supabase-url.supabase.co"
SUPABASE_KEY = "your-supabase-api-key"
supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

# Download the Excel file
url = "https://www.benefits.va.gov/GIBILL/docs/job_aids/ComparisonToolData.xlsx"
response = requests.get(url)
df = pd.read_excel(BytesIO(response.content), sheet_name="Comparison_Tool_Data_Full")

# Select relevant columns and rename
df = df[["facility code", "institution", "city", "state", "zip", "country", "type", "bah", "tuition in state", "tuition out of state", "books"]]
df.columns = ["facility_code", "institution", "city", "state", "zip", "country", "type", "bah", "tuition_in_state", "tuition_out_of_state", "books"]

# Convert to numeric where applicable
numeric_cols = ["bah", "tuition_in_state", "tuition_out_of_state", "books"]
df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors="coerce")

# Upload to Supabase
data = df.to_dict(orient="records")
supabase_client.table("foreign_schools").insert(data).execute()
print(" VA GIBILL Data uploaded successfully!")


