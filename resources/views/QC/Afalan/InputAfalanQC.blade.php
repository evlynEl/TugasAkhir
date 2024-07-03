@extends('layouts.appQC')
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
                    <div class="card-header">INPUT AFALAN</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="acs-div-container1">
                                <form>
                                    <div class="form-group">
                                        <label for="no-roll">No Roll</label>
                                        <div class="input-group">
                                            <input type="number" id="no-roll" name="no-roll" class="form-control" required>
                                            <div class="input-group-append">
                                                <button type="button" class="btn btn-primary" onclick="openNoRollModal()">Pilih</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="item-number">Item Number</label>
                                        <input type="number" id="item-number" name="item-number" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="kode-barang">Kode Barang</label>
                                        <input type="text" id="kode-barang" name="kode-barang" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="nama-type">Nama Type</label>
                                        <input type="text" id="nama-type" name="nama-type" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="meter-bruto">Meter Bruto</label>
                                        <input type="number" id="meter-bruto" name="meter-bruto" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="meter-netto">Meter Netto</label>
                                        <input type="number" id="meter-netto" name="meter-netto" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="kg">KG</label>
                                        <input type="number" id="kg" name="kg" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="afalan">Afalan (Angka)</label>
                                        <input type="number" id="afalan" name="afalan" class="form-control" required
                                            placeholder="0" min="0">
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function openNoRollModal() {
            Swal.fire({
                title: 'Pilih No Roll',
                html: `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">No Roll</th>
                                <th scope="col">Nama Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr onclick="selectNoRoll('001', 'Type A')">
                                <td>001</td>
                                <td>Type A</td>
                            </tr>
                            <tr onclick="selectNoRoll('002', 'Type B')">
                                <td>002</td>
                                <td>Type B</td>
                            </tr>
                            <!-- Add more rows as necessary -->
                        </tbody>
                    </table>
                `,
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'Pilih',
                preConfirm: () => {
                    return false; 
                }
            });
        }
    
        function selectNoRoll(noRoll, namaType) {
            document.getElementById('no-roll').value = noRoll;
            Swal.close();
        }
    </script>
    
    <script type="text/javascript" src="{{ asset('js/Sales/permohonan-sp.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
