@extends('layouts.AppInventory')
@section('content')
    {{-- <script type="text/javascript" src="{{ asset('js/Master/MaintenanceType.js') }}"></script> --}}
    <script>
        $(document).ready(function() {
            $("#tabel_Konversi").DataTable({
                order: [
                    [0, "asc"],
                ],
                searching: false,
                lengthChange: false,
                pageLength: 13,
            });
            $("#tabel_AsalKonversi").DataTable({
                order: [
                    [0, "asc"],
                ],
                searching: false,
                lengthChange: false,
                pageLength: 3,
                scrollX : true,
            });
            $("#tabel_TujuanKonversi").DataTable({
                order: [
                    [0, "asc"],
                ],
                searching: false,
                lengthChange: false,
                pageLength: 3,
                scrollX: true,
            });
            $("#tabel_Purchasing").DataTable({
                order: [
                    [0, "asc"],
                ],
            });
        });
    </script>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">

                <div class="card" style="width:1200px;">
                    <div class="card-header" style="">Permohonan Konversi Barang</div>

                    <div class="card-body" style="">
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
                                        <span class="aligned-text">Divisi:</span>
                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">

                                        <input class="form-control" type="text" id="Id_Div" readonly
                                            style="resize: none; height: 40px; max-width: 100px;">
                                        <input class="form-control" type="text" id="Nama_Div" readonly
                                            style="resize: none; height: 40px; max-width: 450px;">
                                        {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                        style="resize: none; height: 40px; max-width: 250px;">
                                        <option value=""></option>
                                        @foreach ($divisi as $data)
                                            <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                        @endforeach
                                    </select> --}}
                                        <button type="button" class="btn" style="margin-left: 10px; " id="divisiButton"
                                            data-toggle="modal" data-target="#modalDivPeg">...</button>

                                        <div class="modal fade" id="modalDivPeg" role="dialog" arialabelledby="modalLabel"
                                            area-hidden="true" style="">
                                            <div class="modal-dialog " role="document">
                                                <div class="modal-content" style="">
                                                    <div class="modal-header" style="justify-content: center;">

                                                        <div class="row" style=";">
                                                            <div class="table-responsive" style="margin:30px;">
                                                                <table id="tabel_Divisi" class="table table-bordered">
                                                                    <thead class="thead-dark">
                                                                        <tr>
                                                                            <th scope="col">Id Divisi</th>
                                                                            <th scope="col">Nama Divisi</th>

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

                            <div class="card-body" style="flex: 0 0 50%; max-width: 50%;">
                                <div class="row" style="">
                                    <div class="form-group col-md-3 d-flex justify-content-end">
                                        <span class="aligned-text" style="margin-left:10px;">Tanggal:</span>
                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">

                                        <div style="display: flex; align-items: center;">
                                            <input class="form-control" type="date" id="TglAwal" name="TglAwal"
                                                value="{{ old('TglAwal', now()->format('Y-m-d')) }}" required>


                                        </div>


                                    </div>
                                </div>


                            </div>





                        </div>
                        <div class="card-body-container" style="display: flex; flex-wrap: wrap; margin: 10px;">

                            <div class="card-body" style="flex: 0 0 30%; max-width: 30%; border: 1px solid black;margin-bottom:35px; ">
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
                                <div class="row" style="margin:5px;">
                                    <div class="form-group col-md-3 d-flex justify-content-end">
                                        <span class="aligned-text"> Kode Konversi:</span>
                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">
                                        <input class="form-control" type="text" id="Nama_Peg" readonly
                                            style="resize: none; height: 40px; max-width: 450px;">




                                    </div>

                                </div>
                                <div class="row" style="margin:5px;">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered" id="tabel_Konversi">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Kode Konversi</th>
                                                    <th scope="col">Tgl.Transaksi</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-group-divider">
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>

                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
                                                    <td> Tes </td>
                                                    <td> Tes </td>
                                                </tr>
                                                <tr>
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

                            <div class="card-body" style="flex: 0 0 70%; max-width: 70%;">
                                <div class="ASALKONVERSI" style="margin-top:-20px;">
                                    <div class="row" style="">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text"> Kode&nbsp;Trans.&nbsp;Asal:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 150px;">




                                        </div>
                                    </div>
                                    <div class="row" style="margin:5px;">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-bordered" id="tabel_AsalKonversi">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Kd.Konversi</th>
                                                        <th scope="col">Kd.Transaksi</th>
                                                        <th scope="col">Nm.Barang</th>
                                                        <th scope="col">Objek</th>
                                                        <th scope="col">Kel.Utama</th>
                                                        <th scope="col">Kelompok</th>
                                                        <th scope="col">SubKelompok</th>
                                                        <th scope="col">Pemohon</th>
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
                                    <div style="text-align: left; margin: 10px;">


                                        <button type="button" class="btn " style="width: 100px" id="buttonIsi">Isi</button>
                                        <button type="button" class="btn " style="width: 100px"
                                            id="buttonKoreksi">Koreksi</button>
                                        <button type="button" class="btn " style="width: 100px" id="buttonHapus">Hapus</button>
                                    </div>
                                </div>
                                <div class="TUJUANKONVERSI" style="margin-top:;">
                                    <div class="row" style="">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text"> Kode&nbsp;Trans.&nbsp;Tujuan:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Peg" readonly
                                                style="resize: none; height: 40px; max-width: 150px;">




                                        </div>
                                    </div>
                                    <div class="row" style="margin:5px;">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-bordered" id="tabel_TujuanKonversi">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Kd.Konversi</th>
                                                        <th scope="col">Kd.Transaksi</th>
                                                        <th scope="col">Nm.Barang</th>
                                                        <th scope="col">Objek</th>
                                                        <th scope="col">Kel.Utama</th>
                                                        <th scope="col">Kelompok</th>
                                                        <th scope="col">SubKelompok</th>
                                                        <th scope="col">Pemohon</th>
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
                                    <div style="text-align: left; margin: 10px;">


                                        <button type="button" class="btn " style="width: 100px" id="buttonIsi">Isi</button>
                                        <button type="button" class="btn " style="width: 100px"
                                            id="buttonKoreksi">Koreksi</button>
                                        <button type="button" class="btn " style="width: 100px" id="buttonHapus">Hapus</button>
                                    </div>
                                </div>


                            </div>

                            <div id="form-container"></div>
                            <div class="col-6" style="text-align: left;">

                            </div>




                        </div>











                    </div>











                </div>







            </div>






        </div>






    </div>
@endsection
