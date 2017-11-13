var Promise = require('es6-promise.min').Promise

function fetchApi(url, method, params){
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: params,
      success: function (result) {
        if (result.statusCode == 200 || result.statusCode == 201) {
            resolve(result.data);
        } else {
            reject(result);
            wx.showModal({
                title: '提示',
                content: result.data.errMsg,
                showCancel: false,
                confirmColor: '#b42a2a',
                success: function (res) {
                }
            })
        }
      },
      fail: function (result) {
        reject(result);
      }
    })
  })
}

function fetchGet(url, params = {}){
  return fetchApi( url, 'GET', params)
}

function fetchPost(url, params = {}){
  return fetchApi(url, 'POST', params)
}

function fetchDelete(url, params = {}){
  return fetchApi(url, 'DELETE', params)
}

module.exports = {
  fetchGet: fetchGet,
  fetchPost: fetchPost,
  fetchDelete: fetchDelete,
}
