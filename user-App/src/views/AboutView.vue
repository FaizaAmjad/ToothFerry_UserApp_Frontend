<template>
  <div class="background">
   
   <div class="container"> 
    <div class="about">
      <h1>This is an about page</h1>

      <h1>About Tooth Fairy Dentist Hub</h1>
      <h3>Welcome to our world of dental excellence and care.</h3>
      
      <p class="about-description"> 
        Welcome to Tooth Fairy Dentist Hub, the exclusive platform for registered dentists affiliated with the Tooth Fairy organization in Gothenburg.
      </p>
     
      <div class="about-text">
         <p>🦷 Our Mission:</p>
         <p>
           Connected to numerous clinics, Tooth Fairy simplifies the appointment process. Dentists can manage their schedules, view bookings, receive notifications, and seamlessly handle cancellations.
         </p> 
      
      
         <p>💙 Dentist-Focused Features:</p>
         <p>
           This platform empowers dentists to showcase availability, manage appointments, and attend to emergency cases. A unified hub for convenient control and a touch of professional magic.
         </p>

         <p>🌟 Why Choose Us:</p>
         <p>
           At Tooth Fairy, we prioritize the comfort and efficiency of our dentists. Experience the ease of having everything in one place, designed with care for our dental professionals.
         </p>

         <p>🔗 Get Started:</p>
         <p> 
          Join Tooth Fairy Dentist Hub and discover a world of streamlined dental practice management!
         </p>

         <p>
          Because your success is our priority. 🌈✨
         </p>

      </div> 
     </div>
    </div>
  </div>
</template>

<style scoped>
.background{
  background-color: rgb(220, 212, 244);
  padding: 3%;
  min-height: 100vh;
  box-sizing: border-box;

}
.container{
  background-color: rgb(191, 178, 226);
  border-radius: 20px;
}
.about {
    text-align: center;
    padding: 20px;
  }

  h1 {
    color: rgb(53, 0, 89); 
  }

  h3 {
    font-size: 18px;
    font-style: italic;
    color: rgb(45, 5, 85);
    margin: 20px 0;
    margin-bottom: 40px;
  }
  p{
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: 500;
    margin-bottom: 15px;
  }
  .about-text{
    text-align: left;
  }
  .about-description {
  font-weight: 800;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

</style>

