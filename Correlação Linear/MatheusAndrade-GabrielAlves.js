// Matheus Andrade e Gabriel Alves

const fs = require('fs')
const xlsx = require('xlsx')
const statisci = require('simple-statistics')

const DB = xlsx.readFile ('DB2.xlsx')

const DB3 = DB.Sheets['DB3']


let tabelaCorrelacao = []
let tabelaRegressLinear = []

//x
const DB_PH = []

//y
const DB_Turbidez = []


// Faz a leitura das colunas B e C no excel e adicona dentro de vetores.
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


//Modelo de dados da biblioteca para leitura do vetor para calculo da regressão linear
for (var i = 0; i< DB_PH.length;i++)
{
    var vet = []

    vet.push(DB_PH[i], DB_Turbidez[i])

    tabelaRegressLinear.push(vet)
}

const CORRELACAO = statisci.sampleCorrelation(DB_PH, DB_Turbidez)



const REGRESS = statisci.linearRegression(tabelaRegressLinear)

function calculaRegress(x){
    return ((REGRESS.m*x)+ REGRESS.b)
}

console.log("Valor Correlação: ", CORRELACAO)
console.log("Valor de Y a partir de X: ",calculaRegress(5.85))