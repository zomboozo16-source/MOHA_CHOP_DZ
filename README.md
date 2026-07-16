<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>شحن جواهر فري فاير - OUR᭄MOHAMED</title>
    <style>
        /* إعدادات الخطوط والألوان العامة (ثيم غامق مستوحى من فري فاير) */
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');

        :root {
            --bg-color: #0b0c10;
            --card-bg: #1f2833;
            --primary-color: #ff4a11; /* برتقالي فري فاير */
            --primary-glow: rgba(255, 74, 17, 0.4);
            --text-color: #ffffff;
            --text-muted: #c5c6c7;
            --accent-color: #45f3ff; /* لون التحديد والتوهج الازرق */
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Tajawal', sans-serif;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        .container {
            max-width: 800px;
            width: 100%;
            text-align: center;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 10px;
            color: var(--primary-color);
            text-shadow: 0 0 10px var(--primary-glow);
        }

        p.subtitle {
            color: var(--text-muted);
            margin-bottom: 30px;
            font-size: 1.1rem;
        }

        /* شبكة بطاقات الجواهر */
        .offers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .offer-card {
            background-color: var(--card-bg);
            border: 2px solid transparent;
            border-radius: 15px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .offer-card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 74, 17, 0.5);
        }

        /* الحالة عند اختيار البطاقة */
        .offer-card.selected {
            border-color: var(--accent-color);
            box-shadow: 0 0 20px rgba(69, 243, 255, 0.3);
            background: linear-gradient(145deg, #1f2833, #253344);
        }

        /* أيقونة الجوهرة */
        .diamond-icon {
            width: 60px;
            height: 60px;
            margin-bottom: 15px;
            filter: drop-shadow(0 0 5px var(--accent-color));
        }

        .diamond-count {
            font-size: 1.4rem;
            font-weight: 900;
            margin-bottom: 10px;
            color: #fff;
        }

        .price {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        /* شارة صغيرة للمختار */
        .selected-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: var(--accent-color);
            color: #000;
            font-size: 0.8rem;
            font-weight: bold;
            padding: 2px 8px;
            border-radius: 10px;
            display: none;
        }

        .offer-card.selected .selected-badge {
            display: block;
        }

        /* زر المتابعة للدفع */
        .btn-pay {
            background-color: #333;
            color: #666;
            border: none;
            padding: 15px 40px;
            font-size: 1.2rem;
            font-weight: 700;
            border-radius: 30px;
            cursor: not-allowed;
            transition: all 0.3s ease;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        /* عندما يتفعل الزر بعد الاختيار */
        .btn-pay.active {
            background: linear-gradient(45deg, var(--primary-color), #ff7b00);
            color: white;
            cursor: pointer;
            box-shadow: 0 5px 20px var(--primary-glow);
        }

        .btn-pay.active:hover {
            transform: scale(1.03);
        }

        /* نافذة تأكيد الدفع (Modal) */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1000;
            padding: 20px;
        }

        .modal.open {
            opacity: 1;
            pointer-events: auto;
        }

        .modal-content {
            background-color: var(--card-bg);
            border: 2px solid var(--primary-color);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            position: relative;
            box-shadow: 0 10px 30px rgba(255, 74, 17, 0.2);
            text-align: right;
        }

        .close-btn {
            position: absolute;
            top: 15px;
            left: 15px;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-muted);
            transition: color 0.2s;
        }

        .close-btn:hover {
            color: var(--primary-color);
        }

        .modal h2 {
            margin-bottom: 15px;
            color: var(--primary-color);
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: var(--text-muted);
        }

        .form-group input, .form-group select {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #444;
            background-color: #0b0c10;
            color: #fff;
            font-size: 1rem;
        }

        .form-group input:focus {
            border-color: var(--accent-color);
            outline: none;
        }

        .selected-summary {
            background-color: rgba(255, 255, 255, 0.05);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border-right: 4px solid var(--accent-color);
        }

        .btn-submit {
            background: linear-gradient(45deg, #00c6ff, #0072ff);
            color: white;
            border: none;
            padding: 12px;
            width: 100%;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transform 0.2s;
}
</