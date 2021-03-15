// change this line
const APP_URL = 'http://localhost:5000';
axios
  .get(APP_URL)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

// fetch apis

const fetchAllExpense = () => {
  axios
    .get(`${APP_URL}/api/expense`)
    .then((res) => {
      const Expense = res.data.result;
      console.log('expense', res.data.result);
      let data = loopData(Expense);

      $('.expense-detail').html(data);
      // return data;

      console.log('data', data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchAllIncome = async () => {
  await axios
    .get(`${APP_URL}/api/income`)
    .then((res) => {
      const Income = res.data.result;
      // console.log('income', res.data.result);
      let data = loopData(Income, 'income');

      $('.income-detail').html(data);
      // return data;

      // console.log('data', data);
    })
    .catch((err) => {
      console.log(err);
    });
};
function loopData(data, type) {
  let res = '';
  data.forEach((el) => {
    let date = new Date(el.date);
    let formatted_date =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    if (type === 'income') {
      res += `
  <tr>
  <td>${el.id}</td>
  <td>${el.name}</td>
  <td>${el.category}</td>
  <td>${el.quantity}</td>
  <td class='date1'>${formatted_date}</td>
  <td>$ ${el.cost}</td>
  </tr>
  `;
    } else {
      res += `
  <tr>
  <td>${el.id}</td>
  <td>${el.name}</td>
  <td>${el.quantity}</td>
  <td>${el.cost}</td>
  <td>${el.category}</td>
  <td class='date1'>${formatted_date}</td>
  </tr>
  `;
    }
  });
  return res;
}
const addIncome = (data) => {
  axios
    .post(`${APP_URL}/api/income/add`, data)
    .then((res) => {
      Swal.fire({
        title: 'Success!',
        text: res.data.message,
        icon: 'success',
      }).then(() => {
        fetchAllIncome();
      });
    })
    .catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: err.data.message || 'Unable to add record',
        icon: 'error',
      });
      console.log(err);
    });
};

const addExpense = (data) => {
  axios
    .post(`${APP_URL}/api/expense/add`, data)
    .then((res) => {
      Swal.fire({
        title: 'Success!',
        text: res.data.message,
        icon: 'success',
      });
      fetchAllExpense();
    })
    .catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: res.data.message || 'Unable to add record',
        icon: 'error',
      });
      console.log(err);
    });
};

const signUp = (data) => {
  axios
    .post(`${APP_URL}/api/auth/signup`, data)
    .then((res) => {
      localStorage.setItem('Token', res.data.token);
      location.href = '/home.html';
    })
    .catch((err, res) => {
      $('.error-text').text('Error signing up check credentials and try again');
      document.querySelector('.error-text').classList.add('alert-danger');
      return;
    });
};

const login = (data) => {
  axios
    .post(`${APP_URL}/api/auth/login`, data)
    .then((res) => {
      localStorage.setItem('Token', res.data.token);
      location.href = '/home.html';
    })
    .catch((err) => {
      $('.error-text').text('Error loging up check credentials and try again');
      console.log(err);
      document.querySelector('.error-text').classList.add('alert-danger');
      return;
    });
};

$(document).ready(() => {
  fetchAllIncome();
  fetchAllExpense();

  $('.newIncome').click((e) => {
    e.preventDefault();
    let name = $('#name').val();
    let category = $('#category').val();
    let quantity = $('#quantity').val();
    let cost = $('#cost').val();
    let data = {
      name,
      category,
      quantity,
      cost,
    };
    addIncome(data);
    // console.log(data);
  });

  $('.signup-btn').click((e) => {
    e.preventDefault();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let cpassword = $('#cpassword').val();
    if (!firstname || !lastname || !email || !password || !cpassword) {
      $('.error-text').text('Fields cannot be empty');
      document.querySelector('.error-text').classList.add('alert-danger');
      return;
    } else {
      if (password !== cpassword) {
        $('.error-text').text('password mismatch');
        document.querySelector('.error-text').classList.add('alert-danger');
      } else {
        $('.error-text').text('');
        document.querySelector('.error-text').classList.remove('alert-danger');

        let data = {
          firstname,
          lastname,
          email,
          password,
        };
        signUp(data);
      }
    }
  });

  $('.login-btn').click((e) => {
    e.preventDefault();
    let email = $('#email1').val();
    let password = $('#password1').val();
    if (!email || !password) {
      $('.error-text').text('Fields cannot be empty');
      document.querySelector('.error-text').classList.add('alert-danger');
      return;
    } else {
      let data = {
        email,
        password,
      };
      login(data);
    }
  });
});
