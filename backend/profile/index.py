import json
import os
import psycopg2

def get_db_connection():
    '''Подключение к базе данных'''
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: dict, context) -> dict:
    '''API для управления профилем пользователя'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
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
            cur.execute(
                'SELECT id, email, full_name, phone FROM users WHERE id = %s',
                (user_id,)
            )
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь не найден'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'user': {
                        'id': user[0],
                        'email': user[1],
                        'full_name': user[2],
                        'phone': user[3]
                    }
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            full_name = body.get('full_name', '').strip()
            phone = body.get('phone', '').strip()
            
            if not full_name:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Имя обязательно для заполнения'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                'UPDATE users SET full_name = %s, phone = %s WHERE id = %s RETURNING id, email, full_name, phone',
                (full_name, phone, user_id)
            )
            updated_user = cur.fetchone()
            conn.commit()
            
            if not updated_user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь не найден'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user': {
                        'id': updated_user[0],
                        'email': updated_user[1],
                        'full_name': updated_user[2],
                        'phone': updated_user[3]
                    }
                }),
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
