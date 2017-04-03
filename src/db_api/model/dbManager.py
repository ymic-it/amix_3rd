import mysql.connector

  # データベースに接続
    connect = mysql.connector.connect(user='hoge', password='hoge', host='hoge', database='hoge', charset='utf8')
    cursor = connect.cursor()

    
