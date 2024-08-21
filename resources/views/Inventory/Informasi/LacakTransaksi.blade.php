@extends('layouts.AppInventory')
@section('content')
    {{-- <script type="text/javascript" src="{{ asset('js/Master/MaintenanceType.js') }}"></script> --}}
    <script>
        $(document).ready(function() {
            $("#tabel_Purchasing").DataTable({
                order: [
                    [0, "asc"]
                ],
                // scrollX: true,
            });
        });
    </script>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">

                <div class="card" style="width:1200px;">
                    <div class="card-header" style="">Informasi Lacak Transaksi</div>

                    <div class="card-body" style="">

                        <div class="card-body-container" style="display: flex; flex-wrap: wrap; margin: 10px;">
                            <div class="card-body" style="flex: 0 0 50%; max-width: 50%;">
                                <div class="LACAKTRANSAKSI" style="margin-top:-40px;margin-left:-40px;">
                                    <div class="row" style="margin-left:47px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <label for="staff" style="margin-top: 5px;margin-left:-150px;">Mutasi&nbsp;1&nbsp;(Satu)&nbsp;Divisi</label>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0" >



                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:-65px;margin-top:-20px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <input type="radio" id="opsi1" name="opsi">

                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0" >
                                            <label for="staff" style="margin-top: 5px;margin-left:;">Sebagai Pemberi Barang (Pemohon)</label>


                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:-65px;margin-top:-20px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <input type="radio" id="opsi1" name="opsi">

                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0" >
                                            <label for="staff" style="margin-top: 5px;margin-left:;">Sebagai Penerima Barang</label>


                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:280px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <label for="staff" style="margin-top: 5px;margin-left:;">Mutasi&nbsp;Antar&nbsp;Divisi&nbsp;AWAL&nbsp;PENERIMA&nbsp;BARANG</label>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0" >



                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:-65px;margin-top:-20px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <input type="radio" id="opsi1" name="opsi">

                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0" >
                                            <label for="staff" style="margin-top: 5px;margin-left:;">Sebagai Penerima Barang (Pemohon)</label>


                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:-65px;margin-top:-20px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <input type="radio" id="opsi1" name="opsi">

                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0" >
                                            <label for="staff" style="margin-top: 5px;margin-left:;">Sebagai Pemberi Barang</label>


                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:265px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <label for="staff" style="margin-top: 5px;margin-left:;">Mutasi&nbsp;Antar&nbsp;Divisi&nbsp;AWAL&nbsp;PEMBERI&nbsp;BARANG</label>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0" >



                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:-65px;margin-top:-20px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <input type="radio" id="opsi1" name="opsi">

                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0" >
                                            <label for="staff" style="margin-top: 5px;margin-left:;">Sebagai Pemberi Barang (Pemohon)</label>


                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:-65px;margin-top:-20px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <input type="radio" id="opsi1" name="opsi">

                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0" >
                                            <label for="staff" style="margin-top: 5px;margin-left:;">Sebagai Penerima Barang</label>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body" style="flex: 0 0 50%; max-width: 50%;">
                                <div class="BORDERB" style="margin:-40px;">
                                    <div class="row" style="margin-left:;margin-top:10px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Tanggal&nbsp;Mohon:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="date" id="TglAwal" name="TglAwal"
                                                    style="max-width:140px;"
                                                    value="{{ old('TglAwal', now()->format('Y-m-d')) }}" required>
                                            <span class="aligned-text" style="margin-left:10px;">User&nbsp;Id:</span>
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 150px;">


                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Divisi:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 100px;">
                                            <input class="form-control" type="text" id="Nama_Div" readonly
                                                style="resize: none; height: 40px; max-width: 450px;">
                                            <button type="button" class="btn" style="margin-left: 10px;"
                                                data-toggle="modal" data-target="#modalKawin">...</button>



                                        </div>
                                    </div>
                                    <div class="row" style="margin-left:;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text"> Objek:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 100px;">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 450px;">
                                            <button type="button" class="btn" style="margin-left: 10px;"
                                                data-toggle="modal" data-target="#modalKawin">...</button>



                                        </div>

                                    </div>
                                    <div class="row" style="margin-left:;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text"> Kel.Utama:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 100px;">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 450px;">
                                            <button type="button" class="btn" style="margin-left: 10px;"
                                                data-toggle="modal" data-target="#modalKawin">...</button>



                                        </div>

                                    </div>
                                    <div class="row" style="margin-left:;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text"> Kelompok:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 100px;">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 450px;">
                                            <button type="button" class="btn" style="margin-left: 10px;"
                                                data-toggle="modal" data-target="#modalKawin">...</button>



                                        </div>

                                    </div>
                                    <div class="row" style="margin-left:;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text"> Sub. Kel:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 100px;">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 450px;">
                                            <button type="button" class="btn" style="margin-left: 10px;"
                                                data-toggle="modal" data-target="#modalKawin">...</button>



                                        </div>

                                    </div>
                                    <div class="row" style="margin-left:-200px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text"> &nbsp;:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <button type="button" class="btn" style="margin-left: 240px;width:240px;"
                                                data-toggle="modal" data-target="#modalKawin">OK</button>



                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered" id="tabel_Purchasing">
                                <thead>
                                    <tr>
                                        <th scope="col">Kd Transaksi</th>
                                        <th scope="col">Nama Type</th>
                                        <th scope="col">Nama Kelompok</th>
                                        <th scope="col">Penerima</th>
                                        <th scope="col">Mng. Penerima</th>
                                        <th scope="col">Mng. Pemberi</th>
                                        <th scope="col">Pemberi</th>
                                        <th scope="col">Primer</th>
                                        <th scope="col">Sekunder</th>
                                        <th scope="col">Tritier</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    <tr>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                    </tr>
                                    <tr>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                    </tr>
                                    <tr>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                    </tr>
                                    <tr>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                    </tr>
                                    <tr>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                        <td> Tes </td>
                                    </tr>
                                    {{-- <td>
                                                <a href="" title="Edit Employee">
                                                    <button class="btn btn-primary btn-sm">
                                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                                    </button>
                                                </a>
                                                <form method="POST" action="" accept-charset="UTF-8" style="display:inline">
                                                    <button type="submit" class="btn btn-danger btn-sm" title="Delete Employee" onclick='return confirm("Confirm delete?")'>
                                                        <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
                                                    </button>
                                                </form>
                                            </td> --}}

                                    {{-- </tr> --}}
                                    {{-- @foreach ($employees as $data)
                                        <tr>
                                            <td>{{ $data->id }}</td>
                                            <td>{{ $data->name }}</td>
                                            <td>{{ $data->gender }}</td>
                                            <td>{{ $data->email }}</td>
                                            <td>{{ $data->address }}</td>
                                            <td>
                                                <a href="{{ route('employees.edit', $data->id) }}" title="Edit Employee">
                                                    <button class="btn btn-primary btn-sm">
                                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                                    </button>
                                                </a>
                                                <form method="POST" action="{{route('employees.destroy', $data->id)}}" accept-charset="UTF-8" style="display:inline">
                                                @csrf
                                                @method('delete')
                                                    <button type="submit" class="btn btn-danger btn-sm" title="Delete Employee" onclick='return confirm("Confirm delete?")'>
                                                        <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                        @endforeach --}}
                                </tbody>

                            </table>

                        </div>











                    </div>











                </div>







            </div>






        </div>






    </div>
@endsection
