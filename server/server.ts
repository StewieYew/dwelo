import express from 'express';
import deviceService from './services/deviceService';
    
const app = express();
const PORT = 3001;

app.use(express.json());

const router = express.Router();


router.get('/api/devices', async (_req, res) => {
    res.json(await deviceService.getDevices());
})


app.use('/', router);
app.listen(PORT, () => {
    console.log(`port running on ${PORT}`);
});
