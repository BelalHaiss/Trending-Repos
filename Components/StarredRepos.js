import React from 'react';

import repoStyles from '../styles/repo.module.scss';
const StarredRepos = ({ item }) => {
  let repoCreated = new Date().getTime() - new Date(item.created_at).getTime();
  const differnceInDays = Math.floor(repoCreated / (1000 * 3600 * 24));

  return (
    <div className={repoStyles.container}>
      <div className={repoStyles.avatar}>
        <img src={item?.owner?.avatar_url} />
      </div>
      <div className={repoStyles.details}>
        <div className={repoStyles.name}>
          <p>{item.name}</p>
        </div>
        <div className={repoStyles.desc}>
          <p> {item.description}</p>
        </div>
        <div className={repoStyles.info}>
          <span className={repoStyles.stars}>
            stars: {item.stargazers_count}
          </span>
          <span className={repoStyles.issues}> issues:{item.open_issues} </span>
          <p className={repoStyles.info_text}>
            Submitted {differnceInDays} days ago by {item.owner.login}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StarredRepos);
