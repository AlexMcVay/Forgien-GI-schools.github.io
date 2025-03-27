const SUPABASE_URL = "https://your-supabase-url.supabase.co";
const SUPABASE_KEY = "your-supabase-api-key";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const mha = 0;

async function fetchData() {
    let { data, error } = await supabase.from("foreign_schools").select("institution, city,  country, approved");

    if (error) {
        console.error("Error fetching data:", error);
        return;
    }

    const tableBody = document.querySelector("#data-table tbody");
    tableBody.innerHTML = "";

    data.forEach(row => {
        if (row.approved) {
            const country = row.country;
            let {data, error} = await supabase.from("cost_of_living").select("cost_of_living").eq("country", country);
            if (error) {
                console.error("Error fetching data:", error);
                return;
            }
            const cost_of_living = data[0].cost_of_living;
            const net_balance = cost_of_living - mha;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.institution}</td>
                <td>${row.country}</td>
                <td>${row.cost_of_living ? `$${row.cost_of_living}` : "N/A"}</td>
                <td>${row.net_balance=net_balance}</td>
            `;
            tableBody.appendChild(tr);
    });
}

function handleMhaSubmit() {
    const mha = document.getElementById("mha-input").value;
    console.log("MHA:", mha);
    fetchData();
}

