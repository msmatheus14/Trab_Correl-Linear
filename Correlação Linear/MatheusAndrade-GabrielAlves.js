// Matheus Andrade e Gabriel Alves

const fs = require('fs')
const xlsx = require('xlsx')
const statisci = require('simple-statistics')

const DB = xlsx.readFile ('DB2.xlsx')

const DB3 = DB.Sheets['DB3']


let tabelaCorrelacao = []

//x
const DB_PH = []

//y
const DB_Turbidez = []



for (const cellAdress in DB3){


    if(DB3.hasOwnProperty(cellAdress) && (cellAdress.startsWith('B') || cellAdress.startsWith('C')))
    {
        const valor = DB3[cellAdress].v

        
        if (cellAdress.startsWith('B')){
           
            DB_PH.push(valor)
        }
        else
        if(cellAdress.startsWith('C')){
            DB_Turbidez.push(valor)
        }
    }
}


//Não esta sendo usado.
for (var i = 0; i< DB_PH.length;i++)
{
    var obj  = {} 

    obj.ph = DB_PH[i]
    obj.turb = DB_Turbidez[i]

    obj.x2 = Math.pow(DB_PH[i],2)
    obj.y2 = Math.pow(DB_Turbidez[i],2)

    obj.multXY = DB_PH[i] * DB_Turbidez[i]

    tabelaCorrelacao.push(obj)

}

const CORRELACAO = statisci.sampleCorrelation(DB_PH, DB_Turbidez)

console.log(CORRELACAO)

function calculaRegressaoLinear(){
    
}