<template>
    <footer>
      <div class="footer-content">
        <div class="section">
          <h3>Contact Us</h3>
          <p>Email: info@toothfairydentisthub.com</p>
          <p>Customer Support: +46 1234-56789</p>
        </div>
  
        <div class="section">
          <h3>About Us</h3>
          <router-link to="/about">Explore our mission, vision, and values.</router-link>
        </div>
  
        <div class="section">
          <h3>Accepted Payments</h3>
          <p>Payments are only made at the clinic.</p>
        </div>

      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer-content {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px;
    background-color: #214471;
    color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  
  .section {
    flex: 1;
    margin-right: 20px;
  }
  
  .section h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .section p {
    margin: 5px 0;
  }
  
  .section router-link {
    color: white;
    text-decoration: none;
  }
  
  .section router-link:hover {
    text-decoration: underline;
  }
  </style>
  