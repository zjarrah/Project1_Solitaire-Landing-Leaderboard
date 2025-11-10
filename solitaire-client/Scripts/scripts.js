const BASE_URL = "http://localhost/Project1_Solitaire-Landing-Leaderboard/solitaire-server/APIs/client/";


/////////////////////////////////////////////// For inserting db table into html element  ///////////////////////////////////////////////

async function insertScoresHtmlTable(elementID, rowsLimit){
    const arrayScores = await getScoresArray(rowsLimit);
    const htmlTable = createTableFromArray(arrayScores);
    insertHtmlIntoElement(htmlTable, elementID)
}


// Extract scores from db as an Array of JSONs
async function getScoresArray(value_limit){
    try{
        const url = BASE_URL + "get_scores.php";
        const response = await axios.get(url, {
            params: {
                limit: value_limit
            }
        });

        console.log(response);
        const dataArray = response.data.data;
        return dataArray

    } catch {
        console.log("Error!");
    }
}


// Convert Array to HTML table
function createTableFromArray(array) {

    if (!Array.isArray(array) || array.length === 0) return "<p>No data available</p>";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create header row
    const headers = Object.keys(array[0]);
    const headerRow = document.createElement("tr");
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create data rows
    array.forEach(item => {
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
    return table.outerHTML;

}


// Insert HTML code into HTML element
function insertHtmlIntoElement(html, id){
    const container = document.getElementById(id);
    container.innerHTML = html;
}




/////////////////////////////////////////////// For inserting new score into db ///////////////////////////////////////////////

async function addScore(value_name){
    try{
        const url = BASE_URL + "add_score.php";
        const response = await axios.post(url, {
            name: value_name,
        });

        console.log(response);
        if(response.data.success){
            document.getElementById("confirmation").textContent = "Entry submitted!";
        }else{
            document.getElementById("confirmation").textContent = "Entry denied!";
        }        
    } catch {
        console.log("Error!");
    }
}