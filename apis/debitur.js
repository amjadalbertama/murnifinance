import axios from 'axios';

const baseurl = 'debitur';

export default {
  list(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        const keys = ['page', 'limit', 'sortBy', 'sortDir', 'searchtext'];
        let str = '';
        for (const key in obj) {
          if (keys.indexOf(key) >= 0 && obj[key]) {
            str += str ? '&' : '?';
            str += key + '=' + encodeURIComponent(obj[key]);
          }
        }
        const url = `/${baseurl}${str}`;
        const {data} = await axios.get(url);
        const {meta, list} = data;
        obj.total = meta.total;
        resolve(list);
      } catch (error) {
        console.log('error', error);
        reject(error);
      }
    });
  },
  detail(nasabahkey) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `/collectormobile/debitur-detail/${nasabahkey}`;
        const {data} = await axios.get(url);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  pinjamanaktif(nasabahkey) {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await axios.get(
          `/collectormobile/pinjaman-aktif/${nasabahkey}`,
        );
        resolve(data);
      } catch (error) {
        console.log('updateActivity error', error);
        reject(error);
      }
    });
  },
  historyActivity(nasabahkey) {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await axios.get(
          `/collectormobile/history-activity/${nasabahkey}`,
        );
        resolve(data);
      } catch (error) {
        console.log('updateActivity error', error);
        reject(error);
      }
    });
  },
  updateActivity(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.post('/collectormobile/update-activity', obj);
        resolve();
      } catch (error) {
        console.log('updateActivity error', error);
        reject(error);
      }
    });
  },
};
