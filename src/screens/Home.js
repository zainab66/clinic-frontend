import React from 'react';

export default function Home() {
  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          >
            <img className="bi me-2" width={40} height={32}></img>
            <span className="fs-4">Xi-team</span>
          </a>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                Why Xi-team?
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Platform?
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                About
              </a>
            </li>
          </ul>
        </header>

        <main>
          <section class="py-5 text-center container">
            <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">
                  {' '}
                  A Platform built for a new way of working.
                </h1>
                <p class="lead text-muted">
                  What would you like to manage with Xi-team?
                </p>
                <p>
                  <a href="/dashboard" class="btn btn-primary my-2 mx-2">
                    Clinic Management System{' '}
                  </a>
                  <a href="#" class="btn btn-primary my-2">
                    School Management System
                  </a>
                  <a href="#" class="btn btn-primary my-2">
                    Inventory Management System
                  </a>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
