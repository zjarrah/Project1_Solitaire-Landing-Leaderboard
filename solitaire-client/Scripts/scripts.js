const BASE_URL = "http://localhost/Project1_Solitaire-Landing-Leaderboard/solitaire-server/APIs/client/";

getScores(5)
async function getScores(value_limit){
    try{
        const url = BASE_URL + "get_scores.php";
        const response = await axios.get(url, {
            params: {
                limit: value_limit
            }
        });

        console.log(response);
        const jsonData = response.data;
        const container = document.getElementById("table-container");
        container.innerHTML = ""; // Clear previous content
        container.appendChild(createTableFromJSON(jsonData));
    } catch {
        console.log("Error!");
    }
}

async function addScore(value_name){
    try{
        const url = BASE_URL + "add_score.php";
        const response = await axios.post(url, {
            name: value_name,
        });

        console.log(response);
        document.getElementById("confirmation").textContent = "Entry submitted";
    } catch {
        console.log("Error!");
    }
}



function createTableFromJSON(data) {
    if (!Array.isArray(data) || data.length === 0) return "<p>No data available</p>";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create header row
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement("tr");
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create data rows
    data.forEach(item => {
        const row = document.createElement("tr");
        headers.forEach(header => {
        const td = document.createElement("td");
        td.textContent = item[header];
        row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

