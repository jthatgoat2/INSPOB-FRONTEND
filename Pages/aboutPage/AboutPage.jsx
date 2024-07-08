import React from "react";
import "./AboutPage.scss";
import Header from "../../componet/Header/Header"; // Fixed typo in import path

function AboutPage() {
  return (
    <>
      <Header />
      <div className="about">
        <section className="hero">
          <h1>About Us</h1>
          <p>
            Welcome to My Application! I am big on faith-based software, and
            this is my creation guided by the Creator.
          </p>
        </section>
        <section className="bible-verse">
          <span>1 Corinthians 15:58</span>
          <p>
            Therefore, my beloved brethren, be ye steadfast, unmovable, always
            abounding in the work of the Lord, forasmuch as ye know that your
            labor is not in vain in the Lord.
          </p>
        </section>
        <section className="mission-statement">
          <h2>Mission Statement</h2>
          <p>
            My name is Johndy Hamilton. As a Christian, I feel that every
            personal project has to be for God. He has done a lot for me, so I
            thought, why not return the favor? He has so much in store for me,
            so why don't I build something based around my faith and what I
            believe in? Heavenly Father, bless this project and bless the user
            in the name of Jesus.
          </p>
        </section>
        <section className="contributors">
          <h3>Important Contributors</h3>
          <ul>
            <li>
              <img
                src="/images/profile-pic.jpg" // Adjust the path according to your project structure
                alt="Johndy Hamilton"
                className="profile-pic"
              />
              <div>
                <strong>Johndy Hamilton</strong> - CEO
              </div>
            </li>
            <li>
              <img
                src="/images/contributor-pic.jpg" // Adjust the path according to your project structure
                alt="Ruth-Keisha Etienne"
                className="profile-pic"
              />
              <div>
                <strong>Ruth-Keisha Etienne</strong> - CTO
              </div>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

export default AboutPage;
