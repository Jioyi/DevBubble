import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const { SERVER_API_URL } = process.env;
const isElectron = require('is-electron');
const electron = isElectron();
const store = electron ? window.localStorage : localStorage;
//////////// no se usa
const useScroll = ({ handleGetMore, limit, serverPath, data, setData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const GetData = useCallback(async () => {
    try {
      const token = store.getItem('access_token');
      let cancel;
      let config = {
        method: 'POST',
        url: `${SERVER_API_URL}${serverPath}`,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          offset: data.length,
          limit: limit ? limit : 10,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      };
      const response = await axios(config);
      const responseData = response.data;
      console.log(responseData);
      dispatch(setData([...data, ...responseData.items]));
      setHasMore(responseData.has_more);
      setLoading(false);
      return () => cancel();
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
      if (axios.isCancel(error)) {
        return;
      }
    }
  }, [handleGetMore, serverPath, limit]);

  useEffect(() => {
    GetData();
    return () => {
      console.log('ño1');
      dispatch(setData([]));
    };
  }, [GetData]);

  return { loading, error, hasMore };
};

export default useScroll;
