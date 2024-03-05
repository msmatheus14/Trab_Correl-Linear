
const XLSX = require('xlsx');

const ctx = document.getElementById('scatterChart').getContext('2d');
const scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'pH vs Turbidez',
            data: [], 
            backgroundColor: 'rgba(255, 99, 132, 1)',
            font: {
                size: 20 
            } 
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Turbidez',
                    font: {
                        size: 20 
                    }
                },
                ticks: {
                    font: {
                        size: 20 
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'pH Água',
                    font: {
                        size: 20 
                    }
                },
                ticks: {
                    font: {
                        size: 20 
                    }
                }
            }
        }
    }
});


function readExcel(file) {

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function(e) {
 
        const workbook = XLSX.read(e.target.result, {type: 'binary'});

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];


        const data = XLSX.utils.sheet_to_json(sheet);

        const phAgua = data.map(row => row['PH AGUA']);
        const turbidez = data.map(row => row.TURBIDEZ);

        scatterChart.data.datasets[0].data = phAgua.map((value, index) => ({ x: turbidez[index], y: value }));
        scatterChart.update();

        const table = document.getElementById('excelTable');
        table.innerHTML = ''; 

        const thead = table.createTHead();
        const row = thead.insertRow();
        const columnNames = ['pH', 'Turbidez', 'Previsão']; 

    
        columnNames.forEach(columnName => {
            const th = document.createElement('th');
            th.textContent = columnName;
            row.appendChild(th);
        });
z   
        for (let i = 0; i < 10; i++) {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            cell1.textContent = phAgua[i];
            cell2.textContent = turbidez[i];
            cell3.textContent = (turbidez[i] + phAgua[i]).toFixed(2);
        }

    };
}

const input = document.getElementById('excelFile');


input.addEventListener('change', function(e) {

    const file = e.target.files[0];

    readExcel(file);
});
