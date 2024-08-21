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
                    <div class="card-header" style="">Transaksi Perhari</div>

                    <div class="card-body" style="">
                        <div class="" style="">
                            <div class="row" style="margin-left:-185px;">
                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text">Divisi:</span>
                                </div>
                                <div class="form-group col-md-9 mt-3 mt-md-0">
                                    <input class="form-control" type="text" id="Nama_Peg" readonly
                                        style="resize: none; height: 40px; max-width: 100px;">
                                    <input class="form-control" type="text" id="Nama_Div" readonly
                                        style="resize: none; height: 40px; max-width: 242px;">
                                        <button type="button" class="btn" style="margin-left: 10px;"
                                        id="karyawanButton" data-toggle="modal"
                                        data-target="#modalKaryawan">...</button>
                                    <div class="modal fade" id="modalKaryawan" role="dialog"
                                        arialabelledby="modalLabel" area-hidden="true" style="">
                                        <div class="modal-dialog " role="document">
                                            <div class="modal-content" style="">
                                                <div class="modal-header" style="justify-content: center;">

                                                    <div class="row" style=";">
                                                        <div class="table-responsive" style="margin:30px;">
                                                            <table id="tabel_Karyawan"
                                                                class="table table-bordered">
                                                                <thead class="thead-dark">
                                                                    <tr>
                                                                        <th scope="col">Id Pegawai</th>
                                                                        <th scope="col">Nama Pegawai</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>


                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <div class="" style="">

                                <div class="card-body-container" style="display: flex; flex-wrap: wrap; margin: 10px;">
                                    <div class="card-body" style="flex: 0 0 50%; max-width: 50%;">
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

                                        <div class="row" style="">
                                            <div class="form-group col-md-3 d-flex justify-content-end">
                                                <span class="aligned-text"> Objek:</span>
                                            </div>
                                            <div class="form-group col-md-9 mt-3 mt-md-0">
                                                <input class="form-control" type="text" id="Nama_Peg" readonly
                                                    style="resize: none; height: 40px; max-width: 100px;">
                                                <input class="form-control" type="text" id="Nama_Peg" readonly
                                                    style="resize: none; height: 40px; max-width: 450px;">
                                                <button type="button" class="btn" style="margin-left: 10px;"
                                                    id="karyawanButton" data-toggle="modal"
                                                    data-target="#modalKaryawan">...</button>
                                                <div class="modal fade" id="modalKaryawan" role="dialog"
                                                    arialabelledby="modalLabel" area-hidden="true" style="">
                                                    <div class="modal-dialog " role="document">
                                                        <div class="modal-content" style="">
                                                            <div class="modal-header" style="justify-content: center;">

                                                                <div class="row" style=";">
                                                                    <div class="table-responsive" style="margin:30px;">
                                                                        <table id="tabel_Karyawan"
                                                                            class="table table-bordered">
                                                                            <thead class="thead-dark">
                                                                                <tr>
                                                                                    <th scope="col">Id Pegawai</th>
                                                                                    <th scope="col">Nama Pegawai</th>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>


                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>

                                        </div>
                                        <div class="row" style="">
                                            <div class="form-group col-md-3 d-flex justify-content-end">
                                                <span class="aligned-text"> Kel. Utama:</span>
                                            </div>
                                            <div class="form-group col-md-9 mt-3 mt-md-0">
                                                <input class="form-control" type="text" id="Nama_Peg" readonly
                                                    style="resize: none; height: 40px; max-width: 100px;">
                                                <input class="form-control" type="text" id="Nama_Peg" readonly
                                                    style="resize: none; height: 40px; max-width: 450px;">
                                                <button type="button" class="btn" style="margin-left: 10px;"
                                                    id="karyawanButton" data-toggle="modal"
                                                    data-target="#modalKaryawan">...</button>
                                                <div class="modal fade" id="modalKaryawan" role="dialog"
                                                    arialabelledby="modalLabel" area-hidden="true" style="">
                                                    <div class="modal-dialog " role="document">
                                                        <div class="modal-content" style="">
                                                            <div class="modal-header" style="justify-content: center;">

                                                                <div class="row" style=";">
                                                                    <div class="table-responsive" style="margin:30px;">
                                                                        <table id="tabel_Karyawan"
                                                                            class="table table-bordered">
                                                                            <thead class="thead-dark">
                                                                                <tr>
                                                                                    <th scope="col">Id Pegawai</th>
                                                                                    <th scope="col">Nama Pegawai</th>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>


                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>

                                        </div>

                                        <div class="row" style="">
                                            <div class="form-group col-md-3 d-flex justify-content-end">
                                                <span class="aligned-text">Tanggal:</span>
                                            </div>
                                            <div class="form-group col-md-9 mt-3 mt-md-0">

                                                <input class="form-control" type="date" id="TglAwal" name="TglAwal"
                                                    style="max-width:140px;"
                                                    value="{{ old('TglAwal', now()->format('Y-m-d')) }}" required>
                                                    <button type="button" class="btn" style="margin-left: 20px;width:100px;"
                                                    id="karyawanButton" data-toggle="modal"
                                                    data-target="#modalKaryawan">OK</button>


                                            </div>
                                        </div>


                                    </div>

                                    <div class="card-body" style="flex: 0 0 50%; max-width: 50%;">
                                        <div class="row" style="">
                                            <div class="form-group col-md-3 d-flex justify-content-end">
                                                <span class="aligned-text"> Kelompok:</span>
                                            </div>
                                            <div class="form-group col-md-9 mt-3 mt-md-0">
                                                <input class="form-control" type="text" id="Nama_Peg" readonly
                                                    style="resize: none; height: 40px; max-width: 100px;">
                                                <input class="form-control" type="text" id="Nama_Peg" readonly
                                                    style="resize: none; height: 40px; max-width: 450px;">
                                                <button type="button" class="btn" style="margin-left: 10px;"
                                                    id="karyawanButton" data-toggle="modal"
                                                    data-target="#modalKaryawan">...</button>
                                                <div class="modal fade" id="modalKaryawan" role="dialog"
                                                    arialabelledby="modalLabel" area-hidden="true" style="">
                                                    <div class="modal-dialog " role="document">
                                                        <div class="modal-content" style="">
                                                            <div class="modal-header" style="justify-content: center;">

                                                                <div class="row" style=";">
                                                                    <div class="table-responsive" style="margin:30px;">
                                                                        <table id="tabel_Karyawan"
                                                                            class="table table-bordered">
                                                                            <thead class="thead-dark">
                                                                                <tr>
                                                                                    <th scope="col">Id Pegawai</th>
                                                                                    <th scope="col">Nama Pegawai</th>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>


                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>

                                        </div>
                                        <div class="row" style="">
                                            <div class="form-group col-md-3 d-flex justify-content-end">
                                                <span class="aligned-text"> Sub. Kel:</span>
                                            </div>
                                            <div class="form-group col-md-9 mt-3 mt-md-0">
                                                <input class="form-control" type="text" id="Nama_Peg" readonly
                                                    style="resize: none; height: 40px; max-width: 100px;">
                                                <input class="form-control" type="text" id="Nama_Peg" readonly
                                                    style="resize: none; height: 40px; max-width: 450px;">
                                                <button type="button" class="btn" style="margin-left: 10px;"
                                                    id="karyawanButton" data-toggle="modal"
                                                    data-target="#modalKaryawan">...</button>
                                                <div class="modal fade" id="modalKaryawan" role="dialog"
                                                    arialabelledby="modalLabel" area-hidden="true" style="">
                                                    <div class="modal-dialog " role="document">
                                                        <div class="modal-content" style="">
                                                            <div class="modal-header" style="justify-content: center;">

                                                                <div class="row" style=";">
                                                                    <div class="table-responsive" style="margin:30px;">
                                                                        <table id="tabel_Karyawan"
                                                                            class="table table-bordered">
                                                                            <thead class="thead-dark">
                                                                                <tr>
                                                                                    <th scope="col">Id Pegawai</th>
                                                                                    <th scope="col">Nama Pegawai</th>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>


                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>

                                        </div>



                                    </div>
                                    <div id="form-container"></div>
                                    <div class="col-6" style="text-align: left;">

                                    </div>




                                </div>

                            </div>
                            <div class="row" style="margin-left:-182px;">

                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text">Saldo&nbsp;Akhir:</span>

                                </div>

                                <div class="form-group col-md-3 d-flex " style="margin-left: ;">

                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width:130px;"placeholder="0">
                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 50px;">
                                        <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 130px; margin-left:18px"placeholder="0">
                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 50px; ">
                                        <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 130px;margin-left:18px;"placeholder="0">
                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 50px;">
                                </div>
                                <div class="form-group col-md-3 d-flex " style="margin-left: ;">

                                </div>
                                <div class="form-group col-md-3 d-flex " style="margin-left: ;">

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
                        <div style="text-align: right; margin: 10px;">


                            <button type="button" class="btn " style="width: 95px" id="buttonProses">Print</button>

                            <button type="button" class="btn " style="width: 95px" id="buttonProses">Keluar</button>
                        </div>










                    </div>











                </div>







            </div>






        </div>






    </div>
@endsection
