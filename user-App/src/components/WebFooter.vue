<template>
    <footer>
      <div class="footer-content">
        <div class="section">
          <h6>Contact Us</h6>
          <p>Email: info@toothfairydentisthub.com</p>
          <p>Customer Support: +46 1234-56789</p>
        </div>
  
        <div class="section">
          <h6>About Us</h6>
          <p>Copyright &copy; 2023 | Version 1.0.0 | <router-link to="/AboutUs">About Us</router-link></p>
        </div>
  
        <div class="section">
          <h6>Accepted Payments</h6>
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
    position: relative;
    color: white;
    bottom: 0;
    width: 100%;
  }
  
  .section {
    flex: 1;
    margin-right: 20px;
  }
  
  .section h6 {
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
  