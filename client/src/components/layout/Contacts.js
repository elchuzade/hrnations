import React, { Component } from 'react';
import Helmet from 'react-helmet';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Helmet>
          <style>
            {'footer { position: absolute; width: 100%; bottom: 0; }'}
          </style>
        </Helmet>
        <section id="contactForm">
          <div className="container">
            <div className="row mt-5">
              <div className="col">
                <h3 className="text-center">Contact Me</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto">
                <form
                  method="POST"
                  action="https://formspree.io/webinartrack@gmail.com"
                >
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      type="message"
                      className="form-control"
                      placeholder="Message"
                      rows="5"
                    />
                  </div>
                  <div className="row mb-5">
                    <div className="col text-center">
                      <button className="btn btn-secondary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Contacts;
