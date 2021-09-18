import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const isElectron = require('is-electron');
const electron = isElectron();
const store = electron ? window.localStorage : localStorage;

const { SERVER_API_URL } = process.env;

const useScroll = ({
  handleGetMore,
  limit,
  serverPath,
  data,
  setData,
  clean,
  setClean,
}) => {
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
          offset: clean ? 0 : data.length,
          limit: limit ? limit : 10,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      };
      const response = await axios(config);
      const responseData = response.data;
      console.log('clean1:', clean);
      if (clean) {
        dispatch(setData(responseData.items));
        setClean(false);
      } else {
        dispatch(setData([...data, ...responseData.items]));
      }
      console.log('clean2:', clean);
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
  }, [GetData]);

  return { loading, error, hasMore };
};

export default useScroll;
