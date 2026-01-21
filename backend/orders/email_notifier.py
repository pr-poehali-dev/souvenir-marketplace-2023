import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email_notification(
    order_id: int,
    customer_name: str,
    customer_email: str,
    customer_phone: str,
    items: list,
    total_amount: float,
    delivery_method: str,
    delivery_address: str,
    payment_method: str
):
    '''Отправка email-уведомления администратору о новом заказе'''
    
    admin_email = os.environ.get('ADMIN_EMAIL')
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = os.environ.get('SMTP_PORT')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    if not all([admin_email, smtp_host, smtp_port, smtp_user, smtp_password]):
        return
    
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новый заказ #{order_id} - БАЗА Маркетплейс'
        msg['From'] = smtp_user
        msg['To'] = admin_email
        
        delivery_method_text = 'Доставка курьером' if delivery_method == 'delivery' else 'Самовывоз из центра «БАЗА»'
        payment_method_text = 'Картой онлайн' if payment_method == 'card' else 'Наличными при получении'
        
        items_html = ''
        for item in items:
            items_html += f'''
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">{item['name']}</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">{item['quantity']}</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">{item['price']:,}₽</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">{item['price'] * item['quantity']:,}₽</td>
            </tr>
            '''
        
        html_content = f'''
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 28px;">НОВЫЙ ЗАКАЗ</h1>
                <p style="margin: 10px 0 0 0; font-size: 18px;">Заказ #{order_id}</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #667eea; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Контактные данные клиента</h2>
                    <p style="margin: 10px 0;"><strong>Имя:</strong> {customer_name or 'Не указано'}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> {customer_email or 'Не указан'}</p>
                    <p style="margin: 10px 0;"><strong>Телефон:</strong> {customer_phone or 'Не указан'}</p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #667eea; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Детали заказа</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <thead>
                            <tr style="background: #f5f5f5;">
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #667eea;">Товар</th>
                                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #667eea;">Кол-во</th>
                                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #667eea;">Цена</th>
                                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #667eea;">Сумма</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items_html}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" style="padding: 15px 8px; text-align: right; font-size: 18px; font-weight: bold; border-top: 2px solid #667eea;">ИТОГО:</td>
                                <td style="padding: 15px 8px; text-align: right; font-size: 18px; font-weight: bold; color: #667eea; border-top: 2px solid #667eea;">{total_amount:,}₽</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #667eea; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Доставка и оплата</h2>
                    <p style="margin: 10px 0;"><strong>Способ получения:</strong> {delivery_method_text}</p>
                    <p style="margin: 10px 0;"><strong>Адрес доставки:</strong> {delivery_address}</p>
                    <p style="margin: 10px 0;"><strong>Способ оплаты:</strong> {payment_method_text}</p>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                    <p style="margin: 0; color: #856404;"><strong>Важно:</strong> Свяжитесь с клиентом для подтверждения заказа!</p>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                <p>Центр креативных индустрий «БАЗА»</p>
                <p>Нижнекамск | +7 950 317-13-77 | @nkbaza</p>
            </div>
        </body>
        </html>
        '''
        
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        with smtplib.SMTP(smtp_host, int(smtp_port)) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
            
    except Exception as e:
        print(f'Ошибка отправки email: {str(e)}')
