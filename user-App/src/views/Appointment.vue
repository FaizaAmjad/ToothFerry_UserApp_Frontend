<template>
    <div class="reservation">
      <div class="box">
        <label>Reservation</label>
        <div class="content">
          <div class="left-section">
            <button>Regular</button>
          </div>
          <div class="right-section">
            <button>Emergency</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .reservation {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: "Jost", sans-serif;
    background-color: #c4ced6;
  }
  
  .box {
    display: flex;
    flex-direction: column;
    width: 200%; /* Adjust the width as needed */
    height: 500px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #00072D;
  }
  
  label {
    color: #3f3f3f;
    font-size: 2.3em;
    font-weight: bold;
    cursor: pointer;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  
  .content {
    display: flex;
    flex: 1;
  }
  
  .left-section,
  .right-section {
    flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  }

  .content button {
    font-size: 1.5em; /* Adjust the font size of the buttons */
    padding: 20px 35px;
    border-radius: 10px;
    border-color: #c4ced6;
  }
  </style>
  