// Today's date
document.addEventListener('DOMContentLoaded', function() {
    var dateNow = document.getElementById('tanggal');
    var today = new Date().toISOString().slice(0, 10);
    dateNow.value = today;
});
