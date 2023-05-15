import React, { useState, useEffect } from 'react';
import Style from './articles.module.scss';

const Article = ({ data: { title, text, img, isLongText } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${isOpen && Style.openArticle} ${Style.box}`}>
      <span>{title}</span>
      {isLongText && (
        <button className={Style.btnOpen} onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? 'קרא עוד' : 'קרא פחות'}
        </button>
      )}
      <div>
        <img
          src={require(`../../assets/${img}`)}
          alt=''
          className={Style.img}
        />
        {text.map((text) => (
          <div className={Style.text}>{text}</div>
        ))}
      </div>
    </div>
  );
};

export default Article;
