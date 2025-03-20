# Foreign Schools GI Bill Analysis

This project fetches data from the VA's GI Bill Comparison Tool and displays cost-of-living estimates for foreign schools.

[![wakatime](https://wakatime.com/badge/user/b0da6dba-e0b5-4ab0-814a-b13bb1500da8/project/f0b380ef-8cbe-45f8-8b2a-73012ec17729.svg)](https://wakatime.com/badge/user/b0da6dba-e0b5-4ab0-814a-b13bb1500da8/project/f0b380ef-8cbe-45f8-8b2a-73012ec17729)

## 🚀 How It Works
- Data is pulled from the **VA Comparison Tool Excel sheet**.
- It is stored in **Supabase PostgreSQL**.
- The frontend dynamically fetches and displays the data.

## 🔧 Setup Instructions

### 1️⃣ Create a Supabase Project
1. Go to [Supabase](https://supabase.com) and create a free account.
2. Create a new project and **copy the API URL & Anon Key**.
3. Run `schema.sql` to create the database structure.

### 2️⃣ Upload Data
Run:
```sh
pip install pandas requests supabase
python import_data.py
