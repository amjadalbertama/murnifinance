import axios from 'axios';

const baseurl = 'collectormobile';

export default {
  list(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('obj', obj);
        const keys = ['page', 'limit', 'sortBy', 'sortDir', 'searchtext'];
        let str = '';
        for (const key in obj) {
          if (keys.indexOf(key) >= 0 && obj[key]) {
            str += str ? '&' : '?';
            str += key + '=' + encodeURIComponent(obj[key]);
          }
        }
        const url = `/${baseurl}/pelunasan${str}`;
        console.log('url', url);
        const {data} = await axios.get(url);
        const {meta, list} = data;
        obj.total = meta.total;
        const dtSet = {list, total: meta.total};
        resolve(dtSet);
      } catch (error) {
        console.log('error', error);
        alert(error);
        reject(error);
      }
    });
  },
};
