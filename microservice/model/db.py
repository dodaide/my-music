import mysql.connector
from model.db_config import DB_CONFIG

class DB:
    def __init__(self):
        self.db = mysql.connector.connect(**DB_CONFIG)
        self.cursor = self.db.cursor()

    def executeAll(self, split_values):
        query = "SELECT upper(hash), song_id, offset FROM fingerprints WHERE upper(hash) IN ({})"
        query = query.format(', '.join(['%s'] * len(split_values)))
        self.cursor.execute(query, split_values)
        data = self.cursor.fetchall()
        return data

    def get_song_by_id(self, id):
        query = "SELECT songs.id, tblanh.source, songs.tenBaiHat, songs.tenTacGia, songs.soLuotNghe FROM songs JOIN tblanh ON songs.idAnh = tblanh.id WHERE songs.id = %s"
        self.cursor.execute(query, (id, ))
        rows = self.cursor.fetchall()
        datas = []
        for row in rows:
            data = {
                'id': row[0],
                'sourceImg': row[1],
                'tenBaiHat': row[2],
                'tenTacGia': row[3],
                'soLuotNghe': row[4]
            }
            datas.append(data)

        return datas

    def store_finger(self, values):
        query = "INSERT INTO fingerprints (hash, song_id, offset) VALUES (%s, %s, %s)"
        self.cursor.executemany(query, values)
        self.db.commit()