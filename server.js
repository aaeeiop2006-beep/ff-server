const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// إضافة حماية ورؤوس أمان لكي تقبله اللعبة دون خطأ "3"
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

app.get('/version.json', (req, res) => {
    // تنسيق صارم يتوافق مع حماية فري فاير ماكس
    const responseData = {
        "verAddr": "https://" + req.headers.host + "/",
        "resetGuest": true,
        "ForceUpdate": false,
        "NewVersion": "1.100.0",
        "patch_url": "https://" + req.headers.host + "/patch_skins",
        "userData": {
            "diamonds": 999999,
            "gold": 999999,
            "incubator_vouchers": 500
        },
        "config": {
            "free_shopping": true,
            "max_mode": true
        }
    };
    res.status(200).send(JSON.stringify(responseData));
});

app.get('/patch_skins', (req, res) => {
    const patchData = {
        "status": "success",
        "skin_patch_version": "max_2026_v1",
        "custom_mods": [
            {
                "item_type": "cloth",
                "original_id": "101001",
                "replaced_id": "101009",
                "asset_source": "https://" + req.headers.host + "/files/hiphop_bundle.unity3d"
            }
        ]
    };
    res.status(200).send(JSON.stringify(patchData));
});

app.listen(PORT, () => {
    console.log(`Secured FF MAX Server Active on port ${PORT}`);
});
