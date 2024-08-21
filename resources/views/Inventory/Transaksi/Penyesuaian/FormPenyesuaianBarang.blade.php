@extends('layouts.AppInventory')
@section('content')
    {{-- <script type="text/javascript" src="{{ asset('js/Master/MaintenanceType.js') }}"></script> --}}
    <script>
        $(document).ready(function() {
            $("#tabel_Purchasing").DataTable({
                order: [
                    [0, "asc"]
                ],
            });
        });
    </script>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">

                <div class="card" style="width:1200px;">
                    <div class="card-header" style="">Permohonan Penyesuaian Barang</div>

                    <div class="card-body" style="">
                        <div class="BORDERB" style="">
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
                                            <input class="form-control" type="text" id="Nama_Div" readonly
                                                style="resize: none; height: 40px; max-width: 450px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                            style="resize: none; height: 40px; max-width: 250px;">
                                            <option value=""></option>
                                            @foreach ($divisi as $data)
                                                <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                            @endforeach
                                        </select> --}}
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="divisiButton" data-toggle="modal"
                                                data-target="#modalDivPeg">...</button>

                                            <div class="modal fade" id="modalDivPeg" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
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
                                    <div class="row" style="">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text"> Objek:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
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
                                                                    <table id="tabel_Karyawan" class="table table-bordered">
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
                                            <span class="aligned-text"> Kelompok&nbsp;Utama:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
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

                                <div class="card-body" style="flex: 0 0 50%; max-width: 50%;">
                                    <div class="row" style="">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Tanggal:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">

                                            <input class="form-control" type="date" id="TglAwal" name="TglAwal"
                                                style="max-width:140px;"
                                                value="{{ old('TglAwal', now()->format('Y-m-d')) }}" required>
                                            <span class="aligned-text" style="margin-left:10px;">Pemohon:</span>
                                            <div style="display: flex; align-items: center;">
                                                <input class="form-control" type="text" id="Kd_PISAT" readonly
                                                    style="resize: none; height: 40px; max-width: 140px;">


                                            </div>


                                        </div>
                                    </div>
                                    <div class="row" style="">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Kelompok:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="PISAT" readonly
                                                style="resize: none; height: 40px; max-width: 450px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                            style="resize: none; height: 40px; max-width: 250px;">
                                            <option value=""></option>
                                            @foreach ($divisi as $data)
                                                <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                            @endforeach
                                        </select> --}}
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="modalPisatButton" data-toggle="modal"
                                                data-target="#modalPisat">...</button>

                                            <div class="modal fade" id="modalPisat" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
                                                <div class="modal-dialog " role="document">
                                                    <div class="modal-content" style="">
                                                        <div class="modal-header" style="justify-content: center;">

                                                            <div class="row" style=";">
                                                                <div class="table-responsive" style="margin:30px;">
                                                                    <table id="tabel_PISAT" class="table table-bordered">
                                                                        <thead class="thead-dark">
                                                                            <tr>
                                                                                <th scope="col">Kode PISAT</th>
                                                                                <th scope="col">PISAT</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {{-- @foreach ($dataPISAT as $data)
                                                                                <tr>

                                                                                    <td>{{ $data->KdPisat }}</td>
                                                                                    <td>{{ $data->Pisat }}</td>



                                                                                </tr>
                                                                            @endforeach --}}
                                                                            {{-- @foreach ($peringatan as $item)
                                                                            <tr>
                                                                                <td><input type="checkbox" style="margin-right:5px;"
                                                                                        data-id="{{ $item->kd_pegawai }}_{{ $item->peringatan_ke }}_{{ $item->bulan }}_{{ $item->tahun }}">{{ $item->peringatan_ke }}
                                                                                        data-id="{{ $item->kd_pegawai }}_{{ $item->peringatan_ke }}_{{ $item->TglBerlaku }}">{{ $item->peringatan_ke }}
                                                                                </td>
                                                                                <td>{{ $item->Nama_Div }}</td>
                                                                                <td>{{ $item->kd_pegawai }}</td>
                                                                                <td>{{ $item->Nama_Peg }}</td>
                                                                                <td>{{ $item->TglBerlaku ?? 'Null' }}</td>
                                                                                <td>{{ $item->TglAkhir ?? 'Null' }}</td>
                                                                                <td>{{ $item->uraian }}</td>
                                                                                <td>{{ $item->bulan }}</td>
                                                                                <td>{{ $item->tahun }}</td>
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

                                        </div>
                                    </div>
                                    <div class="row" style="">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text"> Sub&nbsp;Kelompok:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Kawin" readonly
                                                style="resize: none; height: 40px; max-width: 450px;">
                                            <button type="button" class="btn" style="margin-left: 10px;"
                                                data-toggle="modal" data-target="#modalKawin">...</button>
                                            <div class="modal fade" id="modalKawin" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
                                                <div class="modal-dialog " role="document">
                                                    <div class="modal-content" style="">
                                                        <div class="modal-header" style="justify-content: center;">

                                                            <div class="row" style=";">
                                                                <div class="table-responsive" style="margin:30px;">
                                                                    <table id="tabel_Kawin" class="table table-bordered">
                                                                        <thead class="thead-dark">
                                                                            <tr>
                                                                                <th scope="col">Kd Status</th>
                                                                                <th scope="col">Status</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {{-- @foreach ($dataKawin as $data)
                                                                                <tr>

                                                                                    <td>{{ $data->KdStatus }}</td>
                                                                                    <td>{{ $data->Status }}</td>



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



                                        </div>

                                    </div>


                                </div>
                                <div id="form-container"></div>
                                <div class="col-6" style="text-align: left;">

                                </div>




                            </div>

                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered" id="tabel_Purchasing">
                                <thead>
                                    <tr>
                                        <th scope="col">Kd Transaksi</th>
                                        <th scope="col">Nama Barang</th>
                                        <th scope="col">Alasan Mutasi</th>
                                        <th scope="col">Pemohon</th>
                                        <th scope="col">Tgl Mohon</th>
                                        <th scope="col">Divisi</th>
                                        <th scope="col">Objek</th>
                                        <th scope="col">Kel.Utama</th>
                                        <th scope="col">Kelompok</th>
                                        <th scope="col">Sub. Kel</th>
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
                        <div class="card-body" style="margin-left:;border:1px solid black;">
                            <div class="row" style="margin-left:-180px;">
                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text"> Kode&nbsp;Transaksi:</span>
                                </div>
                                <div class="form-group col-md-9 mt-3 mt-md-0">
                                    <input class="form-control" type="text" id="Kawin" readonly
                                        style="resize: none; height: 40px; max-width: 180px;">




                                </div>

                            </div>

                            <div class="row" style="margin-left:-180px;">

                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text">Stok&nbsp;Disesuaikan:</span>
                                </div>
                                <div class="form-group col-md-3 d-flex " style="margin-left: ;">
                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 130px;" placeholder="0">
                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 50px;">
                                </div>
                                <div class="form-group col-md-3 d-flex " style="margin-left: ;">
                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width:130px;"placeholder="0">
                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 50px;">
                                </div>
                                <div class="form-group col-md-3 d-flex " style="margin-left: ;">
                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 130px;"placeholder="0">
                                    <input class="form-control" type="text" id="Nama_Posisi" disabled
                                        style="resize: none; height: 40px; width: 50px;">
                                </div>

                            </div>
                            <div class="row" style="margin-left:-180px;">
                                <div class="form-group col-md-3 d-flex justify-content-end">
                                    <span class="aligned-text"> Alasan&nbsp;Penyesuaian:</span>
                                </div>
                                <div class="form-group col-md-9 mt-3 mt-md-0">
                                    <input class="form-control" type="text" id="Kawin" readonly
                                        style="resize: none; height: 40px; max-width: 854px;">




                                </div>

                            </div>


                        </div>



                        <div style="text-align: left; margin: 10px;">


                            <button type="button" class="btn " style="width: 95px" id="buttonProses">Isi</button>
                            <button type="button" class="btn " style="width: 95px" id="buttonBatal"
                                disabled>Koreksi</button>
                            <button type="button" class="btn " style="width: 95px" id="buttonBatal"
                                disabled>Hapus</button>
                        </div>








                    </div>











                </div>







            </div>






        </div>






    </div>
@endsection
