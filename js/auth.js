const Token = localStorage.getItem('Token');

if (!Token) {
  location.href = '/';
}
