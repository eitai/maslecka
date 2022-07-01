import React from 'react';
import Style from './aboutUs.module.scss';
import Navbar from '../../components/navbar/Navbar';
const AboutUs = () => {
  return (
    <div className={Style.main_container}>
      <Navbar isBackgroundColorOn={true} />
      <div className={`container`}>
        <div className={Style.container}>
          <h1 className={Style.title}>אודותינו</h1>
          <div className={Style.sections_container}>
            <div className={Style.section_text}>
              <div className={Style.section_title}>
                {' '}
                <span>החזון והשאיפות של חברתנו</span>
              </div>
              <p>
                מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך.
                סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט -
                לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה.
                לפמעט מוסן מנת. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט
                מיחוצים. קלאצי סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול,
              </p>
              <p>
                מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך.
                סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט -
                לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה.
                לפמעט מוסן מנת. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט
                מיחוצים. קלאצי סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול,
              </p>
              <p>
                מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך.
                סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט -
                לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה.
                לפמעט מוסן מנת. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט
                מיחוצים. קלאצי סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול,
              </p>
            </div>
            <div className={`${Style.img_box} ${Style.section}`}>
              <img
                src={require('../../assets/animatemoney.png')}
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
