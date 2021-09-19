import axios from 'axios';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

const isElectron = require('is-electron');
const electron = isElectron();
const store = electron ? window.localStorage : localStorage;

const { SERVER_API_URL } = process.env;

const useScroll = ({ limit, serverPath, data, setData, ID, cleanData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [handleGetMore, setHandleGetMore] = useState(1);
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

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
          offset: handleGetMore === 1 ? 0 : data.length,
          limit: limit ? limit : 10,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      };
      const response = await axios(config);
      const responseData = response.data;
      console.log('GetMore:', handleGetMore);
      if (handleGetMore === 1) {
        dispatch(setData(responseData.items));
      } else {
        dispatch(setData([...data, ...responseData.items]));
      }
      setHasMore(responseData.has_more);
      setLoading(false);
      return () => cancel();
    } catch (error) {
      console.log('error useScroll', error);
      setError(true);
      setLoading(false);
      if (axios.isCancel(error)) {
        return;
      }
    }
  }, [handleGetMore, serverPath, limit]);

  const firstElementRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setHandleGetMore((prevHandleGetMore) => prevHandleGetMore + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    GetData();
  }, [GetData]);

  useEffect(() => {
    return () => {
      dispatch(cleanData([]));
      setHandleGetMore(1);
    };
  }, [ID]);

  return { loading, error, hasMore, firstElementRef };
};

export default useScroll;
