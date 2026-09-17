const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. تفعيل واجهة الجواهر والبطاقات عند دخول اللعبة
app.get('/version.json', (req, res) => {
    res.json({
        "verAddr": "https://" + req.headers.host + "/",
        "resetGuest": true,
        "ForceUpdate": false,
        "NewVersion": "1.100.0",
        "patch_url": "https://" + req.headers.host + "/patch_skins",
        
        // شحن الحساب الافتراضي بالجواهر وبطاقات الحاضنة والرويال
        "userData": {
            "diamonds": 999999,
            "gold": 999999,
            "diamond_royale_vouchers": 500,
            "weapon_royale_vouchers": 500,
            "incubator_vouchers": 500 // 500 بطاقة حاضنة مجانية
        },
        "config": {
            "free_shopping": true,
            "bypass_store_verification": true
        }
    });
});

// 2. كود تصفير أسعار الرويال والحاضنات (Luck Royale Bypass)
app.post('/api/shop/royale', (req, res) => {
    // اعتراض أمر اللف وإرسال نتيجة نجاح فورية ومجانية للعبة
    res.json({
        "status": "success",
        "code": 200,
        "message": "Spin successful",
        "consumed_currency": 0, // استهلاك 0 جواهر
        "reward_item_id": "incubator_stone_2026" // منح حجر الحاضنة تلقائياً
    });
});

// 3. مسار السكنات (سنتركه جاهزاً للمرحلة القادمة)
app.get('/patch_skins', (req, res) => {
    res.json({
        "status": "success",
        "skin_patch_version": "2026_v1",
        "custom_mods": []
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
