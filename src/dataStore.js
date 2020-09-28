class DataStore {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  getArtWork() {
    return new Promise((resolve, reject) => {
      this.dbClient.get('artData', (err, value) => {
        if (err) {
          reject(err);
        }
        const artData = JSON.parse(value);
        resolve(artData);
      });
    });
  }

  setArtWork(artData) {
    return new Promise((resolve, reject) => {
      this.dbClient.set('artData', JSON.stringify(artData), (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }
}

module.exports = { DataStore };
