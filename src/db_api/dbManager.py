import pymysql.cursors


# MySQLに接続する
def runQuery(sql):
    print(str(sql))
    connect =  pymysql.connect(host='mysql',
                             user='python',
                             passwd='python',
                             db='question',
                             charset='utf8',
                             cursorclass=pymysql.cursors.DictCursor)
    connect =  connect.cursor()
    connect.execute(sql)
    result = connect.fetchall()
    connect.close()
    return result


def getTest():
    cur = makeConnect()
    cur.execute("SELECT * FROM questions limit 1")
    conn.close()

    # Select結果を取り出す
    # results = cur.fetchall()
    for row in cur.fetchall():
        return("{}:{}".format(row["id"], row["text"]))


    return results

def getSize(genreId=0, sourceNo=0):
    where = ""
    #count = "null"
    if(int(genreId) != 0):
        where = "genre = "+genreId

    if(int(sourceNo) != 0):
        if(where != ""):
            where = where + " and "
        where =  where + "sourceNo = "+ sourceNo

    if(where != ""):
        where = "where " + where

    resultArray = runQuery("SELECT count(id) as count FROM questions " + where + " Limit 1")
    for row in resultArray:
        count = row["count"]

    return  count


def getList(genreId=0, sourceNo=0, parms = "*"):
    where = ""
    #count = "null"
    if(int(genreId) != 0):
        where = "genre = "+genreId

    if(int(sourceNo) != 0):
        if(where != ""):
            where = where + " and "
        where =  where + "sourceNo = "+ sourceNo

    if(where != ""):
        where = "where " + where

    resultArray = runQuery("SELECT " + parms + " FROM questions " + where)

    return  resultArray


def getSourceList():
    resultArray = []
    result = runQuery("SELECT DISTINCT sourceNo  FROM question.questions ")
    for row in result:
        resultArray.append(row["sourceNo"])

    return  resultArray
