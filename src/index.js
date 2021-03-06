const request = require('request');          // Handles http requests
const { TokenBucket } = require('limiter');  // Handles the limitations of the fryd API

const baseUri = 'https://api.fryd.zone';     // Endpoint for all fryd requests

module.exports = class Fryd {
  constructor(burst, fill) {
    this.burst = burst || 20;
    this.fill = fill || 10;
    this.bucket = new TokenBucket(burst, fill, 'second', null);
  }

  getTrophiesFromList(token, id) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/api/trophies`,
          method: 'POST',
          body: JSON.stringify({
            token,
            trophylist_id: id,
          }),
        }, (err, res, data) => {
          if (!err && res.statusCode === 200) {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }

  getTrophyLists(token, id) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/api/trophylists`,
          method: 'POST',
          body: JSON.stringify({
            token,
            location_id: id,
          }),
        }, (err, res, data) => {
          if (!err && res.statusCode === 200) {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }

  getLocationInfo(token, id) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/api/location`,
          method: 'POST',
          body: JSON.stringify({
            token,
            location_id: id,
          }),
        }, (err, res, data) => {
          if (!err && res.statusCode === 200) {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }

  getTrophyInfo(token, id) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/api/trophy`,
          method: 'POST',
          body: JSON.stringify({
            token,
            trophy_id: id,
          }),
        }, (err, res, data) => {
          if (!err && res.statusCode === 200) {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }

  getAllUserTrophies(token) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/api/user/trophies`,
          method: 'POST',
          body: JSON.stringify({
            token,
          }),
        }, (err, res, data) => {
          if (!err && res.statusCode === 200) {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }

  getUserInfo(token) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/api/user`,
          method: 'POST',
          body: JSON.stringify({
            token,
          }),
        }, (err, res, data) => {
          if (!err && res.statusCode === 200) {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }

  postTrophySuccess(userToken, appToken, location, secret) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/api/trophycheck`,
          method: 'POST',
          body: JSON.stringify({
            user_token: userToken,
            app_token: appToken,
            location_id: location,
            secret,
          }),
        }, (err, res) => {
          if (!err && res.statusCode === 204) {
            resolve('Success successfully posted');
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }

  getTokenFromClientCred(clientId, clientSecret, state) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/auth/token`,
          method: 'POST',
          form: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&state=${state}`,
        }, (err, res, data) => {
          if (!err && res.statusCode === 200) {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }

  getTokenFromCode(code, redUri, clientId, clientSecret, state) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/auth/token`,
          method: 'POST',
          form: `grant_type=authorization_code&code=${code}&redirect_uri=${redUri}&client_id=${clientId}&client_secret=${clientSecret}&state=${state}`,
        }, (err, res, data) => {
          if (!err && res.statusCode === 200) {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }

  getTokenFromCodeRefreshToken(refreshToken, clientId, clientSecret, state) {
    return new Promise(((resolve, reject) => {
      this.bucket.removeTokens(1, () => {
        request({
          url: `${baseUri}/auth/token`,
          method: 'POST',
          form: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&state=${state}`,
        }, (err, res, data) => {
          if (!err && res.statusCode === 200) {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } else {
            reject(err || `${res.statusCode} ${res.statusMessage}`);
          }
        });
      });
    }));
  }
};
