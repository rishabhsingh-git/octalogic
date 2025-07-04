const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const bookingRouter = require('./src/routes/booking/bookingRouter')
const vehicleRouter = require('./src/routes/vehicle/vehicleRouter' )
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
};
app.use(cors(corsOptions));
app.use(helmet()); 


app.use('/api/booking', bookingRouter)
app.use('/api/vehicle', vehicleRouter)


const PORT = process.env.PORT || 8080;

(async () => {
  console.log('📡 Connecting to PostgreSQL...');
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected to database:', process.env.DATABASE_NAME);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1); 
  }
})();
