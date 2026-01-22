import json
import os
import psycopg2
from telegram_notifier import send_telegram_notification
from email_notifier import send_email_notification

def get_db_connection():
    '''Подключение к базе данных'''
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: dict, context) -> dict:
    '''API для управления заказами пользователя'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        user_id = event.get('headers', {}).get('X-User-Id') or event.get('headers', {}).get('x-user-id')
        
        if not user_id:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Необходима авторизация'}),
                'isBase64Encoded': False
            }
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        if method == 'GET':
            cur.execute('''
                SELECT o.id, o.total_amount, o.status, o.delivery_address, 
                       o.delivery_method, o.payment_method, o.created_at
                FROM orders o
                WHERE o.user_id = %s
                ORDER BY o.created_at DESC
            ''', (user_id,))
            
            orders = []
            for row in cur.fetchall():
                order_id = row[0]
                
                cur.execute('''
                    SELECT product_name, product_price, quantity
                    FROM order_items
                    WHERE order_id = %s
                ''', (order_id,))
                
                items = [
                    {
                        'product_name': item[0],
                        'product_price': item[1],
                        'quantity': item[2]
                    }
                    for item in cur.fetchall()
                ]
                
                orders.append({
                    'id': row[0],
                    'total_amount': row[1],
                    'status': row[2],
                    'delivery_address': row[3],
                    'delivery_method': row[4],
                    'payment_method': row[5],
                    'created_at': row[6].isoformat() if row[6] else None,
                    'items': items
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'orders': orders}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            items = body.get('items', [])
            total_amount = body.get('total_amount', 0)
            delivery_address = body.get('delivery_address', '')
            delivery_method = body.get('delivery_method', 'pickup')
            payment_method = body.get('payment_method', 'cash')
            
            cur.execute('SELECT full_name, email, phone FROM users WHERE id = %s', (user_id,))
            user_data = cur.fetchone()
            
            if not user_data:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь не найден'}),
                    'isBase64Encoded': False
                }
            
            customer_name = user_data[0]
            customer_email = user_data[1]
            customer_phone = user_data[2] or ''
            
            if not items or not total_amount:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Корзина пуста'}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                INSERT INTO orders (user_id, total_amount, delivery_address, delivery_method, payment_method, 
                                    customer_name, customer_email, customer_phone)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            ''', (user_id, total_amount, delivery_address, delivery_method, payment_method, 
                  customer_name, customer_email, customer_phone))
            
            order_id = cur.fetchone()[0]
            
            for item in items:
                cur.execute('''
                    INSERT INTO order_items (order_id, product_name, product_price, quantity)
                    VALUES (%s, %s, %s, %s)
                ''', (order_id, item['name'], item['price'], item['quantity']))
            
            conn.commit()
            
            send_telegram_notification(
                order_id=order_id,
                customer_name=customer_name,
                customer_email=customer_email,
                customer_phone=customer_phone,
                items=items,
                total_amount=total_amount,
                delivery_method=delivery_method,
                delivery_address=delivery_address,
                payment_method=payment_method
            )
            
            send_email_notification(
                order_id=order_id,
                customer_name=customer_name,
                customer_email=customer_email,
                customer_phone=customer_phone,
                items=items,
                total_amount=total_amount,
                delivery_method=delivery_method,
                delivery_address=delivery_address,
                payment_method=payment_method
            )
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'order_id': order_id}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()