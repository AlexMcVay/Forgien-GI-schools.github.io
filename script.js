document.getElementById("loadData").addEventListener("click", function() {
    const fileInput = document.getElementById("fileInput");
    
    // Check if a file is uploaded
    if (fileInput.files.length === 0) {
        alert("Please upload an Excel file.");
        return;
    }
    
    const file = fileInput.files[0];
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
                    <td>${(row["bah"] || 0) - (row["tuition in state"] || 0)}</td>
                `;
                
                tableBody.appendChild(tr); // Append the row to the table
            }
        });
    };
});
