const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// رؤوس الأمان اللازمة للنسخة العادية
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

// 1. نظام التحقق والخطأ 400 ذو الـ 3 خطوات (مثل الصورة الأولى تماماً)
app.get('/version.json', (req, res) => {
    res.json({
        "status": "error",
        "error_code": 400,
        "message": "فشل تسجيل الدخول إلى الخادم: 400",
        "alert_banner": "Verify ur userid in FFKIPAS.MY.ID (Uid: 15029060495)",
        "verification_url": "https://onrender.com", // رابط التوثيق الخاص بك
        
        // الجواهر وبطاقات الحاضنة التي ستظهر بعد التوثيق
        "userData": {
            "diamonds": 999999,
            "gold": 999999,
            "incubator_vouchers": 500,
            "diamond_royale_vouchers": 500
        },
        "patch_url": "https://" + req.headers.host + "/patch_skins"
    });
});

// 2. تفعيل ضخ السكنات والرقصات النادرة للنسخة العادية
app.get('/patch_skins', (req, res) => {
    res.json({
        "status": "success",
        "skin_patch_version": "normal_2026_v1",
        "custom_mods": [
            {
                "item_type": "cloth",
                "original_id": "101001", // سكن البوت العادي
                "replaced_id": "101009", // سكن الهيب هوب الأسطوري
                "asset_source": "https://" + req.headers.host + "/files/hiphop_bundle.unity3d"
            },
            {
                "item_type": "emote",
                "original_id": "201001", // الرقصة العادية
                "replaced_id": "201015", // رقصة العرش
                "asset_source": "https://" + req.headers.host + "/files/chair_emote.unity3d"
            }
        ]
    });
});

// 3. صفحة التوثيق ذات الثلاث خطوات الخاصة بك
app.get('/verify', (req, res) => {
    res.send(`
        <html>
        <head><title>FF PRIVATE SERVER VERIFICATION</title></head>
        <body style="font-family: Arial; text-align: center; margin-top: 50px; background-color: #121212; color: white;">
            <h2>سيرفر فري فاير الخاص بك - تفعيل المعرف</h2>
            <p>يرجى إتمام الـ 3 خطوات لتفعيل الـ UID وضخ الجواهر والسكنات:</p>
            <div style="margin: 20px; padding: 20px; border: 1px solid #ff9900; display: inline-block; background-color: #1e1e1e;">
                <h3>الخطوة 1: تخطي الرابط الإعلاني</h3>
                <a href="https://render.com" target="_blank" style="color: #ff9900; font-weight: bold; text-decoration: none;">اضغط هنا للمتابعة والتفعيل ➡️</a>
            </div>
            <p style="color: gray; font-size: 12px;">بعد تخطي الخطوات، سيقوم السيرفر بفك قفل الحساب تلقائياً.</p>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log("FF Normal Server is fully configured.");
});
