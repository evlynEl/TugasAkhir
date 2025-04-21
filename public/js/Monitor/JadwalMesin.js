var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
var dropdownButton = document.getElementById("dropdownButton");
var dropdownItems = document.querySelectorAll(".dropdown-item");
const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileUpload");
const fileNameDisplay = document.getElementById("fileName");


// Tambahkan event listener untuk setiap item dropdown
dropdownItems.forEach(item => {
    item.addEventListener('click', function(event) {
        // Cek ID dari item yang diklik dan ubah teks tombol sesuai
        const selectedItem = this;

        if (selectedItem.id === 'Produksi') {
            dropdownButton.textContent = 'Produksi';
        } else if (selectedItem.id === 'Efisiensi') {
            dropdownButton.textContent = 'Efisiensi';
        } else if (selectedItem.id === 'Order') {
            dropdownButton.textContent = 'Order';
        }

        // Menutup dropdown setelah memilih
        const dropdownMenu = selectedItem.closest('.dropdown-menu');
        const dropdown = dropdownMenu.parentElement;
        const bsDropdown = new bootstrap.Dropdown(dropdown);
        bsDropdown.hide();
    });
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("border-dark");
    if (event.dataTransfer.files.length > 0) {
        fileInput.files = event.dataTransfer.files;
        fileNameDisplay.textContent = event.dataTransfer.files[0].name;
    }
});

fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    }
});
