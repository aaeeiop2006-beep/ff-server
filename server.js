const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/version.json', (req, res) => {
    res.json({
        "verAddr": "https://" + req.headers.host + "/",
        "resetGuest": true,
        "ForceUpdate": false,
        "NewVersion": "1.100.0",
        "patch_url": "https://" + req.headers.host + "/patch_skins",
        
        // شحن الجواهر وبطاقات الحاضنة للماكس
        "userData": {
            "diamonds": 999999,
            "gold": 999999,
            "incubator_vouchers": 500
        },
        "config": {
            "free_shopping": true,
            "max_mode": true
        }
    });
});

// تفعيل لفات الحاضنة مجاناً
app.post('/api/shop/royale', (req, res) => {
    res.json({
        "status": "success",
        "consumed_currency": 0,
        "reward_item_id": "incubator_stone_max"
    });
});

// تفعيل سكن الهيب هوب تلقائياً من السيرفر
app.get('/patch_skins', (req, res) => {
    res.json({
        "status": "success",
        "skin_patch_version": "max_2026_v1",
        "custom_mods": [
            {
                "item_type": "cloth",
                "original_id": "101001", // السكن الافتراضي
                "replaced_id": "101009", // سكن الهيب هوب
                "asset_source": "https://" + req.headers.host + "/files/hiphop_bundle.unity3d"
            }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`FF MAX Server Is Fully Active on port ${PORT}`);
});
