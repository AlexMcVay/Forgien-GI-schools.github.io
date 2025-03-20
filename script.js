const SUPABASE_URL = "https://your-supabase-url.supabase.co";
const SUPABASE_KEY = "your-supabase-api-key";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchData() {
    let { data, error } = await supabase.from("foreign_schools").select("institution, country, bah, tuition_in_state, net_balance");

    if (error) {
        console.error("Error fetching data:", error);
        return;
    }

    const tableBody = document.querySelector("#data-table tbody");
    tableBody.innerHTML = "";

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.institution}</td>
            <td>${row.country}</td>
            <td>${row.bah ? `$${row.bah}` : "N/A"}</td>
            <td>${row.tuition_in_state ? `$${row.tuition_in_state}` : "N/A"}</td>
            <td>${row.net_balance ? `$${row.net_balance}` : "N/A"}</td>
        `;
        tableBody.appendChild(tr);
    });
}

fetchData();

