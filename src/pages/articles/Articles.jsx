import React, { useState, useEffect } from 'react';
import Style from './articles.module.scss';
import { articlesMock } from './articleMock';
import Article from './Article';

const Articles = () => {
  return (
    <div className={`container ${Style.container}`}>
      <h1 className={Style.title}>כתבות העולם הפיננסי</h1>
      {articlesMock?.map((data, index) => {
        return <Article data={data} key={index} />;
      })}
    </div>
  );
};

export default Articles;
