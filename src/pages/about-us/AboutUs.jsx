import React from 'react';
import Style from './aboutUs.module.scss';
const AboutUs = () => {
  return (
    <div className={Style.main_container}>
      <div className={`container ${Style.aboutus_container}`}>
        <div className={Style.container}>
          <h1 className={Style.title}>אודות "קצב פיננסי"</h1>
          <div className={Style.sections_container}>
            <div className={Style.section_text}>
              <div className={Style.section_title}> </div>
              <p>
                אודות "קצב פיננסי" תמיד חלמתם שמקום אחד ידאג לכם <br />
                אתר שפשוט ירכז לכם את כל נושא הביטוח והפיננסים במקום אחד , אתר
                כזה שלא רק שירכז אחד כזה שגם יגיד לכם איפה ומה ניתן לשפר .{' '}
                <br />
                אז זהו שהחלום כבר כאן <br />
                לאחר שבדקנו את השוק וגילינו שהצרכים שאתם כל כך רוצים ושכל כך
                חשובים לכם לא מקבלים מענה בשום מקום וגם אם יש אתר כזה הוא כל כך
                מעומעם שכול מטרתו היא לדוג אתכם
                <br />
                לכן הרמנו את הכפפה והקמנו את "הקצב הפיננסי"
                <br />
                אתר שפשוט ירכז לכם את כל החסכונות וההוצאות במקום אחד <br />
                אתר שיגיד לכם מה המצב הכלכלי שלכם ביחס לחתך שלכם <br />
                אתר שפשוט יחסוך לכם כל כך הרבה <br />
                וכמובן יכפיל לכם את החסכונות <br />
                <br />
                אנחנו נאפשר לכם לנהל את הכסף שלכם בקלות, לחסוך, לצמוח ולהצליח
                להגשים <br />
                את המטרות, התוכניות והחלומות שלכם. <br />
                האתר הוקם כדי לשרת את האינטרסים שלכם ולאפשר לכם לחיות טוב יותר
                עם הכסף שלכם. <br />
                <br />
                שלכם ורק בשבילכם ,
                <br />
                "הקצב הפיננסי"
              </p>
            </div>
            <div className={`${Style.img_box} ${Style.section}`}>
              <img
                src={require('../../assets/animatemoney.webp')}
                alt='25d Png vectors by Lovepik.com'
                className={Style.img}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
