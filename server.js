const next = require('next');
const express = require('express');
const axios = require('axios');
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
const Consumerkey = process.env.CONSUMER_KEY;
const Consumersecret = process.env.CONSUMER_SECRET;

app.prepare().then(() => {
  const server = express();

  // Middleware to parse JSON bodies
  server.use(express.json());

  server.get('/api', (req, res) => {
    res.json({ message: "Hello World" });
  });
  // Middleware to acquire token
  const getTokenMiddleware = (req, res, next) => {
    try {
        const auth = Buffer.from(Consumerkey + ':' + Consumersecret).toString('base64');      
        axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',{
        headers:{
            'Authorization': `Basic Y25uaTRiZ041c1hvNHl5TVRDS0NkclZrZ3RUcnA0Vm1QR0hQcUl0MDd6SFFLcjB2OlB3VnBxYnhNUTZ0cUhtVG5raEFFTWdrb1FrOElhTkRuR0VCeUFrbkFNSlh6R0xuZlhBODB1NTd0QUNyU1JSbnA=`
        },
    }).then((response) => {
        let data = response.data;
        let access_token = data.access_token;
        req.token = access_token;
        return next();
      })
    } catch (error) {
      res.status(500).json({ error: 'Failed to acquire token' });
    }
  };

  server.post('/api/stkpush', getTokenMiddleware, (req, res) => {
    const { phone } = req.body;
    const token = req.token;
    try {
      axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
        "BusinessShortCode": "174379",
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
        "Timestamp": "20160216165627",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": "1",
        "PartyA": "254" + phone,
        "PartyB": "174379",
        "PhoneNumber": "254" + phone,
        "CallBackURL": "https://mydomain.com/pat", 
        "AccountReference": "Kill Your Enemies by Abel Marite",
        "TransactionDesc": "Book purchase"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
         res.status(200).json(response.data);
      })
  
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  });
server.post('/api/stkpushquery', getTokenMiddleware, (req, res) => {
    const token = req.token;
    const {CheckoutRequestID} = req.body;
    axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",{    
        "BusinessShortCode":"174379",    
        "Password": "MTc0Mzc5YmZiMjc5TliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
        "Timestamp":"20160216165627",    
        "CheckoutRequestID": CheckoutRequestID,    
     }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
     }).then((response) => {
        console.log(response.data)
     })
  }); 

  server.post('/api/callback', (req, res) => {
    const result = req.body;
    console.log(result);
    res.status(200).send('Callback received');
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 5000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
});
