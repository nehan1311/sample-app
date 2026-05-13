const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>CI/CD Demo</title>
                <style>
                    body {
                        font-family: Arial;
                        background-color: #f4f4f4;
                        text-align: center;
                        padding-top: 100px;
                    }

                    .container {
                        background: white;
                        width: 500px;
                        margin: auto;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.2);
                    }

                    h1 {
                        color: #2c3e50;
                    }

                    p {
                        color: #555;
                        font-size: 18px;
                    }

                    .status {
                        color: green;
                        font-weight: bold;
                    }
                </style>
            </head>

            <body>
                <div class="container">
                    <h1>AWS CI/CD Pipeline Demo</h1>

                    <p>
                        Application deployed using
                        <b>GitHub Actions + AWS EC2</b>
                    </p>

                    <p class="status">
                        Deployment Status: SUCCESS
                    </p>
                </div>
            </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        message: 'Application is running successfully'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});