import express from 'express';
import cors from 'cors';
import { connectDB } from './configs/DB.js';
import sampleRoute from './Routes/SampleRoute.js';

const app = express();
const port = 5001;

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ success: true, message: "Working" });
});

// ✅ Only mount routes after DB connection
connectDB().then(() => {
    app.use("/api/sample", sampleRoute);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error("DB connection failed:", err);
});