import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

def handler(event: dict, context) -> dict:
    """Обработка формы обратной связи и отправка email-уведомлений"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        data = json.loads(event.get('body', '{}'))
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        message = data.get('message', '').strip()
        
        if not name or not email or not message:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Заполните все обязательные поля'})
            }
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        if not all([smtp_host, smtp_user, smtp_password]):
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Email не настроен'})
            }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новое сообщение от {name}'
        msg['From'] = smtp_user
        msg['To'] = smtp_user
        
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #000; color: #fff; padding: 20px; text-align: center; }}
                .content {{ background: #f9f9f9; padding: 20px; margin: 20px 0; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #666; }}
                .value {{ margin-top: 5px; }}
                .footer {{ text-align: center; color: #999; font-size: 12px; padding: 20px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>БАЗА МАРКЕТПЛЕЙС</h1>
                    <p>Новое сообщение с сайта</p>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">ИМЯ:</div>
                        <div class="value">{name}</div>
                    </div>
                    <div class="field">
                        <div class="label">EMAIL:</div>
                        <div class="value"><a href="mailto:{email}">{email}</a></div>
                    </div>
                    <div class="field">
                        <div class="label">ТЕЛЕФОН:</div>
                        <div class="value">{phone if phone else 'Не указан'}</div>
                    </div>
                    <div class="field">
                        <div class="label">СООБЩЕНИЕ:</div>
                        <div class="value">{message}</div>
                    </div>
                    <div class="field">
                        <div class="label">ДАТА И ВРЕМЯ:</div>
                        <div class="value">{datetime.now().strftime('%d.%m.%Y %H:%M:%S')}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>© 2026 Центр креативных индустрий «База»</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Сообщение отправлено'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'})
        }
