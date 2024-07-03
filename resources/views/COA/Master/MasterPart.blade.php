@extends('layouts.appCOA')

@section('content')
<div class="container-fluid">
    <link href="{{ asset('css/Contoh/contoh.css') }}" rel="stylesheet">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
            <div class="alert alert-success">
                {{ Session::get('success') }}
            </div>
            @elseif (Session::has('error'))
            <div class="alert alert-danger">
                {{ Session::get('error') }}
            </div>
            @endif
            <div class="card">
                <div class="card-header">Master Part Section</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="acs-div-container">
                        <div class="acs-div-container1">
                            {{-- <img src="{{ asset('/images/Contoh1.png') }}" alt=""> --}}
                        </div>
                    </div>
                    <form method="POST" action="{{ url('FrmMasterPart/submit') }}">
                        @csrf
                        <div class="form-group">
                            <label for="id">ID</label>
                            <input type="text" class="form-control" id="id" name="id" readonly>
                        </div>
                        <div class="form-group">
                            <label for="part">Part Section</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="part" name="part" required>
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-info" id="btn_show">...</button>
                                </div>
                            </div>
                        </div>
                        <button type="button" id="btn_proses" class="btn btn-outline-success">Proses</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var showModalBtn = document.getElementById('btn_show'); 

        showModalBtn.addEventListener('click', function () {
            fetch('{{ route('masterpart.display') }}')
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        title: 'Master Part Section',
                        html: buildTable(data),
                        showCloseButton: true,
                        showConfirmButton: false,
                        width: '50%',
                        allowOutsideClick: false,
                        didOpen: () => {
                            const tableBody = document.querySelector('.swal2-html-container tbody');

                            tableBody.addEventListener('click', function (event) {
                                const row = event.target.closest('tr');
                                if (row) {
                                    const id = row.getAttribute('data-id');
                                    const part = row.getAttribute('data-part');

                                    document.getElementById('id').value = id;
                                    document.getElementById('part').value = part;
                                    Swal.close();
                                }
                            });
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching parts:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to fetch parts!',
                    });
                });
        });

        function buildTable(data) {
            var table = '<table class="table table-bordered"><thead><tr><th>ID</th><th>Part Section</th></tr></thead><tbody>';

            data.forEach(function (item) {
                table += '<tr data-id="' + item.Id + '" data-part="' + item.PartSection + '">';
                table += '<td>' + item.Id + '</td>';
                table += '<td>' + item.PartSection + '</td>';
                table += '</tr>';
            });

            table += '</tbody></table>';
            return table;
        }
    });
</script>
@endsection
