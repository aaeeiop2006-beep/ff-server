const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// الرد على طلب التحقق من النسخة والسكنات
app.get('/version.json', (req, res) => {
    res.json({
        "verAddr": "https://" + req.headers.host + "/",
        "resetGuest": true,
        "ForceUpdate": false,
        "NewVersion": "1.100.0",
        "features": {
            "all_skins_unlocked": true,
            "all_emotes_unlocked": true
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
