import { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
const DataList = lazy(() => import('./DataList/DataList'));

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async() => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=18&_page=${page}`);
    const resData = await response.json();
    setData(resData);
  }

  const fetchMoreData = async() => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
    const resData = await response.json();
    setData((prev) => [...prev, ...resData]);
    setLoading(false);
  }

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
    ){
      setLoading(true);
      fetchMoreData();
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, []);
  
  return (
    <div className="App">
      <p className='appHeader'>List Items</p>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Suspense fallback={<div>Loading...</div>}>
          <DataList data={data} />
          {loading && <p>Loading...</p>}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;