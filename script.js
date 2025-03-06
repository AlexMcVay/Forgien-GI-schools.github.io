function handleFile(file) {
    const reader = new FileReader();
    
    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
    
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        
        // Parse the Excel file
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        const tableBody = document.querySelector("#data-table tbody");
        tableBody.innerHTML = ""; // Clear existing table data
        
        // Populate table with data from JSON
        jsonData.forEach(row => {
            // Check if the school is not in the United States
            if (row["country"] && row["country"] !== "United States") {
                const tr = document.createElement("tr");
                
                // Fill the table row with institution, country, and net balance
                tr.innerHTML = `
                    <td>${row["institution"] || "N/A"}</td>
                    <td>${row["country"]}</td>
                    <td>${mha - (row["tuition in state"] || 0)}</td>
                `;
                
                tableBody.appendChild(tr); // Append the row to the table
            }
        });
    };
}
    
    const downloadCsvButton = document.getElementById("download-csv");
    downloadCsvButton.addEventListener("click", () => {
        const tableData = [];
        const tableRows = document.querySelectorAll("#data-table tbody tr");
        tableRows.forEach(row => {
            const cells = row.cells;
            const rowValues = [];
            for (let i = 0; i < cells.length; i++) {
                rowValues.push(cells[i].textContent);
            }
            tableData.push(rowValues);
        });
        
        const csvContent = "Institution,Country,Net Balance\n" + tableData.map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = "foreign_schools.csv";
        link.click();
        URL.revokeObjectURL(url);
    });
function handleMhaSubmit() {
    const mhaInput = document.getElementById("mha-input");
    const mha = Number(mhaInput.value);
    
    if (isNaN(mha)) {
        alert("Please enter a valid number for MHA.");
        return;
    }
    
    handleFile(document.getElementById("fileInput").files[0]);
}

document.getElementById("loadData").addEventListener("click", handleMhaSubmit);

