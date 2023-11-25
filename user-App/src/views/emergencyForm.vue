<template>
    <div class="wrapper inner">
      <div class="explannation">
        <h4>Please answer following questionnaire.</h4><br/>
      </div>
      <b-form-group label="1. When did you last visit a dentist?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="option1">6 months or less</b-form-checkbox>
          <b-form-checkbox value="option2">More than 6 months, but not more than 1 year ago</b-form-checkbox>
          <b-form-checkbox value="option3">More than 1 year, but not more than 3 years ago</b-form-checkbox>
          <b-form-checkbox value="option4">More than 3 years, but not more than 5 years ago</b-form-checkbox>
          <b-form-checkbox value="option5">More than 5 years ago</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="2. Why did you visit the dentist?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="option1">Personally visited for check-up, examination, or cleaning</b-form-checkbox>
          <b-form-checkbox value="option2">Was called by the dentist for check-up, examination, or cleaning</b-form-checkbox>
          <b-form-checkbox value="option3">The previous treatment had a problem</b-form-checkbox>
          <b-form-checkbox value="option4">Something was wrong, bothering or hurting</b-form-checkbox>
          <b-form-checkbox value="option5">Went for a treatment of a condition that the dentist discovered at earlier checkup or examination</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="3. How often did you hacve aching in mouth?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="option1">Never</b-form-checkbox>
          <b-form-checkbox value="option2">Hardly ever</b-form-checkbox>
          <b-form-checkbox value="option3">Occasionally</b-form-checkbox>
          <b-form-checkbox value="option4">Fairly often</b-form-checkbox>
          <b-form-checkbox value="option5">Very often</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="4. How often did you have difficulty in your job due to oral problem?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="option1">Never</b-form-checkbox>
          <b-form-checkbox value="option2">Hardly ever</b-form-checkbox>
          <b-form-checkbox value="option3">Ocassionally</b-form-checkbox>
          <b-form-checkbox value="option4">Fairly often</b-form-checkbox>
          <b-form-checkbox value="option5">Very often</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="5. How would you rate the health of your teeth and gums?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="option1">Excellent</b-form-checkbox>
          <b-form-checkbox value="option2">Very Good</b-form-checkbox>
          <b-form-checkbox value="option3">Good</b-form-checkbox>
          <b-form-checkbox value="option4">Fair</b-form-checkbox>
          <b-form-checkbox value="option5">Poor</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="6. Have you ever needed to visit a dentist but could not during the last 12 months?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="yes">Yes</b-form-checkbox>
          <b-form-checkbox value="no">No</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="7. Did the dentist explain about the benefit og giving up cigarettes?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="yes">Yes</b-form-checkbox>
          <b-form-checkbox value="no">No</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="8. Did the dentist explain about the benefits of checking blood sugar?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="yes">Yes</b-form-checkbox>
          <b-form-checkbox value="no">No</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="9. Do you think you might have a gum disease?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="yes">Yes</b-form-checkbox>
          <b-form-checkbox value="no">No</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="10. Have you experienced teeth becoming loose without an injury?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="yes">Yes</b-form-checkbox>
          <b-form-checkbox value="no">No</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
  
      <b-button variant="primary" size="lg" @click="submitAnswer">Submit</b-button>
    </div>
  </template>

<script>
export default {
    data() {
    return {
      selected: [],
    };
  },
  methods: {
    submitAnswer() {
      // Collect the answers in an object
      const answers = {
        visitDentist: this.selected[0] || null,
        visitReason: this.selected[1] || null,
        achingInMouth: this.selected[2] || null,
        jobDifficultyDueToOralProblem: this.selected[3] || null,
        teethAndGumsHealth: this.selected[4] || null,
        unableToVisitDentist: this.selected[5] || null,
        dentistExplainedCigarettes: this.selected[6] || null,
        dentistExplainedBloodSugar: this.selected[7] || null,
        gumDiseasePossibility: this.selected[8] || null,
        looseTeethWithoutInjury: this.selected[9] || null,
      };

      // Convert the object to JSON
      const jsonData = JSON.stringify(answers, null, 2);

      // Create a Blob containing the JSON data
      const blob = new Blob([jsonData], { type: 'application/json' });

      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'questionnaire_answers.json';

      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);
    },
  },
}
</script>

<style>
.inner {
    margin-left: 150px;
    margin-right: 150px;
    margin-top: 60px;
    margin-bottom: 60px;
    background: #ffffff;
    padding: 40px;
    border-radius: 15px;
    transition: all .3s;
    text-align: left;
}
.explannation {
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 40px;
}
</style>