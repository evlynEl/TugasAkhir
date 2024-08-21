@extends('layouts.AppInventory')
@section('content')
    {{-- <script type="text/javascript" src="{{ asset('js/Master/MaintenanceType.js') }}"></script> --}}
    <script>
        $(document).ready(function() {
            $("#tabel_Purchasing").DataTable({
                order: [
                    [0, "asc"]
                ],
                scrollX: true,
            });
        });
    </script>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">

                <div class="card" style="width:1200px;">
                    <div class="card-header" style="">Kartu Stok</div>

                    <div class="card-body" style="">
                        <div class="" style="">

                            {{-- <div class="row" style="">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <input type="radio" id="opsiKerja1" name="opsiKerja" value="Harian" checked
                                                style="vertical-align: middle;">&nbsp;Harian
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input type="radio" id="opsiKerja2" name="opsiKerja" value="Staff"
                                                style="vertical-align: middle;">&nbsp;Staff
                                        </div>
                                    </div> --}}
                            <div class="row" style="margin-left:-200px;">
                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text">Divisi:</span>
                                </div>
                                <div class="form-group col-md-9 mt-3 mt-md-0">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 100px;">
                                    <input class="form-control" type="text" id="Nama_Div" readonly
                                        style="resize: none; height: 40px; max-width: 450px;">
                                    <button type="button" class="btn" style="margin-left: 10px;" data-toggle="modal"
                                        data-target="#modalKawin">...</button>



                                </div>
                            </div>
                            <div class="row" style="margin-left:-200px;">
                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text"> Objek:</span>
                                </div>
                                <div class="form-group col-md-9 mt-3 mt-md-0">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 100px;">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 450px;">
                                    <button type="button" class="btn" style="margin-left: 10px;" data-toggle="modal"
                                        data-target="#modalKawin">...</button>



                                </div>

                            </div>
                            <div class="row" style="margin-left:-200px;">
                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text"> Kel.Utama:</span>
                                </div>
                                <div class="form-group col-md-9 mt-3 mt-md-0">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 100px;">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 450px;">
                                    <button type="button" class="btn" style="margin-left: 10px;" data-toggle="modal"
                                        data-target="#modalKawin">...</button>



                                </div>

                            </div>
                            <div class="row" style="margin-left:-200px;">
                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text"> Kelompok:</span>
                                </div>
                                <div class="form-group col-md-9 mt-3 mt-md-0">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 100px;">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 450px;">
                                    <button type="button" class="btn" style="margin-left: 10px;" data-toggle="modal"
                                        data-target="#modalKawin">...</button>



                                </div>

                            </div>
                            <div class="row" style="margin-left:-200px;">
                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text"> Sub. Kel:</span>
                                </div>
                                <div class="form-group col-md-9 mt-3 mt-md-0">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 100px;">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 450px;">
                                    <button type="button" class="btn" style="margin-left: 10px;" data-toggle="modal"
                                        data-target="#modalKawin">...</button>



                                </div>

                            </div>
                            <div class="row" style="margin-left:-200px;">
                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text"> &nbsp;:</span>
                                </div>
                                <div class="form-group col-md-9 mt-3 mt-md-0">
                                    <input type="radio" id="opsi1" name="opsi">
                                    <span class="aligned-text" style="margin-left:10px;"> Tampil&nbsp;Stok</span>
                                    <button type="button" class="btn" style="margin-left: 10px;width:100px;" data-toggle="modal"
                                        data-target="#modalKawin">OK</button>



                                </div>

                            </div>






                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered" id="tabel_Purchasing">
                                <thead>
                                    <tr>
                                        <th scope="col">Nama Objek</th>
                                        <th scope="col">Nama Kelompok Utama</th>
                                        <th scope="col">Nama Kelompok</th>
                                        <th scope="col">Nama Subkelompok</th>
                                        <th scope="col">Kode Barang</th>
                                        <th scope="col">Nama Barang</th>
                                        <th scope="col">Saldo Primer</th>
                                        <th scope="col">Sat_Primer</th>
                                        <th scope="col">Saldo Sekunder</th>
                                        <th scope="col">Sat_Sekunder</th>
                                        <th scope="col">Saldo Tritier</th>
                                        <th scope="col">Sat_Tritier</th>
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
