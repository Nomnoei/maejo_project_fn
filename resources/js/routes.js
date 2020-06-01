// import Vue from 'vue'
// import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Login from './components/auth/login.vue';
// officer-----------------------------------------------------------------
import AddMember from './components/officer/addMember.vue';
import EditMember from './components/officer/updateMember.vue';
import CreateMember from './components/officer/createMember.vue';
import Transfer from './components/officer/Transfer.vue';
import TransferHistory from './components/officer/transfer_page_history.vue';
import PaymentPrintBill from './components/officer/payment_print_bill.vue';
import PaymentConfirm from './components/officer/payment_confirm.vue';
import EditProfileOfficer from './components/officer/EditProfileOfficer.vue';


// member----------------------------------------------------------------
import HistoryPayment from './components/member/HistoryPayment.vue';
import Payment from './components/member/Payment.vue';
import EditProfile from './components/member/EditProfile.vue';
import EditPassword from './components/member/EditPassword.vue';
import ChangeTypePayment from './components/member/change_type_payment.vue';
import TransferAgain from './components/member/TransferAgain.vue';


// Admin -----------------------------------------------------------------

import Officer from './components/admin/addOfficer.vue';
import CreateOfficer from './components/admin/createOfficer.vue';
import RateBin from './components/admin/rate_bin.vue';
import UpdateOfficer from './components/admin/updateOfficer.vue';
import PaymentHistoryAdmin from './components/admin/payment_history.vue';
import Test from './components/admin/test.vue';





export const routes = [
  {
        path:'/',
        component: Home
  },{
        path:'/login',
        component: Login
  },{
        path:'/Member',
        component: AddMember
  },
  {
        path:'/Transfer',
        component: Transfer
  },{
        path:'/TransferHistory',
        component: TransferHistory
  },{
        path:'/CreateMember',
        component: CreateMember
  },{
        path:'/PaymentPrintBill',
        component: PaymentPrintBill
  },{
        path:'/PaymentConfirm',
        component: PaymentConfirm
  },{
        path:'/HistoryPayment',
        component: HistoryPayment
  },{
        path:'/Payment',
        component: Payment
  },{
        path:'/EditProfile',
        component: EditProfile
  },{
        path:'/EditPassword',
        component: EditPassword
  },{
        path:'/ChangeTypePayment',
        component: ChangeTypePayment
  },{
        path:'/EditMember',
        component: EditMember
  },{
        path:'/EditMember',
        component: EditMember
  },{
        path:'/Officer',
        component: Officer
  },{
        path:'/CreateOfficer',
        component: CreateOfficer
  },{
        path:'/RateBin',
        component: RateBin
  },{
        path:'/UpdateOfficer',
        component: UpdateOfficer
  }
  ,{
        path:'/PaymentHistoryAdmin',
        component: PaymentHistoryAdmin
  },{
        path:'/EditProfileOfficer',
        component: EditProfileOfficer
  },
  {
        path:'/TransferAgain',
        component: TransferAgain,
        props: true
  },
  {
        path:'/Test',
        component: Test,
        props: true
  }





];
