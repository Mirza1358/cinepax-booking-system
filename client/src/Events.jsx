import React from 'react';
import './components/styles.css';
import './components/eventsStyles.css';

const Events = () => {
  return (
    <div>

      <div className="bannerr"></div>

      <main>
        <section className="intro container">
          <h1>Our Events and Gallery</h1>
          <p>The Arena also facilitates its valued customers with The Arena Exclusive membership. The Arena exclusive members can avail following benefits.</p>
        </section>

        <section className="gallery container">
          <h2>Events Gallery</h2>
          <div className="events row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2">
            <div className="col event-item">
              <img src="/images/image11.jpg" alt="Event 1" />
            </div>
            <div className="col event-item">
              <img src="/images/image10.jpg" alt="Event 2" />
            </div>
            <div className="col event-item">
              <img src="/images/image20.jpg" alt="Event 3" />
            </div>
            <div className="col event-item">
              <img src="/images/image21.jpg" alt="Event 4" />
            </div>
            <div className="col event-item">
              <img src="/images/image22.jpg" alt="Event 5" />
            </div>
            <div className="col event-item">
              <img src="/images/image23.jpg" alt="Event 6" />
            </div>
            <div className="col event-item">
              <img src="/images/image24.jpg" alt="Event 7" />
            </div>
            <div className="col event-item">
              <img src="/images/image12.jpeg" alt="Event 8" />
            </div>
            <div className="col event-item">
              <img src="/images/image25.jpg" alt="Event 9" />
            </div>
            <div className="col event-item">
              <img src="/images/image26.jpg" alt="Event 10" />
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Events;