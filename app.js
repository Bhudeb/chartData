const express = require('express');
const axios = require('axios');
const app = express();
const port = 3003;
var bodyParser = require('body-parser')
var mysql = require('mysql2');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));


  

app.post('/', (req, res) =>{
    req.method = 'GET'
    req.url = '/'
    app._router.handle(req,res)
});

app.get('/strikePrice/:id', (req, res) =>{
    async function getData (ce,pe){
        const connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'stockdb'
        });
        var sql = 'SELECT * FROM chartData WHERE `strike` IN (?,?)';
        const results = await connection.promise().query(sql,[ce,pe]);
        // await connection.promise().end()
        return results[0]
    }
    datas = getData(req.params.id+'CE',req.params.id+'PE')
    datas.then(function(result) {
        console.log(result)
        res.render('strikePrice',{ title: req.params.id, strikePrice:req.params.id,data:result});
    })
   
});

// Define a route
 app.get('/', async (req, res) => {
    try {
        let sP = 20200
        let date = '21-Sep-2023'
        if(req.body.spotPrice === undefined){
            // console.log('---->',req.body.spotPrice)
        }
        else{
            sP = req.body.spotPrice
            console.log('---->',sP)
        }
        
        const spot = await axios.get('https://www.nseindia.com/api/chart-databyindex?index=NIFTY%2050&indices=true');
        let spotPrice = spot.data.grapthData[spot.data.grapthData.length - 1][1]
        const response = await axios.get('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY');
        const apiData = await response.data.records.data;
            let arr = apiData
            let sortedArr = []
            console.log(arr.length)
            for(let i = 0; i<arr.length; i++)
            {
                // console.log(arr[i].strikePrice+'   '+arr[i].expiryDate)
                if(arr[i].strikePrice === sP+50 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP+100 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP+150 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP+200 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP+250 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP+300 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP+350 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP+400 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
        
                if(arr[i].strikePrice === sP && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP-50 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP-100 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP-150 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP-200 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP-250 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP-300 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP-350 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
                if(arr[i].strikePrice === sP-400 && arr[i].expiryDate === date )
                {
                    sortedArr.push(arr[i])
                }
            }
            var t_date = new Date;
            
            console.log(sortedArr[8])
            storeData(sortedArr)
            function storeData(sortedArr){
                const connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '',
                    database: 'stockdb'
                });

                for(let j=0; j<sortedArr.length; j++)
                {
                for(let i=2;i<=3;i++)
                {
                    key = Object.keys(sortedArr[j])[i]
                    let sP = sortedArr[j].strikePrice+key
                    let change = sortedArr[j][key].change.toFixed(2).toString();
                    let time = t_date.getHours()+':'+t_date.getMinutes();
                    var sql = 'INSERT INTO chartData (`strike`, `time`, `change`) VALUES (?,?,?)';
                    // console.log(sql)
                    connection.query(sql,[sP,time,change],
                        function(err, results, fields) {
                          console.log(err)  
                        }
                    );
                 }
                }
                connection.end()
            }
    
        res.render('home', { title: 'EJS Example', message: sortedArr, spotPrice:spotPrice })
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the API.' });
      }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});