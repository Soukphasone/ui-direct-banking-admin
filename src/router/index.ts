import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import BasicChartView from '@/views/Charts/BasicChartView.vue'
import Home from '@/views/Dashboard/Home.vue'
import FormElementsView from '@/views/Forms/FormElementsView.vue'
import FormLayoutView from '@/views/Forms/FormLayoutView.vue'
import SettingsView from '@/views/Pages/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TablesView from '@/views/TablesView.vue'
import AlertsView from '@/views/UiElements/AlertsView.vue'
import ButtonsView from '@/views/UiElements/ButtonsView.vue'
import RegisterView from '@/views/Customers/Register.vue'
import CustomersView from '@/views/Customers/Customers.vue'
import Login from '@/views/Login/Login.vue'
import ResetPasswordCustomerView from '@/views/Customers/ResetPassword.vue'
// import ChangePasswordView from '@/views/ChangePassword/ChangePassword.vue'
// import ChangePassFirstLoginView from '@/views/ChangePassword/ChangePassFirstLogin.vue'
import PreviewViewView from '@/views/Previews/PreviewView.vue'
import ReportCustomersView from '@/views/Report/ReportCustomers.vue'
import { PATH } from './pathName'
const routes = [
  {
    path: PATH.HOME,
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  },
  {
    path: PATH.LOGIN,
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  // {
  //   path: PATH.CHANGE_PASSWORD_FIRST,
  //   name: 'changePasswordFirst',
  //   component: ChangePassFirstLoginView,
  //   meta: {
  //     title: 'changePassword',
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: PATH.CHANGE_PASSWORD,
  //   name: 'changePassword',
  //   component: ChangePasswordView,
  //   meta: {
  //     title: 'changePassword',
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/preview',
    name: 'preview',
    component: PreviewViewView,
    meta: {
      title: 'Preview',
      requiresAuth: true
    }
  },
  // Start Customer //
  {
    path: '/customer/register',
    name: 'customerRegister',
    component: RegisterView,
    meta: {
      title: 'Customer Register'
    }
  },
  {
    path: '/customers',
    name: 'Customer Account',
    component: CustomersView,
    meta: {
      title: 'Customer List'
    }
  },
  {
    path: '/customer/resetpassword',
    name: 'resetPasswordCus',
    component: ResetPasswordCustomerView,
    meta: {
      title: 'Resetpassword Cus'
    }
  },
  {
    path: '/report',
    name: 'Report Customer List',
    component: ReportCustomersView,
    meta: {
      title: 'Report'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/forms/form-elements',
    name: 'formElements',
    component: FormElementsView,
    meta: {
      title: 'Form Elements'
    }
  },
  {
    path: '/forms/form-layout',
    name: 'formLayout',
    component: FormLayoutView,
    meta: {
      title: 'Form Layout'
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TablesView,
    meta: {
      title: 'Tables'
    }
  },
  {
    path: '/pages/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Settings'
    }
  },
  {
    path: '/charts/basic-chart',
    name: 'basicChart',
    component: BasicChartView,
    meta: {
      title: 'Basic Chart'
    }
  },
  {
    path: '/ui-elements/alerts',
    name: 'alerts',
    component: AlertsView,
    meta: {
      title: 'Alerts'
    }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: {
      title: 'Buttons'
    }
  },
  {
    path: '/auth/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | LAO-VIET BANK`
  const isAuthenticated = !!localStorage.getItem('authToken')
  if (to.meta.requiresAuth && !isAuthenticated) {
    // next('/login')
    next()
  } else {
    next()
  }
})

export default router
