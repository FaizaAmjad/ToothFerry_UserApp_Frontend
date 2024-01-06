<template>
  <div>
    <b-alert variant="danger" :show="alert !== null">{{ alert }}</b-alert>
    <div class="my-page wrapper d-flex align-items-center justify-content-center">
      <div class="col-7 main-mypage auth-wrapper">
        <form class="col-lg-6">
          <div class="my-page-label">My Page</div>
          <div class="auth-inner">
            <p>My account:</p>
            <input
              class="current-email"
              type="text"
              :placeholder="showOtherField ? '' : email"
              v-model="currentEmail"
              disabled
            />
            <input
              v-if="showOtherField"
              type="text"
              v-model="firstName"
              placeholder="New FirstName"
            />

            <input
              v-if="showOtherField"
              type="text"
              v-model="lastName"
              placeholder="New LastName"
            />

            <input v-if="showOtherField" type="text" v-model="email" placeholder="New email" />
            <input
              v-if="showOtherField"
              type="password"
              v-model="password"
              placeholder="New Password"
            />
            <div class="d-flex w-100 justify-content-center">
              <form @submit.prevent="edit">
                <b-button
                  type="submit"
                  variant="secondary"
                  class="w-auto mr-2"
                  v-show="showEditButton"
                >
                  <span>Edit</span>
                </b-button>
              </form>
              <form @submit.prevent="discardChanges">
                <b-button
                  type="submit"
                  variant="danger"
                  class="w-auto mr-2"
                  v-show="showDiscardButton"
                >
                  <span>Discard</span>
                </b-button>
              </form>
              <div style="margin-right: 10px"></div>
              <form @submit.prevent="editAccount">
                <b-button type="submit" v-show="showSaveButton" variant="success" class="w-auto">
                  <span>Save changes</span>
                </b-button>
              </form>
              <form @submit.prevent="deleteAccount" v-show="!showOtherField">
                <b-button variant="danger" type="submit" class="w-auto">
                  <span>Delete</span>
                </b-button>
              </form>
            </div>
          </div>
          <div>
            <div class="theme mt-3 d-flex flex-column align-items-center">
              <div class="auth-inner">
                <p>
                  Current Theme:
                  <b-dropdown
                    id="dropdown-right"
                    right
                    :text="selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)"
                    variant="primary"
                    class="ml-2"
                  >
                    <b-dropdown-item @click="setSelectedTheme('dark')" href="#"
                      >Dark</b-dropdown-item
                    >
                    <b-dropdown-item @click="setSelectedTheme('light')" href="#"
                      >Light</b-dropdown-item
                    >
                  </b-dropdown>
                </p>

                <form @submit.prevent="updateTheme">
                  <b-button
                    type="submit"
                    v-show="showUpdateButton"
                    variant="success"
                    class="w-auto"
                  >
                    <span id="apply-button">Update Theme</span>
                  </b-button>
                </form>
              </div>
            </div>
            <div style="margin-right: 20px"></div>
            <div class="theme mt-3 d-flex flex-column align-items-center">
              <div class="auth-inner">
                <p>
                  Current Language:
                  <b-dropdown
                    id="dropdown-right"
                    right
                    :text="selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)"
                    variant="primary"
                    class="ml-2"
                  >
                    <b-dropdown-item @click="setSelectedLanguage('english')" href="#"
                      >English</b-dropdown-item
                    >
                    <b-dropdown-item @click="setSelectedLanguage('swedish')" href="#"
                      >Swedish</b-dropdown-item
                    >
                    <b-dropdown-item @click="setSelectedLanguage('korean')" href="#"
                      >Korean</b-dropdown-item
                    >
                  </b-dropdown>
                </p>

                <form @submit.prevent="updateLanguage">
                  <b-button
                    type="submit"
                    v-show="showUpdateButton"
                    variant="success"
                    class="w-auto"
                  >
                    <span id="apply-button">Update Language</span>
                  </b-button>
                </form>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteUser, getUserInfo, updateUser } from '../apis/users'

export default {
  name: 'MyPage',
  data: function () {
    return {
      alert: null,
      email: '',
      newTheme: 'light',
      showOtherField: false, // Initialize to false
      selectedTheme: 'dark',
      selectedLanguage: 'english',
      showEditButton: true,
      showUpdateButton: true,
      showSaveButton: false,
      showDiscardButton: false,
      userId: localStorage.getItem('UserId'),
      modalTitle: '🤨🤨☹️☹️😢😢😢🥹🥹🥹😭😭😭😭😭',
      links: {},
      userDetails: undefined,
      firstName: '',
      lastName: '',
      currentEmail: 'your@email.com',
      password: ''
    }
  },
  async mounted() {
    const notLoggedIn = localStorage.getItem('token') == null
    if (notLoggedIn) {
      this.$router.push('/login')
    }
    this.selectedTheme = localStorage.getItem('selectedTheme') || 'dark'
    this.userDetails = await getUserInfo()
    this.currentEmail = this.userDetails.email
    this.firstName = this.userDetails.firstName
    this.lastName = this.userDetails.lastName
  },
  methods: {
    async editAccount() {
      await updateUser(
        this.userDetails.id,
        this.firstName,
        this.lastName,
        this.email,
        this.password
      )

      localStorage.removeItem('token')
      this.$store.dispatch('user', null)
      this.$router.push('/login')
    },
    async deleteAccount() {
      await deleteUser(this.userDetails.id)

      localStorage.removeItem('token')
      this.$store.dispatch('user', null)
      this.$router.push('/login')
    },
    setSelectedTheme(theme) {
      this.selectedTheme = theme
      this.newTheme = theme
      // Save the selected theme in local storage
      localStorage.setItem('selectedTheme', theme)
    },
    setSelectedLanguage(language) {
      this.selectedLanguage = language
      this.newLanguage = language
      localStorage.setItem('selectedLanguage', language)
    },
    discardChanges() {
      this.showOtherFieldField = false
      this.showOtherField = false
      this.showSaveButton = false
      this.showEditButton = true
      this.showUpdateButton = true
      this.showDiscardButton = false
    },
    edit() {
      // Show the password field when the user starts typing in the email field
      this.showOtherFieldField = true
      this.showOtherField = true
      this.showSaveButton = true
      this.showEditButton = false
      this.showUpdateButton = false
      this.showDiscardButton = true
    },
    showOtherFieldField() {
      // Show the password field when the user starts typing in the email field
      this.showOtherField = true
    },
    toggleEdit() {
      this.showOtherField = !this.showOtherField
    }
  },
  computed: {
    themeClass() {
      return this.selectedTheme === 'dark' ? 'dark' : 'light'
    },
    isEditButtonDisabled() {
      // Disable the "Edit" button if the email field is empty or unchanged
      return !this.currentEmail || this.currentEmail === this.email
    }
  }
}
</script>
<style>
.my-page {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  background: var(--main-bg);
}
.current-email {
  text-align: center;
}

.main-mypage input {
  width: 80%;
  height: auto;
  background: #fbfaf5;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 20px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
}

.main-mypage button {
  width: 70%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: var(--button-letter);
  background: var(--button);
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  transition: 0.5s;
  cursor: pointer;
}

.my-page-label {
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}

.image-logo {
  text-align: left;
}

.image-logo img {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: auto;
}

.theme {
  color: var(--letter);
}

.image-logo {
  text-align: left;
}

.image-logo img {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: auto;
}

@media (max-width: 992px) {
  button {
    font-size: 1rem;
  }
}
@media (max-width: 576px) {
  .my-page-label {
    margin: 20px 0;
  }

  .btn-group {
    width: 100%;
  }
}
</style>
