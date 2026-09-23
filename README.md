<!DOCTYPE html>
<html lang="zh-HK">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>樂活飲食 - 隱私政策</title>
    <style>
        :root {
            --apple-blue: #007AFF;
            --apple-gray: #8E8E93;
            --bg-color: #F2F2F7;
            --card-bg: #FFFFFF;
            --text-main: #1C1C1E;
            --text-sub: #6C6C70;
            --border-color: rgba(0,0,0,0.05);
            --highlight-bg: linear-gradient(135deg, rgba(0,122,255,0.08), rgba(52,199,89,0.05));
            --highlight-border: rgba(0,122,255,0.2);
        }
        
        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #000000;
                --card-bg: #1C1C1E;
                --text-main: #FFFFFF;
                --text-sub: #AEAEB2;
                --border-color: rgba(255,255,255,0.1);
                --highlight-bg: linear-gradient(135deg, rgba(0,122,255,0.15), rgba(52,199,89,0.1));
                --highlight-border: rgba(0,122,255,0.3);
            }
        }

        * {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang HK", "Noto Sans TC", sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            margin: 0;
            padding: 20px 16px 60px 16px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }
        
        .container {
            max-width: 680px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 24px;
            padding-top: 20px;
        }
        
        .header h1 {
            font-size: 26px;
            font-weight: 700;
            color: var(--text-main);
            margin: 0 0 6px 0;
            letter-spacing: -0.5px;
        }
        
        .header .update-date {
            font-size: 13px;
            color: var(--text-sub);
            background: var(--border-color);
            padding: 4px 12px;
            border-radius: 20px;
            display: inline-block;
        }
        
        .card {
            background: var(--card-bg);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.04);
            border: 1px solid var(--border-color);
        }
        
        .card.highlight {
            background: var(--highlight-bg);
            border: 1.5px solid var(--highlight-border);
        }
        
        .card.highlight strong {
            color: var(--apple-blue);
        }
        
        h2 {
            font-size: 17px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        p, ul {
            font-size: 14px;
            color: var(--text-main);
            margin: 0 0 12px 0;
        }
        
        ul {
            padding-left: 20px;
        }
        
        li {
            margin-bottom: 8px;
        }
        
        li strong {
            color: var(--text-main);
        }
        
        .footer {
            text-align: center;
            font-size: 12px;
            color: var(--text-sub);
            margin-top: 30px;
            padding-bottom: 20px;
        }
        
        a {
            color: var(--apple-blue);
            text-decoration: none;
        }
        
        .icon-box {
            font-size: 18px;
            margin-right: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        
        <div class="header">
            <h1>🔒 隱私政策</h1>
            <div class="update-date">最後更新：2026年7月</div>
        </div>

        <div class="card highlight">
            <h2><span class="icon-box">🛡️</span> 核心承諾</h2>
            <p style="margin-bottom:0;">我們極度重視你的私隱。樂活飲食優先將你的飲食紀錄、體重及健康數據儲存於你的手機本地（Local Storage）。<strong>我們不會將你的個人健康數據出售或用作廣告用途。</strong></p>
        </div>

        <div class="card">
            <h2><span class="icon-box">📋</span> 1. 我們收集什麼資料？</h2>
            <ul>
                <li><strong>個人設定：</strong>你輸入的暱稱、性別、年齡、身高、體重、飲水目標及過敏原。</li>
                <li><strong>飲食紀錄：</strong>你記錄的食物名稱、份量、餐別、營養素、飲水量及體重紀錄。</li>
                <li><strong>媒體與語音：</strong>當你使用「影相分析」時，我們會存取你的相機或相簿。當你使用「語音記錄」時，我們會使用語音識別 API。</li>
            </ul>
        </div>

        <div class="card">
            <h2><span class="icon-box">⚙️</span> 2. 資料如何被使用？</h2>
            <ul>
                <li><strong>AI 營養分析：</strong>當你使用「自然語言記錄」或「影相辨識」時，你輸入的文字或相片會被傳送至第三方 AI 服務供應商（如 OpenAI）進行分析，以估算熱量及營養素。</li>
                <li><strong>條碼掃描：</strong>當你掃描包裝食品條碼時，我們會將條碼號碼傳送至 Open Food Facts 公開資料庫以獲取營養資料。</li>
                <li><strong>本地紀錄：</strong>所有分析結果會即時儲存於你的手機，並不會自動上傳至我們的伺服器。</li>
            </ul>
        </div>

        <div class="card">
            <h2><span class="icon-box">💾</span> 3. 資料儲存與備份</h2>
            <ul>
                <li><strong>本地儲存：</strong>你的資料主要儲存於你的裝置內（Local Storage / IndexedDB）。</li>
                <li><strong>備份與還原：</strong>你可以手動將資料匯出為 JSON 檔案或 CSV 檔案。如果你使用 iOS 的「儲存到檔案 / iCloud」，該備份會受 Apple iCloud 的私隱條款保護。</li>
            </ul>
        </div>

        <div class="card">
            <h2><span class="icon-box">🔗</span> 4. 第三方服務</h2>
            <p>為了提供完整功能，本 App 可能使用以下第三方服務，請參閱其隱私政策：</p>
            <ul>
                <li>OpenAI (GPT-4o-mini) - 用於食物文字與圖像分析</li>
                <li>Open Food Facts - 用於包裝食品條碼查詢</li>
                <li>Apple Speech Framework - 用於語音轉文字</li>
            </ul>
        </div>

        <div class="card">
            <h2><span class="icon-box">✅</span> 5. 你的權利</h2>
            <ul>
                <li><strong>匯出：</strong>你可以隨時在「趨勢統計」頁面匯出 CSV，或於「目標設定」頁面備份 JSON。</li>
                <li><strong>刪除：</strong>你可以隨時在「目標設定」頁面點擊「清除所有本機資料」，一鍵永久刪除所有紀錄。此操作不可還原。</li>
            </ul>
        </div>

        <div class="card">
            <h2><span class="icon-box">⚕️</span> 6. 醫療免責聲明</h2>
            <p style="margin-bottom:0;">本 App 提供之營養分析及 AI 建議僅供參考，<strong>不能代替專業醫生、營養師或言語治療師的診斷與治療</strong>。如有任何健康問題，請務必諮詢專業醫療人員。</p>
        </div>

        <div class="card">
            <h2><span class="icon-box">✉️</span> 7. 聯絡我們</h2>
            <p style="margin-bottom:0;">如果你對本隱私政策有任何疑問，請電郵至：<br><a href="mailto:support@lohas-care.org">support@lohas-care.org</a></p>
        </div>

        <div class="footer">
            © 2026 樂活健康 Lohas Healthy Life. All rights reserved.
        </div>

    </div>
</body>
</html>
