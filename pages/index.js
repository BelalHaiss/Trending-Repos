import Head from 'next/head';
import { useEffect, useState } from 'react';
import StarredRepos from '../Components/StarredRepos';
import InfiniteScroll from 'react-infinite-scroll-component';
export default function Home({ repos, error }) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [repoState, setRepoState] = useState(repos.items);
  const loadMore = async () => {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${
        page + 1
      }`
    );
    const repos = await res.json();
    if (res.ok) {
      setRepoState((prevRepos) => [...prevRepos, ...repos.items]);
      if (!repos.incomplete_results) return setHasMore(false);
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (error) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: '30vh' }}>
        Server Error - Bad Request
      </h2>
    );
  }

  return (
    <>
      <Head>
        <title>Trending Repos</title>
      </Head>
      <InfiniteScroll
        dataLength={repoState.length} //This is important field to render the next data
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <h2 style={{ textAlign: 'center' }}> Trending Repos</h2>

        {repoState.map((repo, i) => (
          <StarredRepos key={i} item={repo} />
        ))}
      </InfiniteScroll>
    </>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc`
    );
    const repos = await res.json();

    if (res.ok && repos.incomplete_results) return { props: { repos } };

    throw new Error('server error');
  } catch (error) {
    return { props: { error: error.message } };
  }
}
