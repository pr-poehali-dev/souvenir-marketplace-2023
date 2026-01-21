import os
import json
from urllib.request import urlopen, Request
from urllib.error import URLError

def send_telegram_notification(order_id: int, customer_name: str, customer_email: str, 
                               customer_phone: str, items: list, total_amount: int,
                               delivery_method: str, delivery_address: str, 
                               payment_method: str) -> bool:
    """Отправка уведомления о новом заказе в Telegram"""
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return False
    
    delivery_text = "🚚 Доставка" if delivery_method == "delivery" else "🏪 Самовывоз"
    payment_text = "💳 Картой онлайн" if payment_method == "card" else "💵 Наличными"
    
    items_text = "\n".join([
        f"  • {item['name']} — {item['quantity']} шт. × {item['price']:,}₽ = {item['price'] * item['quantity']:,}₽"
        for item in items
    ])
    
    message = f"""🔔 <b>НОВЫЙ ЗАКАЗ #{order_id}</b>

👤 <b>Покупатель:</b>
  Имя: {customer_name}
  Email: {customer_email}
  Телефон: {customer_phone}

📦 <b>Товары:</b>
{items_text}

💰 <b>Итого: {total_amount:,}₽</b>

{delivery_text}
📍 {delivery_address}

{payment_text}

⏰ Заказ только что оформлен!"""
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    }
    
    try:
        req = Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
        with urlopen(req, timeout=5) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result.get('ok', False)
    except (URLError, Exception):
        return False
