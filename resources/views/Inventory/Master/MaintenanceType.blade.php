@extends('layouts.AppInventory')
@section('content')
    {{-- <script type="text/javascript" src="{{ asset('js/Master/MaintenanceType.js') }}"></script> --}}

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">

                <div class="card" style="width:1200px;">
                    <div class="card-header" style="">Maintenance Type Barang Per Divisi</div>

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
                                            <input class="form-control" type="text" id="Id_Peg" readonly
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
                                            <input class="form-control" type="text" id="Id_Peg" readonly
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

                                <div class="card-body" style="flex: 0 0 50%; max-width: 50%;">

                                    <div class="row" style="">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Kelompok:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Kd_PISAT" readonly
                                                style="resize: none; height: 40px; max-width: 100px;">
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
                                            <input class="form-control" type="text" id="Kd_Kawin" readonly
                                                style="resize: none; height: 40px; max-width: 100px;">
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
                        <div class="BORDERB" style="">
                            <div class="card-body-container" style="display: flex; flex-wrap: wrap; margin: 10px;">
                                <div class="card-body" style="flex: 0 0 100%; max-width: 100%;">
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
                                            <span class="aligned-text">Kat.&nbsp;Utama:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">

                                            <input class="form-control" type="text" id="Kd_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 100px;">
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 750px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                                style="resize: none; height: 40px; max-width: 250px;">
                                                <option value=""></option>
                                                @foreach ($divisi as $data)
                                                    <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                                @endforeach
                                            </select> --}}
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                            <div class="modal fade" id="modalPosisi" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
                                                <div class="modal-dialog " role="document">
                                                    <div class="modal-content" style="">
                                                        <div class="modal-header" style="justify-content: center;">
                                                            <div class="row" style=";">
                                                                <div class="table-responsive" style="margin:30px;">
                                                                    <table id="tabel_Posisi" class="table table-bordered">
                                                                        <thead class="thead-dark">
                                                                            <tr>
                                                                                <th scope="col">Kd Posisi</th>
                                                                                <th scope="col">Nama Posisi</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {{-- @foreach ($dataPosisi as $data)
                                                                                <tr>

                                                                                    <td>{{ $data->KD_Posisi }}</td>
                                                                                    <td>{{ $data->Nm_Posisi }}</td>



                                                                                </tr>
                                                                            @endforeach
             --}}
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
                                    <div class="row" style="margin-left:-200px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Kategori:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">

                                            <input class="form-control" type="text" id="Kd_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 100px;">
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 750px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                                style="resize: none; height: 40px; max-width: 250px;">
                                                <option value=""></option>
                                                @foreach ($divisi as $data)
                                                    <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                                @endforeach
                                            </select> --}}
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                            <div class="modal fade" id="modalPosisi" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
                                                <div class="modal-dialog " role="document">
                                                    <div class="modal-content" style="">
                                                        <div class="modal-header" style="justify-content: center;">
                                                            <div class="row" style=";">
                                                                <div class="table-responsive" style="margin:30px;">
                                                                    <table id="tabel_Posisi" class="table table-bordered">
                                                                        <thead class="thead-dark">
                                                                            <tr>
                                                                                <th scope="col">Kd Posisi</th>
                                                                                <th scope="col">Nama Posisi</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {{-- @foreach ($dataPosisi as $data)
                                                                                <tr>

                                                                                    <td>{{ $data->KD_Posisi }}</td>
                                                                                    <td>{{ $data->Nm_Posisi }}</td>



                                                                                </tr>
                                                                            @endforeach
             --}}
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
                                    <div class="row" style="margin-left:-200px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Sub&nbsp;Kategori:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">

                                            <input class="form-control" type="text" id="Kd_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 100px;">
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 750px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                                style="resize: none; height: 40px; max-width: 250px;">
                                                <option value=""></option>
                                                @foreach ($divisi as $data)
                                                    <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                                @endforeach
                                            </select> --}}
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                            <div class="modal fade" id="modalPosisi" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
                                                <div class="modal-dialog " role="document">
                                                    <div class="modal-content" style="">
                                                        <div class="modal-header" style="justify-content: center;">
                                                            <div class="row" style=";">
                                                                <div class="table-responsive" style="margin:30px;">
                                                                    <table id="tabel_Posisi" class="table table-bordered">
                                                                        <thead class="thead-dark">
                                                                            <tr>
                                                                                <th scope="col">Kd Posisi</th>
                                                                                <th scope="col">Nama Posisi</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {{-- @foreach ($dataPosisi as $data)
                                                                                <tr>

                                                                                    <td>{{ $data->KD_Posisi }}</td>
                                                                                    <td>{{ $data->Nm_Posisi }}</td>



                                                                                </tr>
                                                                            @endforeach
             --}}
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
                                    <div class="row" style="margin-left:-200px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Barang:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">

                                            <input class="form-control" type="text" id="Kd_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 100px;">
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 750px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                                style="resize: none; height: 40px; max-width: 250px;">
                                                <option value=""></option>
                                                @foreach ($divisi as $data)
                                                    <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                                @endforeach
                                            </select> --}}
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                            <div class="modal fade" id="modalPosisi" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
                                                <div class="modal-dialog " role="document">
                                                    <div class="modal-content" style="">
                                                        <div class="modal-header" style="justify-content: center;">
                                                            <div class="row" style=";">
                                                                <div class="table-responsive" style="margin:30px;">
                                                                    <table id="tabel_Posisi" class="table table-bordered">
                                                                        <thead class="thead-dark">
                                                                            <tr>
                                                                                <th scope="col">Kd Posisi</th>
                                                                                <th scope="col">Nama Posisi</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {{-- @foreach ($dataPosisi as $data)
                                                                                <tr>

                                                                                    <td>{{ $data->KD_Posisi }}</td>
                                                                                    <td>{{ $data->Nm_Posisi }}</td>



                                                                                </tr>
                                                                            @endforeach
             --}}
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
                            </div>




                        </div>
                        <div class="BORDERB" style="">
                            <div class="card-body-container" style="display: flex; flex-wrap: wrap; margin: 10px;">
                                <div class="card-body" style="flex: 0 0 100%; max-width: 100%;">
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
                                            <span class="aligned-text">Kode&nbsp;Type:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 450px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                                style="resize: none; height: 40px; max-width: 250px;">
                                                <option value=""></option>
                                                @foreach ($divisi as $data)
                                                    <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                                @endforeach
                                            </select> --}}
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                            <div class="modal fade" id="modalPosisi" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
                                                <div class="modal-dialog " role="document">
                                                    <div class="modal-content" style="">
                                                        <div class="modal-header" style="justify-content: center;">
                                                            <div class="row" style=";">
                                                                <div class="table-responsive" style="margin:30px;">
                                                                    <table id="tabel_Posisi" class="table table-bordered">
                                                                        <thead class="thead-dark">
                                                                            <tr>
                                                                                <th scope="col">Kd Posisi</th>
                                                                                <th scope="col">Nama Posisi</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {{-- @foreach ($dataPosisi as $data)
                                                                                <tr>

                                                                                    <td>{{ $data->KD_Posisi }}</td>
                                                                                    <td>{{ $data->Nm_Posisi }}</td>



                                                                                </tr>
                                                                            @endforeach
             --}}
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
                                    <div class="row" style="margin-left:-200px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Nama&nbsp;Type:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">

                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 750px;">
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                            <div class="modal fade" id="modalPosisi" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
                                                <div class="modal-dialog " role="document">
                                                    <div class="modal-content" style="">
                                                        <div class="modal-header" style="justify-content: center;">
                                                            <div class="row" style=";">
                                                                <div class="table-responsive" style="margin:30px;">
                                                                    <table id="tabel_Posisi" class="table table-bordered">
                                                                        <thead class="thead-dark">
                                                                            <tr>
                                                                                <th scope="col">Kd Posisi</th>
                                                                                <th scope="col">Nama Posisi</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {{-- @foreach ($dataPosisi as $data)
                                                                                <tr>

                                                                                    <td>{{ $data->KD_Posisi }}</td>
                                                                                    <td>{{ $data->Nm_Posisi }}</td>



                                                                                </tr>
                                                                            @endforeach
             --}}
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
                                    <div class="row" style="margin-left:-200px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Keterangan:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">

                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 750px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                                style="resize: none; height: 40px; max-width: 250px;">
                                                <option value=""></option>
                                                @foreach ($divisi as $data)
                                                    <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                                @endforeach
                                            </select> --}}

                                            <div class="modal fade" id="modalPosisi" role="dialog"
                                                arialabelledby="modalLabel" area-hidden="true" style="">
                                                <div class="modal-dialog " role="document">
                                                    <div class="modal-content" style="">
                                                        <div class="modal-header" style="justify-content: center;">
                                                            <div class="row" style=";">
                                                                <div class="table-responsive" style="margin:30px;">
                                                                    <table id="tabel_Posisi" class="table table-bordered">
                                                                        <thead class="thead-dark">
                                                                            <tr>
                                                                                <th scope="col">Kd Posisi</th>
                                                                                <th scope="col">Nama Posisi</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {{-- @foreach ($dataPosisi as $data)
                                                                                <tr>

                                                                                    <td>{{ $data->KD_Posisi }}</td>
                                                                                    <td>{{ $data->Nm_Posisi }}</td>



                                                                                </tr>
                                                                            @endforeach
             --}}
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

                                    <div class="row" style="margin-left:-200px;">

                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Satuan:</span>
                                        </div>
                                        <div class="form-group col-md-3 d-flex " style="margin-left: ;">
                                            <span class="aligned-text">Tritier:</span>
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 70px;">
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="posisiButton" onclick="showModalPosisi()" disabled>...</button>
                                        </div>
                                        <div class="form-group col-md-3 d-flex " style="margin-left: ;">
                                            <span class="aligned-text">Sekunder:</span>
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 70px;">
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="posisiButton" onclick="showModalPosisi()" disabled>...</button>
                                        </div>
                                        <div class="form-group col-md-3 d-flex " style="margin-left: ;">
                                            <span class="aligned-text">Primer:</span>
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 70px;">
                                            <button type="button" class="btn" style="margin-left: 10px; "
                                                id="posisiButton" onclick="showModalPosisi()" disabled>...</button>
                                        </div>

                                    </div>
                                    <div class="row" style="margin-left:-200px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Satuan Umum :</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">

                                            <select class="form-control" id="KeteranganKoreksi"
                                                name="KeteranganKoreksiName"
                                                style="resize: none;height: 35px; max-width:150px;"disabled>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="H">H</option>
                                                <option value="I">I</option>
                                                <option value="K">K</option>
                                                <option value="L">L</option>
                                                <option value="M">M</option>
                                                <option value="P">P</option>
                                                <option value="S">S</option>
                                                <option value="X">X</option>
                                                <option value="N">N</option>
                                            </select>
                                        </div>


                                    </div>



                                </div>

                                <div class="row" style="">
                                    <div class="form-group col-md-3 d-flex justify-content-end">


                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">
                                        <input type="checkbox" id="checkBPJS">&nbsp;Aturan&nbsp;Konversi
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row" style="margin-left:;">
                            <div style="margin: 20px;margin-left:35px;">


                                <button type="button" class="btn " style="width:75px;" id="isiButton">Isi</button>
                                <button type="button" class="btn " style="width:75px;" id="SimpanIsiButton"
                                    hidden>SIMPAN</button>
                                <button type="button" class="btn " style="width:75px;" id="SimpanKoreksiButton"
                                    hidden>SIMPAN</button>
                                <button type="button" class="btn " style="width:75px;"
                                    id="KoreksiButton">Koreksi</button>
                                <button type="button" class="btn " style="width:75px;" id="BatalIsiButton"
                                    hidden>BATAL</button>
                                <button type="button" class="btn " style="width:75px;" id="BatalKoreksiButton"
                                    hidden>BATAL</button>
                                <button type="button" class="btn " style="width:75px;"
                                    id="HapusButton">Hapus</button>
                                <button type="button" class="btn " style="width:75px;"
                                    id="ProsesButton">Proses</button>
                                <button type="button" class="btn " style="width:75px;"
                                    id="keluarButton">Keluar</button>
                            </div>
                        </div>






                    </div>











                </div>







            </div>






        </div>








        <br>







    </div>
    </div>
@endsection
